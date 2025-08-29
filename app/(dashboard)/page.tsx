export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s what&apos;s happening with your polls.
          </p>
        </div>
        <div className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Poll Button Placeholder
        </div>
      </div>

      <div className="p-8 bg-white dark:bg-gray-900 rounded-lg border">
        <p>Dashboard content will be loaded here</p>
      </div>
    </div>
  );
}
