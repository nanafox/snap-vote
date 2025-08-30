// Shared polls storage - in a real app this would be a database
export interface Option {
  id: string;
  text: string;
  votes: number;
}

export interface Question {
  id: string;
  text: string;
  type: "single-choice" | "multiple-choice" | "text" | "rating";
  options: Option[];
  required: boolean;
  allowMultiple: boolean;
}

export interface Poll {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date | null;
  isActive: boolean;
  isPublic: boolean;
  createdBy: string;
  totalVotes: number;
}

export interface CreatePollInput {
  title: string;
  description: string;
  questions: Array<{
    text: string;
    type: "single-choice" | "multiple-choice" | "text" | "rating";
    options: string[];
    required: boolean;
    allowMultiple: boolean;
  }>;
  expiresAt: Date | null;
  isPublic: boolean;
}

// In-memory storage
const polls: Poll[] = [];
let nextId = 1;

// Initialize with some mock polls for demonstration
function initializeMockPolls() {
  if (polls.length === 0) {
    // Mock Poll 1: Team Lunch Preferences
    const poll1: Poll = {
      id: `poll_${nextId++}`,
      title: "Team Lunch Preferences",
      description: "Help us decide where to go for our next team lunch. We want to make sure everyone's dietary preferences are considered.",
      questions: [
        {
          id: `q_1_0`,
          text: "Which restaurant do you prefer for our team lunch?",
          type: "single-choice",
          options: [
            { id: "opt_1_0_0", text: "Italian Restaurant", votes: 12 },
            { id: "opt_1_0_1", text: "Mexican Grill", votes: 8 },
            { id: "opt_1_0_2", text: "Asian Fusion", votes: 15 },
            { id: "opt_1_0_3", text: "Mediterranean Cafe", votes: 5 },
          ],
          required: true,
          allowMultiple: false,
        },
        {
          id: `q_1_1`,
          text: "Any dietary restrictions we should consider?",
          type: "multiple-choice",
          options: [
            { id: "opt_1_1_0", text: "Vegetarian", votes: 8 },
            { id: "opt_1_1_1", text: "Vegan", votes: 3 },
            { id: "opt_1_1_2", text: "Gluten-free", votes: 2 },
            { id: "opt_1_1_3", text: "No restrictions", votes: 25 },
          ],
          required: false,
          allowMultiple: true,
        },
      ],
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-15"),
      expiresAt: new Date("2024-02-15"),
      isActive: true,
      isPublic: true,
      createdBy: "user1",
      totalVotes: 40,
    };

    // Mock Poll 2: Office Meeting Room Booking
    const poll2: Poll = {
      id: `poll_${nextId++}`,
      title: "Office Meeting Room Booking System",
      description: "Which time slot works best for the all-hands meeting? We're trying to find a time that works for everyone across different time zones.",
      questions: [
        {
          id: `q_2_0`,
          text: "Preferred meeting time for the all-hands meeting",
          type: "single-choice",
          options: [
            { id: "opt_2_0_0", text: "9:00 AM EST", votes: 5 },
            { id: "opt_2_0_1", text: "11:00 AM EST", votes: 12 },
            { id: "opt_2_0_2", text: "2:00 PM EST", votes: 8 },
            { id: "opt_2_0_3", text: "4:00 PM EST", votes: 3 },
          ],
          required: true,
          allowMultiple: false,
        },
      ],
      createdAt: new Date("2024-01-14"),
      updatedAt: new Date("2024-01-14"),
      expiresAt: null,
      isActive: true,
      isPublic: false,
      createdBy: "user1",
      totalVotes: 28,
    };

    // Mock Poll 3: Company Event Theme Selection
    const poll3: Poll = {
      id: `poll_${nextId++}`,
      title: "Company Event Theme Selection",
      description: "Vote for the theme of our annual company event. This will help us plan decorations, activities, and catering.",
      questions: [
        {
          id: `q_3_0`,
          text: "Which theme do you prefer for our annual company event?",
          type: "single-choice",
          options: [
            { id: "opt_3_0_0", text: "80s Retro Party", votes: 18 },
            { id: "opt_3_0_1", text: "Casino Night", votes: 22 },
            { id: "opt_3_0_2", text: "Outdoor BBQ", votes: 15 },
            { id: "opt_3_0_3", text: "Formal Gala", votes: 10 },
          ],
          required: true,
          allowMultiple: false,
        },
        {
          id: `q_3_1`,
          text: "Rate the importance of having live entertainment",
          type: "rating",
          options: [],
          required: false,
          allowMultiple: false,
        },
        {
          id: `q_3_2`,
          text: "Any additional suggestions for the event?",
          type: "text",
          options: [],
          required: false,
          allowMultiple: false,
        },
      ],
      createdAt: new Date("2024-01-10"),
      updatedAt: new Date("2024-01-12"),
      expiresAt: new Date("2024-01-25"),
      isActive: false,
      isPublic: true,
      createdBy: "user1",
      totalVotes: 65,
    };

    // Mock Poll 4: Product Feature Prioritization
    const poll4: Poll = {
      id: `poll_${nextId++}`,
      title: "Product Feature Prioritization",
      description: "Help us prioritize which features to work on next quarter. Your input will directly influence our development roadmap.",
      questions: [
        {
          id: `q_4_0`,
          text: "Which feature should we prioritize for the next release?",
          type: "single-choice",
          options: [
            { id: "opt_4_0_0", text: "Dark Mode", votes: 25 },
            { id: "opt_4_0_1", text: "Mobile App", votes: 18 },
            { id: "opt_4_0_2", text: "Advanced Analytics", votes: 12 },
            { id: "opt_4_0_3", text: "API Integration", votes: 8 },
          ],
          required: true,
          allowMultiple: false,
        },
        {
          id: `q_4_1`,
          text: "How would you rate the current user interface?",
          type: "rating",
          options: [],
          required: true,
          allowMultiple: false,
        },
      ],
      createdAt: new Date("2024-01-12"),
      updatedAt: new Date("2024-01-13"),
      expiresAt: null,
      isActive: true,
      isPublic: false,
      createdBy: "user1",
      totalVotes: 63,
    };

    // Mock Poll 5: Remote Work Preferences
    const poll5: Poll = {
      id: `poll_${nextId++}`,
      title: "Remote Work Preferences Survey",
      description: "Understanding team preferences for remote work policies and office arrangements going forward.",
      questions: [
        {
          id: `q_5_0`,
          text: "What is your preferred work arrangement?",
          type: "single-choice",
          options: [
            { id: "opt_5_0_0", text: "Fully Remote", votes: 22 },
            { id: "opt_5_0_1", text: "Hybrid (2-3 days office)", votes: 35 },
            { id: "opt_5_0_2", text: "Mostly Office", votes: 8 },
            { id: "opt_5_0_3", text: "Fully Office", votes: 5 },
          ],
          required: true,
          allowMultiple: false,
        },
        {
          id: `q_5_1`,
          text: "Which days would you prefer to be in the office? (if hybrid)",
          type: "multiple-choice",
          options: [
            { id: "opt_5_1_0", text: "Monday", votes: 15 },
            { id: "opt_5_1_1", text: "Tuesday", votes: 28 },
            { id: "opt_5_1_2", text: "Wednesday", votes: 32 },
            { id: "opt_5_1_3", text: "Thursday", votes: 25 },
            { id: "opt_5_1_4", text: "Friday", votes: 8 },
          ],
          required: false,
          allowMultiple: true,
        },
      ],
      createdAt: new Date("2024-01-08"),
      updatedAt: new Date("2024-01-09"),
      expiresAt: null,
      isActive: true,
      isPublic: true,
      createdBy: "user1",
      totalVotes: 70,
    };

    polls.push(poll1, poll2, poll3, poll4, poll5);
    nextId = 6; // Set next ID to continue from here
  }
}

// Initialize mock polls when the module loads
initializeMockPolls();

export function addPoll(input: CreatePollInput): Poll {
  const poll: Poll = {
    id: `poll_${nextId}`,
    title: input.title,
    description: input.description,
    questions: input.questions.map((q, qIndex) => ({
      id: `q_${nextId}_${qIndex}`,
      text: q.text,
      type: q.type,
      options: q.options.map((optText, oIndex) => ({
        id: `opt_${nextId}_${qIndex}_${oIndex}`,
        text: optText,
        votes: 0,
      })),
      required: q.required,
      allowMultiple: q.allowMultiple,
    })),
    createdAt: new Date(),
    updatedAt: new Date(),
    expiresAt: input.expiresAt,
    isActive: true,
    isPublic: input.isPublic,
    createdBy: "anonymous", // Replace with actual user ID when auth is implemented
    totalVotes: 0,
  };

  polls.push(poll);
  nextId++;
  return poll;
}

export function getPollById(id: string): Poll | null {
  return polls.find((poll) => poll.id === id) || null;
}

export function getAllPolls(): Poll[] {
  return [...polls];
}

export function updatePoll(id: string, updates: Partial<Poll>): Poll | null {
  const pollIndex = polls.findIndex((poll) => poll.id === id);
  if (pollIndex === -1) return null;

  polls[pollIndex] = {
    ...polls[pollIndex],
    ...updates,
    updatedAt: new Date(),
  };

  return polls[pollIndex];
}

export function deletePoll(id: string): boolean {
  const pollIndex = polls.findIndex((poll) => poll.id === id);
  if (pollIndex === -1) return false;

  polls.splice(pollIndex, 1);
  return true;
}
