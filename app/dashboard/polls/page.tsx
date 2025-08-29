"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PollList } from "@/components/polls/poll-list";
import { CreatePollButton } from "@/components/polls/create-poll-button";
import { PollFilters } from "@/components/polls/poll-filters";
import { Search, Filter, Loader2 } from "lucide-react";
import type { Poll } from "@/types";

export default function PollsPage() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    sortBy: "newest",
  });

  // Fetch polls from API
  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await fetch("/api/polls");
        const result = await response.json();

        if (result.success) {
          setPolls(result.polls);
        } else {
          console.error("Failed to fetch polls:", result.message);
        }
      } catch (error) {
        console.error("Error fetching polls:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, []);

  // Filter and sort polls based on current filters
  const filteredPolls = polls
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

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Loading polls...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">All Polls</h1>
          <p className="text-lg text-muted-foreground">
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
          Showing {filteredPolls.length} of {polls.length} polls
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
      {polls.length === 0 && !searchQuery && (
        <Card className="border-0 shadow-md">
          <CardContent className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No polls yet</h3>
            <p className="mt-2 text-muted-foreground">
              Get started by creating your first poll.
            </p>
            <CreatePollButton />
          </CardContent>
        </Card>
      )}

      {/* No Search Results */}
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
