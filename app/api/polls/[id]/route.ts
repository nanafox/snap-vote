import { NextRequest, NextResponse } from "next/server";
import { getPollById, updatePoll, deletePoll } from "@/lib/polls/storage";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const poll = getPollById(id);

    if (!poll) {
      return NextResponse.json(
        { success: false, message: "Poll not found" },
        { status: 404 }
      );
    }

    // Convert Date objects to strings for JSON serialization
    const serializedPoll = {
      ...poll,
      createdAt: poll.createdAt.toISOString(),
      updatedAt: poll.updatedAt.toISOString(),
      expiresAt: poll.expiresAt?.toISOString() || null,
    };

    return NextResponse.json({
      success: true,
      poll: serializedPoll,
    });
  } catch (error) {
    console.error("Error fetching poll:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const poll = updatePoll(id, body);

    if (!poll) {
      return NextResponse.json(
        { success: false, message: "Poll not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      poll,
    });
  } catch (error) {
    console.error("Error updating poll:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const success = deletePoll(id);

    if (!success) {
      return NextResponse.json(
        { success: false, message: "Poll not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Poll deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting poll:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
