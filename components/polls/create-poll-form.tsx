"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Plus, Trash2, GripVertical, CheckSquare, Circle, Type, Star, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { QuestionType } from "@/types";

/**
 * Defines the validation schema for a single question in a poll.
 * Ensures that question text is provided and that choice-based questions have at least two options.
 */
const questionSchema = z
  .object({
    text: z.string().min(1, "Question text is required"),
    type: z.enum(["single-choice", "multiple-choice", "text", "rating"]),
    options: z.array(z.string().min(1, "Option text is required")).optional(),
    required: z.boolean(),
    allowMultiple: z.boolean().optional(),
  })
  .refine(
    (data) => {
      // Choice questions (single or multiple) must have at least 2 options.
      if (data.type === "single-choice" || data.type === "multiple-choice") {
        return data.options && data.options.length >= 2;
      }
      return true;
    },
    {
      message: "Choice questions require at least 2 options",
      path: ["options"], // Specify the validation error path
    }
  );

/**
 * Defines the validation schema for the entire poll form.
 * Ensures a title is present and that there is at least one question.
 */
const pollSchema = z.object({
  title: z.string().min(1, "Poll title is required"),
  description: z.string().optional(),
  questions: z.array(questionSchema).min(1, "At least one question is required"),
  expiresAt: z.string().optional(),
  isPublic: z.boolean(),
});

type PollFormData = z.infer<typeof pollSchema>;

// Maps question types to their corresponding Lucide icon components.
const questionTypeIcons = {
  "single-choice": Circle,
  "multiple-choice": CheckSquare,
  text: Type,
  rating: Star,
};

// Maps question types to human-readable labels.
const questionTypeLabels = {
  "single-choice": "Single Choice",
  "multiple-choice": "Multiple Choice",
  text: "Text Response",
  rating: "Rating Scale",
};

/**
 * `CreatePollForm` is a client-side component that provides a dynamic form
 * for creating new polls. It supports adding/removing questions and options,
 * different question types, and validation using `react-hook-form` and `zod`.
 */
export function CreatePollForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<PollFormData>({
    resolver: zodResolver(pollSchema),
    defaultValues: {
      title: "",
      description: "",
      questions: [
        {
          text: "",
          type: "single-choice",
          options: ["", ""],
          required: true,
        },
      ],
      expiresAt: "",
      isPublic: true,
    },
  });

  // `useFieldArray` manages the dynamic list of questions in the form.
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  /**
   * Handles the form submission, sends the poll data to the API,
   * and manages success/error feedback.
   * @param {PollFormData} data - The validated form data.
   */
  const onSubmit = async (data: PollFormData) => {
    setIsSubmitting(true);
    try {
      // Send a POST request to the API endpoint to create the poll.
      const response = await fetch("/api/polls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to create poll");
      }

      // Display a success notification.
      toast({
        title: "Success!",
        description: "Your poll has been created successfully.",
      });

      // Redirect the user to the polls dashboard.
      router.push("/dashboard/polls");
    } catch (error) {
      // Display an error notification if the submission fails.
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create poll. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Adds a new question to the form, with a limit of 20 questions.
   */
  const addQuestion = () => {
    if (fields.length < 20) {
      append({
        text: "",
        type: "single-choice",
        options: ["", ""],
        required: true,
      });
    }
  };

  /**
   * Removes a question from the form, ensuring at least one question remains.
   * @param {number} index - The index of the question to remove.
   */
  const removeQuestion = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  /**
   * Adds a new option to a choice-based question, with a limit of 10 options.
   * @param {number} questionIndex - The index of the question to add an option to.
   */
  const addOption = (questionIndex: number) => {
    const currentOptions = form.getValues(`questions.${questionIndex}.options`) || [];
    if (currentOptions.length < 10) {
      form.setValue(`questions.${questionIndex}.options`, [...currentOptions, ""]);
    }
  };

  /**
   * Removes an option from a choice-based question, ensuring at least two options remain.
   * @param {number} questionIndex - The index of the question.
   * @param {number} optionIndex - The index of the option to remove.
   */
  const removeOption = (questionIndex: number, optionIndex: number) => {
    const currentOptions = form.getValues(`questions.${questionIndex}.options`) || [];
    if (currentOptions.length > 2) {
      const newOptions = currentOptions.filter((_, i) => i !== optionIndex);
      form.setValue(`questions.${questionIndex}.options`, newOptions);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Poll Basic Information: Title, Description, Expiration, and Visibility */}
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Poll Title *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a clear, engaging title for your poll"
                    className="h-12 text-lg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Description (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Provide additional context or instructions for your poll"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Help participants understand the purpose and context of your poll</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="expiresAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">Expiration Date (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      value={field.value || ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormDescription>Leave blank for polls that never expire</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-end">
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="flex items-center space-x-2 text-base font-medium">
                      {field.value ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      <span>Public Poll</span>
                    </FormLabel>
                  </div>
                  <FormDescription>
                    {field.value
                      ? "Anyone with the link can view and vote"
                      : "Only authenticated users can participate"}
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Dynamic Questions Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Questions</h3>
            <Button
              type="button"
              variant="outline"
              onClick={addQuestion}
              disabled={fields.length >= 20}
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Question ({fields.length}/20)</span>
            </Button>
          </div>

          {fields.map((field, questionIndex) => {
            const questionType = form.watch(`questions.${questionIndex}.type`);
            const IconComponent = questionTypeIcons[questionType];

            return (
              <Card
                key={field.id}
                className="border-muted hover:border-primary/50 border-2 border-dashed transition-colors"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <GripVertical className="text-muted-foreground h-4 w-4" />
                      <Badge variant="secondary" className="flex items-center space-x-1">
                        <IconComponent className="h-3 w-3" />
                        <span>{questionTypeLabels[questionType]}</span>
                      </Badge>
                      <span className="text-muted-foreground text-sm">Question {questionIndex + 1}</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeQuestion(questionIndex)}
                      disabled={fields.length === 1}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name={`questions.${questionIndex}.text`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Question Text *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your question here" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`questions.${questionIndex}.type`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Question Type</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            // When changing question type, reset options accordingly.
                            const newType = value as QuestionType;
                            const currentOptions = form.getValues(`questions.${questionIndex}.options`) || [];

                            if (newType === "single-choice" || newType === "multiple-choice") {
                              // Ensure at least two empty options for choice-based questions.
                              if (currentOptions.length < 2) {
                                form.setValue(`questions.${questionIndex}.options`, ["", ""]);
                              }
                            } else {
                              // Clear options for non-choice questions (text, rating).
                              form.setValue(`questions.${questionIndex}.options`, []);
                            }
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select question type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.entries(questionTypeLabels).map(([value, label]) => {
                              const Icon = questionTypeIcons[value as QuestionType];
                              return (
                                <SelectItem key={value} value={value}>
                                  <div className="flex items-center space-x-2">
                                    <Icon className="h-4 w-4" />
                                    <span>{label}</span>
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Dynamically render options for choice-based questions */}
                  {(questionType === "single-choice" || questionType === "multiple-choice") && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Answer Options</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addOption(questionIndex)}
                          disabled={(form.watch(`questions.${questionIndex}.options`) || []).length >= 10}
                        >
                          <Plus className="mr-1 h-3 w-3" />
                          Add Option
                        </Button>
                      </div>

                      {form.watch(`questions.${questionIndex}.options`)?.map((_, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-2">
                          <div className="flex-shrink-0">
                            {questionType === "single-choice" ? (
                              <Circle className="text-muted-foreground h-4 w-4" />
                            ) : (
                              <CheckSquare className="text-muted-foreground h-4 w-4" />
                            )}
                          </div>
                          <FormField
                            control={form.control}
                            name={`questions.${questionIndex}.options.${optionIndex}`}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormControl>
                                  <Input placeholder={`Option ${optionIndex + 1}`} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeOption(questionIndex, optionIndex)}
                            disabled={(form.watch(`questions.${questionIndex}.options`) || []).length <= 2}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Informational text for rating questions */}
                  {questionType === "rating" && (
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-muted-foreground text-sm">
                        Rating questions will display a 1-5 star rating scale for responses.
                      </p>
                    </div>
                  )}

                  {/* Informational text for text-based questions */}
                  {questionType === "text" && (
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-muted-foreground text-sm">
                        Text questions allow participants to provide open-ended responses.
                      </p>
                    </div>
                  )}

                  <FormField
                    control={form.control}
                    name={`questions.${questionIndex}.required`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-y-0 space-x-3">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">Required question</FormLabel>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Form Submission Buttons */}
        <div className="flex items-center justify-between border-t pt-6">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <div className="flex items-center space-x-3">
            <Button type="button" variant="outline" disabled={isSubmitting}>
              Save as Draft
            </Button>
            <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
              {isSubmitting ? "Creating..." : "Create Poll"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
