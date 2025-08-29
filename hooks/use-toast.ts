// Simple toast implementation - replace with a proper toast library like sonner or react-hot-toast
import { useState, useCallback } from "react";

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "destructive";
}

let toastCounter = 0;

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(({ title, description, variant = "default" }: Omit<Toast, "id">) => {
    const id = `toast-${++toastCounter}`;
    const newToast: Toast = { id, title, description, variant };

    setToasts(prev => [...prev, newToast]);

    // Auto-remove toast after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);

    // For now, just log to console - replace with actual toast UI
    console.log(`Toast: ${title}${description ? ` - ${description}` : ''}`);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return {
    toast,
    dismiss,
    toasts,
  };
}
