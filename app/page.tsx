"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, Zap, Shield, ArrowRight, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth";
import { PublicHeader } from "@/components/layout/public-header";

export default function Home() {
  const { session } = useAuth();

  return (
    <div className="from-background via-background to-muted/20 min-h-screen bg-gradient-to-br">
      {/* Header */}
      <PublicHeader />

      {/* Hero Section */}
      <section className="px-4 py-24">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6">
            Fast & Simple Polling
          </Badge>
          <h1 className="from-foreground to-foreground/70 mb-6 bg-gradient-to-r bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
            Create Polls in a <span className="text-primary italic underline">Snap</span>
          </h1>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl">
            Build engaging polls, gather insights, and make data-driven decisions. Perfect for teams, communities, and
            events.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href={session ? "/dashboard/polls/create" : "/register"}>
              <Button size="lg" className="w-full sm:w-auto">
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Your First Poll
              </Button>
            </Link>
            <Link href={session ? "/dashboard" : "/login"}>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 px-4 py-24">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Why Choose SnapVote?</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
              Everything you need to create, share, and analyze polls efficiently.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-0 shadow-md transition-shadow hover:shadow-lg">
              <CardHeader className="text-center">
                <Zap className="text-primary mx-auto mb-4 h-12 w-12" />
                <CardTitle>Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Create and deploy polls in seconds. No complex setup required.</CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md transition-shadow hover:shadow-lg">
              <CardHeader className="text-center">
                <Users className="text-primary mx-auto mb-4 h-12 w-12" />
                <CardTitle>Real-time Results</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Watch votes come in live with beautiful, interactive charts.</CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md transition-shadow hover:shadow-lg">
              <CardHeader className="text-center">
                <BarChart3 className="text-primary mx-auto mb-4 h-12 w-12" />
                <CardTitle>Rich Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Get detailed insights with comprehensive analytics and reporting.</CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md transition-shadow hover:shadow-lg">
              <CardHeader className="text-center">
                <Shield className="text-primary mx-auto mb-4 h-12 w-12" />
                <CardTitle>Secure & Private</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Your data is protected with enterprise-grade security measures.</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-24">
        <div className="container mx-auto text-center">
          <Card className="from-primary/5 to-primary/10 mx-auto max-w-2xl border-0 bg-gradient-to-r shadow-lg">
            <CardHeader>
              <CardTitle className="mb-4 text-3xl">Ready to Get Started?</CardTitle>
              <CardDescription className="text-lg">
                Join thousands of users who trust SnapVote for their polling needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={session ? "/dashboard/polls/create" : "/register"}>
                <Button size="lg" className="w-full sm:w-auto">
                  Create Your First Poll Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 mt-auto border-t py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4 flex items-center justify-center space-x-2">
            <BarChart3 className="text-primary h-6 w-6" />
            <span className="text-xl font-bold">SnapVote</span>
          </div>
          <p className="text-muted-foreground">Fast, secure, and beautiful polling platform for modern teams.</p>
        </div>
      </footer>
    </div>
  );
}
