"use client";

import { useState } from "react";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type AuthView = "login" | "register";

interface AuthFormProps {
  defaultView?: AuthView;
}

export function AuthForm({ defaultView = "login" }: AuthFormProps) {
  const [view, setView] = useState<AuthView>(defaultView);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{view === "login" ? "Sign In" : "Create an account"}</CardTitle>
        <CardDescription>
          {view === "login" ? "Welcome back! Please sign in to continue." : "Enter your details to get started."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 grid grid-cols-2 gap-x-2">
          <Button
            variant={view === "login" ? "default" : "outline"}
            onClick={() => setView("login")}
            className="transition-all"
          >
            Sign In
          </Button>
          <Button
            variant={view === "register" ? "default" : "outline"}
            onClick={() => setView("register")}
            className="transition-all"
          >
            Sign Up
          </Button>
        </div>
        {view === "login" ? <LoginForm /> : <RegisterForm />}
      </CardContent>
    </Card>
  );
}
