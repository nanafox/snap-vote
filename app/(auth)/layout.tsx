export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex h-[100vh] flex-1 items-center justify-center bg-gray-50 p-6 dark:bg-gray-900">
        {children}
      </main>
    </>
  );
}
