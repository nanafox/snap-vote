"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreatePollButton } from "@/components/polls/create-poll-button";

import { BarChart3, Users, Eye, TrendingUp, PlusCircle, Activity } from "lucide-react";
import type { Poll } from "@/types";
import Link from "next/link";

export default function DashboardPage() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [stats, setStats] = useState([
    {
      title: "Total Polls",
      value: "0",
      change: "No polls yet",
      icon: BarChart3,
      trend: "neutral",
    },
    {
      title: "Total Votes",
      value: "0",
      change: "No votes yet",
      icon: Users,
      trend: "neutral",
    },
    {
      title: "Poll Views",
      value: "0",
      change: "No views yet",
      icon: Eye,
      trend: "neutral",
    },
    {
      title: "Active Polls",
      value: "0",
      change: "No active polls",
      icon: Activity,
      trend: "neutral",
    },
  ]);

  // Fetch recent polls from API
  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await fetch("/api/polls");
        const result = await response.json();

        if (result.success) {
          const recentPolls = result.polls.slice(0, 3); // Get only the 3 most recent
          setPolls(recentPolls);

          // Update stats based on actual data
          const totalPolls = result.polls.length;
          const totalVotes = result.polls.reduce((sum: number, poll: Poll) => sum + poll.totalVotes, 0);
          const activePolls = result.polls.filter((poll: Poll) => poll.isActive).length;

          setStats([
            {
              title: "Total Polls",
              value: totalPolls.toString(),
              change: totalPolls > 0 ? `${totalPolls} created` : "No polls yet",
              icon: BarChart3,
              trend: totalPolls > 0 ? "up" : "neutral",
            },
            {
              title: "Total Votes",
              value: totalVotes.toString(),
              change: totalVotes > 0 ? `${totalVotes} total votes` : "No votes yet",
              icon: Users,
              trend: totalVotes > 0 ? "up" : "neutral",
            },
            {
              title: "Poll Views",
              value: "N/A",
              change: "Feature coming soon",
              icon: Eye,
              trend: "neutral",
            },
            {
              title: "Active Polls",
              value: activePolls.toString(),
              change: activePolls > 0 ? `${activePolls} currently active` : "No active polls",
              icon: Activity,
              trend: activePolls > 0 ? "up" : "neutral",
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching polls:", error);
      }
    };

    fetchPolls();
  }, []);
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-foreground text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Welcome back! Here&apos;s what&apos;s happening with your polls.
          </p>
        </div>
        <CreatePollButton />
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-muted-foreground flex items-center space-x-2 text-xs">
                <TrendingUp className="h-3 w-3" />
                <span>{stat.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Polls - Redesigned */}
        <Card className="border-0 shadow-md">
          <CardHeader className="bg-muted/40 flex flex-row items-center justify-between rounded-t-md border-b pb-3">
            <div>
              <CardTitle className="text-lg font-semibold">Recent Polls</CardTitle>
              <CardDescription className="text-sm">Your latest polling activity</CardDescription>
            </div>
            <Link href="/dashboard/polls">
              <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 font-medium">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="scrollbar-thin scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent flex gap-4 overflow-x-auto py-2">
              {polls.length === 0 ? (
                <div className="text-muted-foreground w-full py-8 text-center text-sm">No recent polls found.</div>
              ) : (
                polls.map((poll) => (
                  <div
                    key={poll.id}
                    className="border-muted hover:border-primary/40 flex max-w-xs min-w-[260px] flex-1 flex-col justify-between rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-lg"
                  >
                    <div className="mb-2">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="line-clamp-1 text-base font-semibold">{poll.title}</span>
                        {poll.isActive && (
                          <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="text-muted-foreground mb-2 line-clamp-2 text-xs">{poll.description}</div>
                    </div>
                    <div className="text-muted-foreground mb-3 flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {poll.totalVotes} votes
                      </span>
                      <span className="flex items-center gap-1">
                        <Activity className="h-3 w-3" />
                        {poll.questions?.length || 0} questions
                      </span>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-xs">
                        {poll.expiresAt ? `Expires ${new Date(poll.expiresAt).toLocaleDateString()}` : "No expiry"}
                      </span>
                      <Link href={`/dashboard/polls/${poll.id}`}>
                        <Button size="sm" variant="outline" className="h-7 px-3 text-xs">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with these common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Link href="/dashboard/polls/create">
                <Button className="h-12 w-full justify-start" size="lg">
                  <PlusCircle className="mr-3 h-5 w-5" />
                  Create New Poll
                </Button>
              </Link>
              <Link href="/dashboard/analytics">
                <Button variant="outline" className="h-12 w-full justify-start" size="lg">
                  <BarChart3 className="mr-3 h-5 w-5" />
                  View Analytics
                </Button>
              </Link>
              <Link href="/dashboard/polls">
                <Button variant="outline" className="h-12 w-full justify-start" size="lg">
                  <Eye className="mr-3 h-5 w-5" />
                  View All Polls
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tips & Getting Started */}
      <Card className="from-primary/5 to-primary/10 border-0 bg-gradient-to-r shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>💡</span>
            <span>Pro Tips</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-medium">Boost Engagement</h4>
              <p className="text-muted-foreground text-sm">
                Add descriptions to your polls to provide context and increase participation rates.
              </p>
            </div>
            <div>
              <h4 className="mb-2 font-medium">Share Effectively</h4>
              <p className="text-muted-foreground text-sm">
                Use the public link feature to share polls with external participants.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
