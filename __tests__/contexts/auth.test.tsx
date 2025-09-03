import { render, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "@/contexts/auth";
import React from "react";

jest.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: {
      getSession: jest.fn(() => Promise.resolve({ data: { session: null } })),
      onAuthStateChange: jest.fn(() => ({
        data: { subscription: { unsubscribe: jest.fn() } },
      })),
    },
  }),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe("Auth Context", () => {
  it("provides default auth state and updates on mount", async () => {
    let auth;
    function TestComponent() {
      auth = useAuth();
      return null;
    }

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Initially, loading is true
    expect(auth.loading).toBe(true);
    expect(auth.session).toBeNull();

    // After useEffect runs
    await waitFor(() => {
      expect(auth.loading).toBe(false);
      expect(auth.session).toBeNull();
    });
  });
});
