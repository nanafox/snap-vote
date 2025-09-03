
import { useState, useEffect } from "react";
import type { Poll } from "@/types";

export function usePolls() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [totalPolls, setTotalPolls] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    sortBy: "newest",
  });

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Clear search function
  const clearSearch = () => {
    setSearchQuery("");
    setDebouncedSearchQuery("");
  };

  // Fetch polls from API
  useEffect(() => {
    const fetchPolls = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (debouncedSearchQuery) params.append("search", debouncedSearchQuery);
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
  }, [debouncedSearchQuery, filters]);

  return {
    polls,
    totalPolls,
    loading,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    clearSearch,
    debouncedSearchQuery,
  };
}
