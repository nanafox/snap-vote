"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PollList } from "@/components/polls/poll-list";
import { CreatePollButton } from "@/components/polls/create-poll-button";
import { PollFilters } from "@/components/polls/poll-filters";
import { Search, Filter } from "lucide-react";

// Mock data - replace with real data later
const mockPolls = [
  {
    id: "1",
    title: "Team Lunch Preferences",
    description: "Help us decide where to go for our next team lunch. We want to make sure everyone's dietary preferences are considered.",
    questions: [
      { id: "1", text: "Which restaurant do you prefer?", type: "single-choice" as const, options: [], required: true },
      { id: "2", text: "Any dietary restrictions?", type: "multiple-choice" as const, options: [], required: false },
    ],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    expiresAt: new Date("2024-01-20"),
    isActive: true,
    isPublic: true,
    createdBy: "user1",
    totalVotes: 24,
  },
  {
    id: "2",
    title: "Office Meeting Room Booking System",
    description: "Which time slot works best for the all-hands meeting? We're trying to find a time that works for everyone across different time zones.",
    questions: [
      { id: "3", text: "Preferred meeting time", type: "single-choice" as const, options: [], required: true },
    ],
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-14"),
    isActive: true,
    isPublic: false,
    createdBy: "user1",
    totalVotes: 18,
  },
  {
    id: "3",
    title: "Company Event Theme Selection",
    description: "Vote for the theme of our annual company event. This will help us plan decorations, activities, and catering.",
    questions: [
      { id: "4", text: "Event theme preference", type: "single-choice" as const, options: [], required: true },
      { id: "5", text: "Additional suggestions", type: "text" as const, options: [], required: false },
    ],
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-12"),
    expiresAt: new Date("2024-01-15"),
    isActive: false,
    isPublic: true,
    createdBy: "user1",
    totalVotes: 45,
  },
  {
    id: "4",
    title: "Product Feature Prioritization",
    description: "Help us prioritize which features to work on next quarter. Your input will directly influence our development roadmap.",
    questions: [
      { id: "6", text: "Top priority feature", type: "single-choice" as const, options: [], required: true },
      { id: "7", text: "Rate feature importance", type: "rating" as const, options: [], required: true },
    ],
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-13"),
    isActive: true,
    isPublic: false,
    createdBy: "user1",
    totalVotes: 32,
  },
  {
    id: "5",
    title: "Remote Work Preferences Survey",
    description: "Understanding team preferences for remote work policies and office arrangements going forward.",
    questions: [
      { id: "8", text: "Preferred work arrangement", type: "single-choice" as const, options: [], required: true },
      { id: "9", text: "Office days preference", type: "multiple-choice" as const, options: [], required: false },
    ],
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-09"),
    isActive: true,
    isPublic: true,
    createdBy: "user1",
    totalVotes: 67,
  },
];

export default function PollsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    sortBy: "newest",
  });

  // Filter and sort polls based on current filters
  const filteredPolls = mockPolls
    .filter(poll => {
      const matchesSearch = poll.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          poll.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = filters.status === "all" ||
                           (filters.status === "active" && poll.isActive) ||
                           (filters.status === "expired" && !poll.isActive);

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "most-voted":
          return b.totalVotes - a.totalVotes;
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">All Polls</h1>
          <p className="text-muted-foreground">
            Manage and view all your polls in one place.
          </p>
        </div>
        <CreatePollButton />
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Search & Filter</CardTitle>
          <CardDescription>
            Find specific polls or filter by status and sort preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search polls by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <PollFilters
                filters={filters}
                onFiltersChange={setFilters}
              />
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredPolls.length} of {mockPolls.length} polls
          {searchQuery && (
            <span> matching &quot;{searchQuery}&quot;</span>
          )}
        </div>

        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchQuery("")}
          >
            Clear search
          </Button>
        )}
      </div>

      {/* Polls List */}
      <PollList polls={filteredPolls} />

      {/* Empty State */}
      {filteredPolls.length === 0 && searchQuery && (
        <Card className="border-0 shadow-md">
          <CardContent className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No polls found</h3>
            <p className="mt-2 text-muted-foreground">
              Try adjusting your search terms or filters.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setSearchQuery("")}
            >
              Clear search
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
