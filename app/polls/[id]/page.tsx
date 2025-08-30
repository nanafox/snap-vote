"use client";

import { useEffect, useState } from "react";
import { PublicPollView } from "@/components/polls/public-poll-view";
import { BarChart3, Loader2 } from "lucide-react";
import Link from "next/link";
import type { Poll } from "@/types";

export default function PublicPollPage({ params }: { params: Promise<{ id: string }> }) {
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

    const fetchPoll = async () => {
      try {
        const response = await fetch(`/api/polls/${pollId}`);
        const result = await response.json();

        if (result.success) {
          setPoll(result.poll);
        } else {
          setError(result.message || "Poll not found");
        }
      } catch {
        setError("Failed to load poll");
      } finally {
        setLoading(false);
      }
    };

    fetchPoll();
  }, [pollId]);

  if (loading) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="space-y-4 text-center">
          <Loader2 className="text-muted-foreground mx-auto h-12 w-12 animate-spin" />
          <p className="text-muted-foreground">Loading poll...</p>
        </div>
      </div>
    );
  }

  if (error || !poll) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="space-y-4 text-center">
          <BarChart3 className="text-muted-foreground mx-auto h-12 w-12" />
          <h1 className="text-2xl font-bold">Poll Not Found</h1>
          <p className="text-muted-foreground">{error || "The poll you're looking for doesn't exist."}</p>
          <Link href="/" className="text-primary hover:underline">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  if (!poll.isPublic) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div className="space-y-4 text-center">
          <BarChart3 className="text-muted-foreground mx-auto h-12 w-12" />
          <h1 className="text-2xl font-bold">Private Poll</h1>
          <p className="text-muted-foreground">This poll is private and cannot be accessed publicly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="from-background via-background to-muted/20 min-h-screen bg-gradient-to-br">
      {/* Header */}
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur">
        <div className="container mx-auto flex items-center justify-center px-4 py-4">
          <div className="flex items-center space-x-2">
            <BarChart3 className="text-primary h-8 w-8" />
            <span className="text-foreground text-2xl font-bold">SnapVote</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <PublicPollView poll={poll} />
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 mt-16 border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-2 flex items-center justify-center space-x-2">
            <BarChart3 className="text-primary h-5 w-5" />
            <span className="font-semibold">SnapVote</span>
          </div>
          <p className="text-muted-foreground text-sm">
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
