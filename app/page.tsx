import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, Zap, Shield, ArrowRight, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">SnapVote</span>
            </div>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/dashboard/polls/create">
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Poll
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6">
            Fast & Simple Polling
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Create Polls in a <span className="text-primary italic underline">Snap</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Build engaging polls, gather insights, and make data-driven decisions.
            Perfect for teams, communities, and events.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard/polls/create">
              <Button size="lg" className="w-full sm:w-auto">
                <PlusCircle className="h-5 w-5 mr-2" />
                Create Your First Poll
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View Dashboard
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose SnapVote?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create, share, and analyze polls efficiently.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Zap className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Create and deploy polls in seconds. No complex setup required.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Real-time Results</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Watch votes come in live with beautiful, interactive charts.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Rich Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get detailed insights with comprehensive analytics and reporting.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>Secure & Private</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Your data is protected with enterprise-grade security measures.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto text-center">
          <Card className="max-w-2xl mx-auto border-0 shadow-lg bg-gradient-to-r from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className="text-3xl mb-4">Ready to Get Started?</CardTitle>
              <CardDescription className="text-lg">
                Join thousands of users who trust SnapVote for their polling needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/polls/create">
                <Button size="lg" className="w-full sm:w-auto">
                  Create Your First Poll Now
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">SnapVote</span>
          </div>
          <p className="text-muted-foreground">
            Fast, secure, and beautiful polling platform for modern teams.
          </p>
        </div>
      </footer>
    </div>
  );
}
