import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Validation schema for poll creation
const createPollSchema = z.object({
  title: z.string().min(1, "Poll title is required"),
  description: z.string().optional(),
  questions: z.array(z.object({
    text: z.string().min(1, "Question text is required"),
    type: z.enum(["single-choice", "multiple-choice", "text", "rating"]),
    options: z.array(z.string()).optional(),
    required: z.boolean().default(true),
    allowMultiple: z.boolean().optional(),
  })).min(1, "At least one question is required"),
  expiresAt: z.string().optional(),
  isPublic: z.boolean().default(true),
});

interface Option {
  id: string;
  text: string;
  votes: number;
}

interface Question {
  id: string;
  text: string;
  type: "single-choice" | "multiple-choice" | "text" | "rating";
  options: Option[];
  required: boolean;
  allowMultiple: boolean;
}

interface Poll {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date | null;
  isActive: boolean;
  isPublic: boolean;
  createdBy: string;
  totalVotes: number;
}

// In-memory storage for polls (replace with actual database later)
const polls: Poll[] = [];
let nextId = 1;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = createPollSchema.parse(body);
    
    // Process questions and create options
    const processedQuestions = validatedData.questions.map((question, qIndex) => {
      const questionId = `q_${nextId}_${qIndex}`;
      
      let options: Option[] = [];
      
      // Create options for choice-based questions
      if (question.type === "single-choice" || question.type === "multiple-choice") {
        options = (question.options || []).map((optionText, oIndex) => ({
          id: `opt_${nextId}_${qIndex}_${oIndex}`,
          text: optionText,
          votes: 0,
        }));
      }
      
      return {
        id: questionId,
        text: question.text,
        type: question.type,
        options,
        required: question.required,
        allowMultiple: question.allowMultiple || false,
      };
    });
    
    // Create the poll object
    const newPoll: Poll = {
      id: `poll_${nextId}`,
      title: validatedData.title,
      description: validatedData.description || "",
      questions: processedQuestions,
      createdAt: new Date(),
      updatedAt: new Date(),
      expiresAt: validatedData.expiresAt ? new Date(validatedData.expiresAt) : null,
      isActive: true,
      isPublic: validatedData.isPublic,
      createdBy: "anonymous", // Replace with actual user ID when auth is implemented
      totalVotes: 0,
    };
    
    // Store the poll (in a real app, this would be saved to a database)
    polls.push(newPoll);
    nextId++;
    
    console.log("Poll created successfully:", newPoll);
    
    return NextResponse.json(
      {
        success: true,
        message: "Poll created successfully",
        poll: newPoll,
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
          errors: error.errors,
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

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      polls: polls,
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