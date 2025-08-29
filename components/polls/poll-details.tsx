"use client";

import { Badge } from "@/components/ui/badge";
import { Calendar, User, Globe, Lock, BarChart3 } from "lucide-react";
import type { Poll } from "@/types";

interface PollDetailsProps {
  poll: Poll;
}

export function PollDetails({ poll }: PollDetailsProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const details = [
    {
      icon: Calendar,
      label: "Created",
      value: formatDate(poll.createdAt),
    },
    {
      icon: Calendar,
      label: "Last Updated",
      value: formatDate(poll.updatedAt),
    },
    {
      icon: User,
      label: "Created By",
      value: "You", // Replace with actual user data when auth is added
    },
    {
      icon: poll.isPublic ? Globe : Lock,
      label: "Visibility",
      value: poll.isPublic ? "Public" : "Private",
    },
    {
      icon: BarChart3,
      label: "Questions",
      value: `${poll.questions.length} question${poll.questions.length !== 1 ? 's' : ''}`,
    },
  ];

  if (poll.expiresAt) {
    details.splice(2, 0, {
      icon: Calendar,
      label: "Expires",
      value: formatDate(poll.expiresAt),
    });
  }

  return (
    <div className="space-y-4">
      {details.map((detail, index) => (
        <div key={index} className="flex items-start space-x-3">
          <detail.icon className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{detail.label}</p>
            <p className="text-sm text-muted-foreground">{detail.value}</p>
          </div>
        </div>
      ))}

      <div className="pt-4 border-t">
        <div className="flex items-center space-x-2">
          <Badge variant={poll.isActive ? "default" : "secondary"}>
            {poll.isActive ? "Active" : "Ended"}
          </Badge>
          {poll.isPublic && (
            <Badge variant="outline">
              Public
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
