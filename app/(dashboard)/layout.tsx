export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 dark:bg-gray-800 border-r p-4">
        <h2 className="text-lg font-bold mb-4">SnapVote</h2>
        <nav className="space-y-2">
          <a href="/dashboard" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
            Dashboard
          </a>
          <a href="/dashboard/polls" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
            All Polls
          </a>
          <a href="/dashboard/polls/create" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
            Create Poll
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-900 border-b px-6 py-4">
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </header>
        <main className="flex-1 overflow-auto p-6 bg-muted/20">
          {children}
        </main>
      </div>
    </div>
  );
}
