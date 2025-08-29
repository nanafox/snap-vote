"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Clock,
  Download,
  Calendar
} from "lucide-react";

// Mock analytics data
const analyticsData = {
  overview: {
    totalPolls: 12,
    totalVotes: 1234,
    totalViews: 5678,
    avgResponseRate: 85,
  },
  trends: [
    { period: "This Week", polls: 3, votes: 120, views: 456 },
    { period: "Last Week", polls: 2, votes: 98, views: 321 },
    { period: "This Month", polls: 8, votes: 534, votes: 1234 },
  ],
  topPerformingPolls: [
    { title: "Team Lunch Preferences", votes: 45, responseRate: 92 },
    { title: "Office Meeting Room Booking", votes: 38, responseRate: 88 },
    { title: "Product Feature Prioritization", votes: 32, responseRate: 85 },
  ]
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">
            Insights and performance metrics for your polls.
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Polls</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.totalPolls}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              <span>+2 from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Votes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.totalVotes.toLocaleString()}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              <span>+120 from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.totalViews.toLocaleString()}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              <span>+456 from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Rate</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.avgResponseRate}%</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              <span>+5% from last week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Details */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Performance Trends */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
            <CardDescription>
              Poll activity and engagement over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.trends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{trend.period}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="text-center">
                      <p className="font-semibold">{trend.polls}</p>
                      <p className="text-muted-foreground">Polls</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">{trend.votes}</p>
                      <p className="text-muted-foreground">Votes</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">{trend.views}</p>
                      <p className="text-muted-foreground">Views</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Polls */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Top Performing Polls</CardTitle>
            <CardDescription>
              Your most successful polls by engagement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topPerformingPolls.map((poll, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{poll.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {poll.votes} votes
                    </p>
                  </div>
                  <Badge variant="secondary">
                    {poll.responseRate}% response rate
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Coming Soon Features */}
      <Card className="border-0 shadow-md bg-gradient-to-r from-primary/5 to-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>📊</span>
            <span>Advanced Analytics Coming Soon</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-2">Detailed Charts</h4>
              <p className="text-sm text-muted-foreground">
                Interactive charts showing vote patterns, response times, and demographic breakdowns.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Export Options</h4>
              <p className="text-sm text-muted-foreground">
                Export analytics data in various formats (CSV, PDF, Excel) for reporting.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
