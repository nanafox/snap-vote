"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

/**
 * @typedef {object} AuthContextType
 * @property {Session | null} session - The current user session, or null if not authenticated.
 * @property {boolean} loading - True while the session is being loaded, false otherwise.
 */
type AuthContextType = {
  session: Session | null;
  loading: boolean;
};

/**
 * `AuthContext` provides authentication state to its children components.
 * It holds the current user session and a loading state.
 */
const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
});

/**
 * `AuthProvider` is a component that manages the authentication state of the application.
 * It fetches the user's session from Supabase and listens for authentication state changes.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} The provider component.
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // This effect runs once on the client to indicate that the component has mounted.
  // This is used to prevent auth logic from running during server-side rendering (SSR).
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Only run the auth logic on the client side.
    if (!mounted) return;

    const supabase = createClient();

    // Immediately fetch the current session when the component mounts.
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Set up a listener for authentication state changes (e.g., SIGNED_IN, SIGNED_OUT).
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setLoading(false);

      
    });

    // Clean up the subscription when the component unmounts.
    return () => {
      subscription.unsubscribe();
    };
  }, [mounted, router]);

  // While waiting for the component to mount or the session to load,
  // provide a loading state to children components.
  if (!mounted || loading) {
    return <AuthContext.Provider value={{ session: null, loading: true }}>{children}</AuthContext.Provider>;
  }

  return <AuthContext.Provider value={{ session, loading }}>{children}</AuthContext.Provider>;
};

/**
 * `useAuth` is a custom hook that provides access to the authentication context.
 * It must be used within a component wrapped by `AuthProvider`.
 *
 * @returns {AuthContextType} The authentication context, including the session and loading state.
 * @throws {Error} If used outside of an `AuthProvider`.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
