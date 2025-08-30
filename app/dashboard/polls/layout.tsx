import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Polls",
  description: "Manage and view all your polls in one place. Search, filter, and organize your polling campaigns.",
};

export default function PollsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
