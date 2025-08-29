"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface PollFiltersProps {
  filters: {
    status: string;
    sortBy: string;
  };
  onFiltersChange: (filters: { status: string; sortBy: string }) => void;
}

export function PollFilters({ filters, onFiltersChange }: PollFiltersProps) {
  const handleStatusChange = (status: string) => {
    onFiltersChange({ ...filters, status });
  };

  const handleSortChange = (sortBy: string) => {
    onFiltersChange({ ...filters, sortBy });
  };

  return (
    <div className="flex gap-4">
      <div className="space-y-2">
        <Label htmlFor="status-filter" className="text-xs font-medium">Status</Label>
        <Select value={filters.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-32" id="status-filter">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sort-filter" className="text-xs font-medium">Sort by</Label>
        <Select value={filters.sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-40" id="sort-filter">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest first</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
            <SelectItem value="most-voted">Most voted</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
