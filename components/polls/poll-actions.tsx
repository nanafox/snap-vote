"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Share2,
  Edit,
  Download,
  MoreHorizontal,
  Copy,
  ExternalLink,
  Trash2,
  Pause,
  Play
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Poll } from "@/types";

interface PollActionsProps {
  poll: Poll;
}

export function PollActions({ poll }: PollActionsProps) {
  const [isSharing, setIsSharing] = useState(false);
  const { toast } = useToast();

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const shareUrl = `${window.location.origin}/poll/${poll.id}`;
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copied!",
        description: "Poll link has been copied to your clipboard.",
      });
    } catch {
      toast({
        title: "Failed to copy link",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSharing(false);
    }
  };

  const handleAction = (action: string) => {
    // TODO: Implement actual actions
    console.log(`${action} poll:`, poll.id);
    toast({
      title: `${action} action`,
      description: `This feature will be implemented soon.`,
    });
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Share Button */}
      <Button
        variant="outline"
        onClick={handleShare}
        disabled={isSharing}
        className="flex items-center space-x-2"
      >
        <Share2 className="h-4 w-4" />
        <span>{isSharing ? "Copying..." : "Share"}</span>
      </Button>

      {/* Public View Button */}
      {poll.isPublic && (
        <Button
          variant="outline"
          onClick={() => window.open(`/poll/${poll.id}`, '_blank')}
          className="flex items-center space-x-2"
        >
          <ExternalLink className="h-4 w-4" />
          <span>View Public</span>
        </Button>
      )}

      {/* More Actions Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => handleAction('edit')}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Poll
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => handleAction('copy')}>
            <Copy className="mr-2 h-4 w-4" />
            Duplicate Poll
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => handleAction('download')}>
            <Download className="mr-2 h-4 w-4" />
            Export Results
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => handleAction(poll.isActive ? 'pause' : 'resume')}>
            {poll.isActive ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Pause Poll
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Resume Poll
              </>
            )}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => handleAction('delete')}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Poll
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
