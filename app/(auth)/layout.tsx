import { PublicHeader } from "@/components/layout/public-header";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicHeader />
      <main className="flex flex-1 items-center justify-center bg-gray-50 p-6 dark:bg-gray-900">
        {children}
      </main>
    </>
  );
}

