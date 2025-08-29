"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export function CreatePollButton() {
  return (
    <Link href="/dashboard/polls/create">
      <Button size="lg" className="shadow-md hover:shadow-lg transition-shadow">
        <PlusCircle className="h-5 w-5 mr-2" />
        Create Poll
      </Button>
    </Link>
  );
}
