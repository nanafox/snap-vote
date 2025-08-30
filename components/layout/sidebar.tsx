"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BarChart3, Home, PlusCircle, Settings, BarChart, Menu, X } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "All Polls", href: "/dashboard/polls", icon: BarChart },
  { name: "Create Poll", href: "/dashboard/polls/create", icon: PlusCircle },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="bg-background flex items-center space-x-2 border-b p-6">
        <BarChart3 className="text-primary h-8 w-8" />
        <span className="text-foreground text-2xl font-bold">SnapVote</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "h-12 w-full justify-start",
                  isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="bg-background border-t p-4">
        <div className="text-muted-foreground text-center text-sm">
          <p>SnapVote Dashboard</p>
          <p className="mt-1 text-xs">v1.0.0</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="bg-background fixed z-30 hidden h-full w-64 flex-col border-r md:flex">
        <SidebarContent />
      </div>

      {/* Mobile Menu Button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button variant="outline" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="bg-background relative flex w-64 flex-col border-r">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}
