// Manual mock for @/hooks/use-toast to support Jest alias

const mockToast = jest.fn();
const mockDismiss = jest.fn();
const mockToasts = [];

export const useToast = jest.fn().mockReturnValue({
  toast: mockToast,
  dismiss: mockDismiss,
  toasts: mockToasts,
});

export function ToastProvider({ children }) {
  return children;
}
