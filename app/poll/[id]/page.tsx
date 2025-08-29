import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicPollView } from "@/components/polls/public-poll-view";
import { BarChart3 } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // In a real app, you would fetch the poll data here using params.id
  const pollId = params.id;
  return {
    title: `Vote on Poll ${pollId}`,
    description: "Participate in this poll and make your voice heard. Your vote counts!",
  };
}

// Mock data - replace with real data fetching
const mockPoll = {
  id: "1",
  title: "Team Lunch Preferences",
  description: "Help us decide where to go for our next team lunch. We want to make sure everyone's dietary preferences are considered and that we choose a place that accommodates our budget.",
  questions: [
    {
      id: "1",
      text: "Which restaurant do you prefer for our team lunch?",
      type: "single-choice" as const,
      options: [
        { id: "1", text: "Italian Bistro", votes: 12 },
        { id: "2", text: "Mexican Cantina", votes: 8 },
        { id: "3", text: "Asian Fusion", votes: 15 },
        { id: "4", text: "American Grill", votes: 5 },
      ],
      required: true,
    },
    {
      id: "2",
      text: "Any dietary restrictions we should know about?",
      type: "multiple-choice" as const,
      options: [
        { id: "5", text: "Vegetarian", votes: 6 },
        { id: "6", text: "Vegan", votes: 3 },
        { id: "7", text: "Gluten-free", votes: 4 },
        { id: "8", text: "No restrictions", votes: 25 },
      ],
      required: false,
      allowMultiple: true,
    },
    {
      id: "3",
      text: "How would you rate the importance of this team lunch?",
      type: "rating" as const,
      options: [],
      required: true,
    },
    {
      id: "4",
      text: "Any additional suggestions or comments?",
      type: "text" as const,
      options: [],
      required: false,
    },
  ],
  createdAt: new Date("2024-01-15"),
  updatedAt: new Date("2024-01-15"),
  expiresAt: new Date("2024-01-25"),
  isActive: true,
  isPublic: true,
  createdBy: "user1",
  totalVotes: 40,
};

export default function PublicPollPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the poll data here using params.id
  console.log("Poll ID:", params.id);
  const poll = mockPoll;

  if (!poll) {
    notFound();
  }

  if (!poll.isPublic) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
          <h1 className="text-2xl font-bold">Private Poll</h1>
          <p className="text-muted-foreground">
            This poll is private and cannot be accessed publicly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">SnapVote</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <PublicPollView poll={poll} />
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <span className="font-semibold">SnapVote</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Create your own polls at{" "}
            <Link href="/" className="text-primary hover:underline">
              snapvote.com
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
