export interface Poll {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
  isActive: boolean;
  isPublic: boolean;
  createdBy: string; // Will be user ID when auth is added
  totalVotes: number;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options: Option[];
  required: boolean;
  allowMultiple?: boolean; // For checkbox type questions
}

export type QuestionType = "single-choice" | "multiple-choice" | "text" | "rating";

export interface Option {
  id: string;
  text: string;
  votes: number;
}

export interface Vote {
  id: string;
  pollId: string;
  questionId: string;
  optionId?: string;
  textResponse?: string;
  ratingValue?: number;
  votedAt: Date;
  voterIP?: string; // For anonymous voting before auth
}

export interface CreatePollData {
  title: string;
  description?: string;
  questions: CreateQuestionData[];
  expiresAt?: Date;
  isPublic: boolean;
}

export interface CreateQuestionData {
  text: string;
  type: QuestionType;
  options: string[];
  required: boolean;
  allowMultiple?: boolean;
}

export interface PollFilters {
  search?: string;
  status?: "all" | "active" | "expired";
  sortBy?: "newest" | "oldest" | "most-voted";
}
