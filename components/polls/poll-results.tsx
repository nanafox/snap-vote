"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, MessageSquare } from "lucide-react";
import type { Poll, Question } from "@/types";

interface PollResultsProps {
  poll: Poll;
}

export function PollResults({ poll }: PollResultsProps) {
  const renderChoiceResults = (question: Question) => {
    const totalVotes = question.options.reduce((sum, option) => sum + option.votes, 0);

    return (
      <div className="space-y-3">
        {question.options.map((option) => {
          const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;

          return (
            <div key={option.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{option.text}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-muted-foreground text-sm">
                    {option.votes} vote{option.votes !== 1 ? "s" : ""}
                  </span>
                  <Badge variant="secondary">{percentage.toFixed(1)}%</Badge>
                </div>
              </div>
              <Progress value={percentage} className="h-2" />
            </div>
          );
        })}

        {totalVotes === 0 && (
          <p className="text-muted-foreground py-4 text-center text-sm">No votes yet for this question.</p>
        )}
      </div>
    );
  };

  const renderRatingResults = () => {
    // Mock rating data - in a real app, this would come from actual votes
    const ratings = [
      { stars: 5, count: 12 },
      { stars: 4, count: 8 },
      { stars: 3, count: 3 },
      { stars: 2, count: 1 },
      { stars: 1, count: 0 },
    ];

    const totalRatings = ratings.reduce((sum, rating) => sum + rating.count, 0);
    const averageRating =
      totalRatings > 0 ? ratings.reduce((sum, rating) => sum + rating.stars * rating.count, 0) / totalRatings : 0;

    return (
      <div className="space-y-4">
        <div className="text-center">
          <div className="mb-2 flex items-center justify-center space-x-2">
            <span className="text-3xl font-bold">{averageRating.toFixed(1)}</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(averageRating) ? "fill-current text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-muted-foreground text-sm">
            Based on {totalRatings} rating{totalRatings !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="space-y-2">
          {ratings.map((rating) => {
            const percentage = totalRatings > 0 ? (rating.count / totalRatings) * 100 : 0;

            return (
              <div key={rating.stars} className="flex items-center space-x-3">
                <div className="flex w-12 items-center space-x-1">
                  <span className="text-sm">{rating.stars}</span>
                  <Star className="h-3 w-3 fill-current text-yellow-400" />
                </div>
                <Progress value={percentage} className="h-2 flex-1" />
                <span className="text-muted-foreground w-8 text-right text-sm">{rating.count}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderTextResults = () => {
    // Mock text responses - in a real app, this would come from actual responses
    const responses = [
      "I think we should consider budget-friendly options.",
      "Location accessibility is important for everyone.",
      "Would be great to have outdoor seating options.",
      "Please accommodate vegetarian preferences.",
    ];

    return (
      <div className="space-y-3">
        {responses.length > 0 ? (
          responses.map((response, index) => (
            <div key={index} className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <MessageSquare className="text-muted-foreground mt-0.5 h-4 w-4 flex-shrink-0" />
                <p className="text-sm">{response}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground py-4 text-center text-sm">No text responses yet for this question.</p>
        )}

        {responses.length > 3 && (
          <div className="text-center">
            <button className="text-primary text-sm hover:underline">View all {responses.length} responses</button>
          </div>
        )}
      </div>
    );
  };

  const renderQuestionResults = (question: Question) => {
    switch (question.type) {
      case "single-choice":
      case "multiple-choice":
        return renderChoiceResults(question);
      case "rating":
        return renderRatingResults();
      case "text":
        return renderTextResults();
      default:
        return <p className="text-muted-foreground text-sm">Unknown question type</p>;
    }
  };

  return (
    <div className="space-y-6">
      {poll.questions.map((question, index) => (
        <Card key={question.id} className="border-muted border">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg font-medium">Question {index + 1}</CardTitle>
                <p className="text-muted-foreground mt-1">{question.text}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{question.type.replace("-", " ")}</Badge>
                {question.required && <Badge variant="secondary">Required</Badge>}
              </div>
            </div>
          </CardHeader>
          <CardContent>{renderQuestionResults(question)}</CardContent>
        </Card>
      ))}

      {poll.questions.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">This poll has no questions yet.</p>
        </div>
      )}
    </div>
  );
}
