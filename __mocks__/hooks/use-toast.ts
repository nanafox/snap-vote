// Mock for use-toast hook
import React from 'react';

const mockToast = jest.fn();
const mockDismiss = jest.fn();
const mockToasts: any[] = [];

export const useToast = jest.fn().mockReturnValue({
  toast: mockToast,
  dismiss: mockDismiss,
  toasts: mockToasts,
});

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  return <>{children}</>;
}
