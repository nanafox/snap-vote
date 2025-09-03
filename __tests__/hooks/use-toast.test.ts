import { renderHook, act, waitFor } from '@testing-library/react';
import { useToast } from '@/hooks/use-toast';

describe.skip('useToast', () => {
  it('should add and remove toasts', async () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: 'Hello' });
    });

    await waitFor(() => {
      expect(result.current.toasts.length).toBe(1);
    });

    expect(result.current.toasts[0].title).toBe('Hello');

    const toastId = result.current.toasts[0].id;
    act(() => {
      result.current.dismiss(toastId);
    });

    expect(result.current.toasts.length).toBe(0);
  });
});
