"use client";

import * as React from "react";
import type { ComponentProps } from "react";
type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>;
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props} attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen w-full overflow-x-hidden">{children}</div>
    </NextThemesProvider>
  );
}
