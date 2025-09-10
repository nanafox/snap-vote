"use client";

import { BarChart3, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth";
import { ThemeToggleButton } from "./theme-toggle-button";

export function PublicHeader() {
  const { session } = useAuth();

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <BarChart3 className="text-primary h-8 w-8" />
            <span className="text-foreground text-2xl font-bold">SnapVote</span>
          </div>
        </Link>
        <nav className="flex items-center space-x-4">
          <ThemeToggleButton />
          {session ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link href="/dashboard/polls/create">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Poll
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
