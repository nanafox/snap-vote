"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export function CreatePollButton() {
  return (
    <Link href="/dashboard/polls/create">
      <Button size="lg" className="shadow-md transition-shadow hover:shadow-lg">
        <PlusCircle className="mr-2 h-5 w-5" />
        Create Poll
      </Button>
    </Link>
  );
}
