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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Plus,
  Trash2,
  GripVertical,
  CheckSquare,
  Circle,
  Type,
  Star,
  Eye,
  EyeOff
} from "lucide-react";
import type { QuestionType } from "@/types";

const questionSchema = z.object({
  text: z.string().min(1, "Question text is required"),
  type: z.enum(["single-choice", "multiple-choice", "text", "rating"]),
  options: z.array(z.string().min(1, "Option text is required")).min(2, "At least 2 options required").optional(),
  required: z.boolean().default(true),
  allowMultiple: z.boolean().optional(),
});

const pollSchema = z.object({
  title: z.string().min(1, "Poll title is required"),
  description: z.string().optional(),
  questions: z.array(questionSchema).min(1, "At least one question is required"),
  expiresAt: z.string().optional(),
  isPublic: z.boolean().default(true),
});

type PollFormData = z.infer<typeof pollSchema>;

const questionTypeIcons = {
  "single-choice": Circle,
  "multiple-choice": CheckSquare,
  "text": Type,
  "rating": Star,
};

const questionTypeLabels = {
  "single-choice": "Single Choice",
  "multiple-choice": "Multiple Choice",
  "text": "Text Response",
  "rating": "Rating Scale",
};

export function CreatePollForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        }
      ],
      isPublic: true,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const onSubmit = async (data: PollFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement actual poll creation API call
      console.log("Creating poll:", data);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redirect to dashboard
      router.push("/dashboard/polls");
    } catch (error) {
      console.error("Error creating poll:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addQuestion = () => {
    append({
      text: "",
      type: "single-choice",
      options: ["", ""],
      required: true,
    });
  };

  const removeQuestion = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const addOption = (questionIndex: number) => {
    const currentOptions = form.getValues(`questions.${questionIndex}.options`) || [];
    form.setValue(`questions.${questionIndex}.options`, [...currentOptions, ""]);
  };

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
        {/* Poll Basic Information */}
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
                    className="text-lg h-12"
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
                <FormDescription>
                  Help participants understand the purpose and context of your poll
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="expiresAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">Expiration Date (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Leave blank for polls that never expire
                  </FormDescription>
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
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-base font-medium flex items-center space-x-2">
                      {field.value ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      <span>Public Poll</span>
                    </FormLabel>
                  </div>
                  <FormDescription>
                    {field.value
                      ? "Anyone with the link can view and vote"
                      : "Only authenticated users can participate"
                    }
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Questions Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Questions</h3>
            <Button
              type="button"
              variant="outline"
              onClick={addQuestion}
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Question</span>
            </Button>
          </div>

          {fields.map((field, questionIndex) => {
            const questionType = form.watch(`questions.${questionIndex}.type`);
            const IconComponent = questionTypeIcons[questionType];

            return (
              <Card key={field.id} className="border-2 border-dashed border-muted hover:border-primary/50 transition-colors">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                      <Badge variant="secondary" className="flex items-center space-x-1">
                        <IconComponent className="h-3 w-3" />
                        <span>{questionTypeLabels[questionType]}</span>
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Question {questionIndex + 1}
                      </span>
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
                          <Input
                            placeholder="Enter your question here"
                            {...field}
                          />
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
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

                  {/* Options for choice-based questions */}
                  {(questionType === "single-choice" || questionType === "multiple-choice") && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Answer Options</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addOption(questionIndex)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add Option
                        </Button>
                      </div>

                      {form.watch(`questions.${questionIndex}.options`)?.map((_, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-2">
                          <div className="flex-shrink-0">
                            {questionType === "single-choice" ? (
                              <Circle className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <CheckSquare className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          <FormField
                            control={form.control}
                            name={`questions.${questionIndex}.options.${optionIndex}`}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormControl>
                                  <Input
                                    placeholder={`Option ${optionIndex + 1}`}
                                    {...field}
                                  />
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

                  {questionType === "rating" && (
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Rating questions will display a 1-5 star rating scale for responses.
                      </p>
                    </div>
                  )}

                  {questionType === "text" && (
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Text questions allow participants to provide open-ended responses.
                      </p>
                    </div>
                  )}

                  <FormField
                    control={form.control}
                    name={`questions.${questionIndex}.required`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          Required question
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Submit Section */}
        <div className="flex items-center justify-between pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <div className="flex items-center space-x-3">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
            >
              Save as Draft
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[120px]"
            >
              {isSubmitting ? "Creating..." : "Create Poll"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
