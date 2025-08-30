"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, BarChart3, Users, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import type { Poll, Question } from "@/types";

interface PublicPollViewProps {
  poll: Poll;
}

interface FormData {
  [questionId: string]: string | string[] | number;
}

export function PublicPollView({ poll }: PublicPollViewProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Submit vote data to API
      console.log("Submitting votes:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSubmitted(true);
      setShowResults(true);
    } catch (error) {
      console.error("Error submitting votes:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      return "Invalid Date";
    }

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(dateObj);
  };

  const renderQuestion = (question: Question) => {
    const fieldName = `question_${question.id}`;

    switch (question.type) {
      case "single-choice":
        return (
          <RadioGroup onValueChange={(value) => setValue(fieldName, value)} className="space-y-3">
            {question.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.id} id={`${fieldName}_${option.id}`} />
                <Label htmlFor={`${fieldName}_${option.id}`} className="flex-1 cursor-pointer">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case "multiple-choice":
        return (
          <div className="space-y-3">
            {question.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`${fieldName}_${option.id}`}
                  onCheckedChange={(checked) => {
                    const currentValues = (watch(fieldName) as string[]) || [];
                    if (checked) {
                      setValue(fieldName, [...currentValues, option.id]);
                    } else {
                      setValue(
                        fieldName,
                        currentValues.filter((id) => id !== option.id)
                      );
                    }
                  }}
                />
                <Label htmlFor={`${fieldName}_${option.id}`} className="flex-1 cursor-pointer">
                  {option.text}
                </Label>
              </div>
            ))}
          </div>
        );

      case "rating":
        return (
          <div className="space-y-3">
            <p className="text-muted-foreground text-sm">Rate from 1 (poor) to 5 (excellent)</p>
            <RadioGroup onValueChange={(value) => setValue(fieldName, parseInt(value))} className="flex space-x-6">
              {[1, 2, 3, 4, 5].map((rating) => (
                <div key={rating} className="flex flex-col items-center space-y-2">
                  <RadioGroupItem value={rating.toString()} id={`${fieldName}_${rating}`} />
                  <Label htmlFor={`${fieldName}_${rating}`} className="flex cursor-pointer flex-col items-center">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <span className="text-xs">{rating}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case "text":
        return (
          <Textarea
            {...register(fieldName, {
              required: question.required ? "This field is required" : false,
            })}
            placeholder="Enter your response here..."
            className="min-h-[100px]"
          />
        );

      default:
        return <p className="text-muted-foreground">Unsupported question type</p>;
    }
  };

  const renderResults = (question: Question) => {
    // Simplified results view for public polls
    const totalVotes = question.options.reduce((sum, option) => sum + option.votes, 0);

    return (
      <div className="space-y-3">
        {question.options.map((option) => {
          const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;

          return (
            <div key={option.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{option.text}</span>
                <Badge variant="secondary">{percentage.toFixed(1)}%</Badge>
              </div>
              <Progress value={percentage} className="h-2" />
            </div>
          );
        })}
      </div>
    );
  };

  if (!poll.isActive) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="py-12 text-center">
            <AlertCircle className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <h2 className="mb-2 text-xl font-semibold">Poll Ended</h2>
            <p className="text-muted-foreground">This poll is no longer accepting responses.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      {/* Header */}
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold">{poll.title}</h1>
        {poll.description && <p className="text-muted-foreground mx-auto max-w-2xl text-lg">{poll.description}</p>}

        <div className="text-muted-foreground flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{poll.totalVotes} responses</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>Created {formatDate(poll.createdAt)}</span>
          </div>
          {poll.expiresAt && (
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Expires {formatDate(poll.expiresAt)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Success Message */}
      {isSubmitted && (
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
          <CardContent className="flex items-center space-x-3 py-4">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium text-green-800 dark:text-green-200">Thank you for your response!</p>
              <p className="text-sm text-green-700 dark:text-green-300">Your vote has been recorded successfully.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Poll Form or Results */}
      {!isSubmitted ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {poll.questions.map((question, index) => (
            <Card key={question.id} className="border-0 shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-medium">
                      Question {index + 1}
                      {question.required && <span className="text-destructive ml-1">*</span>}
                    </CardTitle>
                    <CardDescription className="mt-1">{question.text}</CardDescription>
                  </div>
                  <Badge variant="outline">{question.type.replace("-", " ")}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                {renderQuestion(question)}
                {errors[`question_${question.id}`] && (
                  <p className="text-destructive mt-2 text-sm">
                    {errors[`question_${question.id}`]?.message as string}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-center space-x-4">
            <Button type="submit" disabled={isSubmitting} size="lg" className="min-w-[160px]">
              {isSubmitting ? "Submitting..." : "Submit Response"}
            </Button>

            {!isSubmitted && (
              <Button type="button" variant="outline" onClick={() => setShowResults(!showResults)} size="lg">
                <BarChart3 className="mr-2 h-4 w-4" />
                {showResults ? "Hide Results" : "View Results"}
              </Button>
            )}
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="text-center">
            <Button onClick={() => setShowResults(!showResults)} variant="outline" size="lg">
              <BarChart3 className="mr-2 h-4 w-4" />
              {showResults ? "Hide Results" : "View Results"}
            </Button>
          </div>
        </div>
      )}

      {/* Results Section */}
      {showResults && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="mb-2 text-2xl font-bold">Poll Results</h2>
            <p className="text-muted-foreground">Current results from all participants</p>
          </div>

          {poll.questions.map((question, index) => (
            <Card key={question.id} className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-medium">
                  Question {index + 1}: {question.text}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {question.type === "single-choice" || question.type === "multiple-choice" ? (
                  renderResults(question)
                ) : (
                  <p className="text-muted-foreground">Results not available for this question type</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
