import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { addPoll, getAllPolls } from "@/lib/polls/storage";

// Validation schema for poll creation
const createPollSchema = z.object({
  title: z.string().min(1, "Poll title is required"),
  description: z.string().optional(),
  questions: z
    .array(
      z.object({
        text: z.string().min(1, "Question text is required"),
        type: z.enum(["single-choice", "multiple-choice", "text", "rating"]),
        options: z.array(z.string()).optional(),
        required: z.boolean().default(true),
        allowMultiple: z.boolean().optional(),
      })
    )
    .min(1, "At least one question is required"),
  expiresAt: z.string().optional(),
  isPublic: z.boolean().default(true),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = createPollSchema.parse(body);

    // Create the poll using shared storage
    const poll = addPoll({
      title: validatedData.title,
      description: validatedData.description || "",
      questions: validatedData.questions.map((q) => ({
        text: q.text,
        type: q.type,
        options: q.options || [],
        required: q.required,
        allowMultiple: q.allowMultiple || false,
      })),
      expiresAt: validatedData.expiresAt ? new Date(validatedData.expiresAt) : null,
      isPublic: validatedData.isPublic,
    });

    console.log("Poll created successfully:", poll);

    return NextResponse.json(
      {
        success: true,
        message: "Poll created successfully",
        poll: poll,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating poll:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get("search") || "";
    const status = searchParams.get("status") || "all";
    const sortBy = searchParams.get("sortBy") || "newest";

    // Get all polls from shared storage
    const allPolls = getAllPolls();
    const totalPolls = allPolls.length;

    // Filter polls based on search query and status
    const filteredPolls = allPolls
      .filter((poll) => {
        const matchesSearch =
          poll.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          poll.description?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus =
          status === "all" ||
          (status === "active" && poll.isActive) ||
          (status === "expired" && !poll.isActive);

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "newest":
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case "oldest":
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          case "most-voted":
            return b.totalVotes - a.totalVotes;
          default:
            return 0;
        }
      });

    return NextResponse.json({
      success: true,
      polls: filteredPolls,
      totalPolls,
    });
  } catch (error) {
    console.error("Error fetching polls:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
