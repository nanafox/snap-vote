"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { PollDetails } from "@/components/polls/poll-details";
import { PollResults } from "@/components/polls/poll-results";
import { PollActions } from "@/components/polls/poll-actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Users, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";

interface Poll {
  id: string;
  title: string;
  description: string;
  questions: Array<{
    id: string;
    text: string;
    type: "single-choice" | "multiple-choice" | "text" | "rating";
    options: Array<{
      id: string;
      text: string;
      votes: number;
    }>;
    required: boolean;
    allowMultiple?: boolean;
  }>;
  createdAt: string;
  updatedAt: string;
  expiresAt: string | null;
  isActive: boolean;
  isPublic: boolean;
  createdBy: string;
  totalVotes: number;
}

export default function PollDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [poll, setPoll] = useState<Poll | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pollId, setPollId] = useState<string | null>(null);

  // Handle async params
  useEffect(() => {
    const getParams = async () => {
      const { id } = await params;
      setPollId(id);
    };
    getParams();
  }, [params]);

  useEffect(() => {
    if (!pollId) return;

    async function fetchPoll() {
      try {
        const response = await fetch(`/api/polls/${pollId}`);
        if (!response.ok) {
          if (response.status === 404) {
            notFound();
          }
          throw new Error("Failed to fetch poll");
        }
        const data = await response.json();
        setPoll(data.poll);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchPoll();
  }, [pollId]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading poll...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!poll) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString);

    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      return "Invalid Date";
    }

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(dateObj);
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
