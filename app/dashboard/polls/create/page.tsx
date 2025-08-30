import { Metadata } from "next";
import { CreatePollForm } from "@/components/polls/create-poll-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Create New Poll",
  description:
    "Build an engaging poll to gather insights from your audience with multiple question types and customization options.",
};

export default function CreatePollPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-foreground text-3xl font-bold tracking-tight">Create New Poll</h1>
        <p className="text-muted-foreground text-lg">Build an engaging poll to gather insights from your audience.</p>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Poll Details</CardTitle>
          <CardDescription>Fill in the information below to create your poll</CardDescription>
        </CardHeader>
        <CardContent>
          <CreatePollForm />
        </CardContent>
      </Card>
    </div>
  );
}
