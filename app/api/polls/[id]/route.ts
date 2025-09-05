import { NextRequest, NextResponse } from "next/server";
import { getPollById, updatePoll, deletePoll } from "@/lib/polls/storage";

/**
 * Handles GET requests to fetch a single poll by its ID.
 * This function retrieves a poll from the storage, serializes its date fields,
 * and returns it. If the poll is not found, it returns a 404 error.
 *
 * @param {NextRequest} request - The incoming Next.js request object.
 * @param {object} context - The context object containing route parameters.
 * @param {Promise<{ id: string }>} context.params - The route parameters, containing the poll ID.
 * @returns {Promise<NextResponse>} A Next.js response object with the poll data or an error message.
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const poll = getPollById(id);

    // If no poll is found with the given ID, return a 404 Not Found response.
    if (!poll) {
      return NextResponse.json(
        { success: false, message: "Poll not found" },
        { status: 404 }
      );
    }

    // Dates are not directly serializable to JSON, so they must be converted to strings.
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

/**
 * Handles PUT requests to update an existing poll by its ID.
 * This function parses the request body, updates the poll in storage,
 * and returns the updated poll data.
 *
 * @param {NextRequest} request - The incoming Next.js request object.
 * @param {object} context - The context object containing route parameters.
 * @param {Promise<{ id: string }>} context.params - The route parameters, containing the poll ID.
 * @returns {Promise<NextResponse>} A Next.js response object with the updated poll data or an error message.
 */
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const poll = updatePoll(id, body);

    // If the poll to update is not found, return a 404 error.
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

/**
 * Handles DELETE requests to remove a poll by its ID.
 * This function deletes the poll from storage and returns a success message.
 *
 * @param {NextRequest} request - The incoming Next.js request object.
 * @param {object} context - The context object containing route parameters.
 * @param {Promise<{ id: string }>} context.params - The route parameters, containing the poll ID.
 * @returns {Promise<NextResponse>} A Next.js response object with a success or error message.
 */
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const success = deletePoll(id);

    // If the deletion was unsuccessful (e.g., poll not found), return a 404 error.
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
