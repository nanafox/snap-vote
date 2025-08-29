import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreatePollButton } from "@/components/polls/create-poll-button";
import { PollList } from "@/components/polls/poll-list";
import {
  BarChart3,
  Users,
  Eye,
  TrendingUp,
  PlusCircle,
  Activity
} from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your polls, view analytics, and track engagement from your SnapVote dashboard.",
};

// Mock data - replace with real data later
const stats = [
  {
    title: "Total Polls",
    value: "12",
    change: "+2 from last week",
    icon: BarChart3,
    trend: "up"
  },
  {
    title: "Total Votes",
    value: "1,234",
    change: "+120 from last week",
    icon: Users,
    trend: "up"
  },
  {
    title: "Poll Views",
    value: "5,678",
    change: "+456 from last week",
    icon: Eye,
    trend: "up"
  },
  {
    title: "Active Polls",
    value: "8",
    change: "4 expiring soon",
    icon: Activity,
    trend: "neutral"
  }
];

const recentPolls = [
  {
    id: "1",
    title: "Team Lunch Preferences",
    description: "Help us decide where to go for our next team lunch",
    questions: [
      { id: "1", text: "Which restaurant do you prefer?", type: "single-choice" as const, options: [], required: true },
    ],
    totalVotes: 24,
    isActive: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    isPublic: true,
    createdBy: "user1",
  },
  {
    id: "2",
    title: "Office Meeting Room Booking",
    description: "Which time slot works best for the all-hands meeting?",
    questions: [
      { id: "2", text: "Preferred time slot", type: "single-choice" as const, options: [], required: true },
    ],
    totalVotes: 18,
    isActive: true,
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-14"),
    isPublic: false,
    createdBy: "user1",
  },
  {
    id: "3",
    title: "Company Event Theme",
    description: "Vote for the theme of our annual company event",
    questions: [
      { id: "3", text: "Event theme", type: "single-choice" as const, options: [], required: true },
    ],
    totalVotes: 45,
    isActive: false,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
    expiresAt: new Date("2024-01-15"),
    isPublic: true,
    createdBy: "user1",
  }
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-lg text-muted-foreground">
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
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3" />
                <span>{stat.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Polls */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Polls</CardTitle>
                <CardDescription>Your latest polling activity</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <PollList polls={recentPolls} showActions={false} />
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
              <Button className="w-full justify-start h-12" size="lg">
                <PlusCircle className="h-5 w-5 mr-3" />
                Create New Poll
              </Button>
              <Button variant="outline" className="w-full justify-start h-12" size="lg">
                <BarChart3 className="h-5 w-5 mr-3" />
                View Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start h-12" size="lg">
                <Eye className="h-5 w-5 mr-3" />
                Share Poll
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tips & Getting Started */}
      <Card className="border-0 shadow-md bg-gradient-to-r from-primary/5 to-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>💡</span>
            <span>Pro Tips</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-2">Boost Engagement</h4>
              <p className="text-sm text-muted-foreground">
                Add descriptions to your polls to provide context and increase participation rates.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Share Effectively</h4>
              <p className="text-sm text-muted-foreground">
                Use the public link feature to share polls with external participants.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
