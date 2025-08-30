import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="bg-background flex h-screen">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden md:ml-64">
          <Header />
          <main className="bg-muted/20 flex-1 overflow-y-auto p-6">
            <div className="max-w-full">{children}</div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
