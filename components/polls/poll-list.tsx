"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Share2,
  BarChart3,
  Calendar,
  Users
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import type { Poll } from "@/types";

interface PollListProps {
  polls: Poll[];
  showActions?: boolean;
}

export function PollList({ polls, showActions = true }: PollListProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const handleAction = (pollId: string, action: string) => {
    // TODO: Implement actual actions
    console.log(`${action} poll:`, pollId);
  };

  if (polls.length === 0) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No polls found</h3>
        <p className="mt-2 text-muted-foreground">
          Get started by creating your first poll.
        </p>
        <Link href="/dashboard/polls/create">
          <Button className="mt-4">Create Poll</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {polls.map((poll) => (
        <Card key={poll.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg font-semibold truncate">
                  {poll.title}
                </CardTitle>
                {poll.description && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {poll.description}
                  </p>
                )}
                <div className="flex items-center space-x-4 mt-3">
                  <Badge variant={poll.isActive ? "default" : "secondary"}>
                    {poll.isActive ? "Active" : "Ended"}
                  </Badge>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(poll.createdAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>{poll.totalVotes} votes</span>
                  </div>
                </div>
              </div>

              {showActions && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => handleAction(poll.id, 'view')}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Results
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAction(poll.id, 'edit')}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Poll
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAction(poll.id, 'share')}>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Poll
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleAction(poll.id, 'delete')}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Poll
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>{poll.questions.length} question{poll.questions.length !== 1 ? 's' : ''}</span>
                {poll.expiresAt && (
                  <>
                    <span>•</span>
                    <span>Expires {formatDate(poll.expiresAt)}</span>
                  </>
                )}
                {poll.isPublic && (
                  <>
                    <span>•</span>
                    <span>Public</span>
                  </>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Link href={`/dashboard/polls/${poll.id}`}>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </Link>
                {poll.isPublic && (
                  <Link href={`/poll/${poll.id}`}>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Public Link
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
