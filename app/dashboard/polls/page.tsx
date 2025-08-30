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
  const [totalPolls, setTotalPolls] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    sortBy: "newest",
  });

  // Fetch polls from API
  useEffect(() => {
    const fetchPolls = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchQuery) params.append("search", searchQuery);
        if (filters.status) params.append("status", filters.status);
        if (filters.sortBy) params.append("sortBy", filters.sortBy);

        const response = await fetch(`/api/polls?${params.toString()}`);
        const result = await response.json();

        if (result.success) {
          setPolls(result.polls);
          setTotalPolls(result.totalPolls);
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
  }, [searchQuery, filters]);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
          <span className="text-muted-foreground ml-2">Loading polls...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-foreground text-3xl font-bold tracking-tight">All Polls</h1>
          <p className="text-muted-foreground text-lg">Manage and view all your polls in one place.</p>
        </div>
        <CreatePollButton />
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Search & Filter</CardTitle>
          <CardDescription>Find specific polls or filter by status and sort preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 lg:flex-row">
            {/* Search */}
            <div className="relative flex flex-1 items-center">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
              <Input
                placeholder="Search polls by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <PollFilters filters={filters} onFiltersChange={setFilters} />
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="text-muted-foreground text-sm">
          Showing {polls.length} of {totalPolls} polls
          {searchQuery && <span> matching &quot;{searchQuery}&quot;</span>}
        </div>

        {searchQuery && (
          <Button variant="ghost" size="sm" onClick={() => setSearchQuery("")}>
            Clear search
          </Button>
        )}
      </div>

      {/* Polls List */}
      <PollList polls={polls} />

      {/* No Search Results */}
      {polls.length === 0 && searchQuery && (
        <Card className="border-0 shadow-md">
          <CardContent className="py-12 text-center">
            <Search className="text-muted-foreground mx-auto h-12 w-12" />
            <h3 className="mt-4 text-lg font-medium">No polls found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search terms or filters.</p>
            <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
              Clear search
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
