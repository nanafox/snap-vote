import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PollDetails } from "@/components/polls/poll-details";
import { PollResults } from "@/components/polls/poll-results";
import { PollActions } from "@/components/polls/poll-actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Users, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // In a real app, you would fetch the poll data here using params.id
  const poll = await params;
  const pollId = poll.id;
  return {
    title: `Poll ${pollId} Details`, // This would be dynamic based on the poll
    description: "View detailed results and analytics for your poll.",
  };
}

// Mock data - replace with real data fetching
const mockPoll = {
  id: "1",
  title: "Team Lunch Preferences",
  description:
    "Help us decide where to go for our next team lunch. We want to make sure everyone's dietary preferences are considered and that we choose a place that accommodates our budget.",
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
  updatedAt: new Date("2024-02-15"),
  expiresAt: new Date("2024-01-25"),
  isActive: true,
  isPublic: true,
  createdBy: "user1",
  totalVotes: 40,
};

export default function PollDetailPage() {
  // In a real app, you would fetch the poll data here using the poll ID from params
  // For now, using mock data
  const poll = mockPoll;

  if (!poll) {
    notFound();
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-4 flex items-center space-x-4">
            <Link href="/dashboard/polls">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Polls
              </Button>
            </Link>
            <Badge variant={poll.isActive ? "default" : "secondary"}>{poll.isActive ? "Active" : "Ended"}</Badge>
            <Badge variant="outline" className="flex items-center space-x-1">
              {poll.isPublic ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
              <span>{poll.isPublic ? "Public" : "Private"}</span>
            </Badge>
          </div>

          <h1 className="text-foreground mb-3 text-3xl font-bold tracking-tight">{poll.title}</h1>

          {poll.description && (
            <p className="text-muted-foreground mb-6 max-w-3xl text-lg leading-relaxed">{poll.description}</p>
          )}

          <div className="text-muted-foreground flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Created {formatDate(poll.createdAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{poll.totalVotes} total votes</span>
            </div>
            {poll.expiresAt && (
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Expires {formatDate(poll.expiresAt)}</span>
              </div>
            )}
          </div>
        </div>

        <PollActions poll={poll} />
      </div>

      {/* Main Content */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Poll Details & Results */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Poll Results</CardTitle>
              <CardDescription>Real-time results from all participants</CardDescription>
            </CardHeader>
            <CardContent>
              <PollResults poll={poll} />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Poll Information</CardTitle>
            </CardHeader>
            <CardContent>
              <PollDetails poll={poll} />
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Total Questions</span>
                <span className="font-medium">{poll.questions.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Total Votes</span>
                <span className="font-medium">{poll.totalVotes}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Response Rate</span>
                <span className="font-medium">85%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Avg. Time</span>
                <span className="font-medium">2m 30s</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
