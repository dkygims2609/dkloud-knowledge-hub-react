import { useState, useCallback } from "react";

export interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
  duration?: number;
}

export interface Toast extends ToastData {
  open: boolean;
}

let toastCounter = 0;

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toastData: Omit<ToastData, "id">) => {
    const id = `toast-${++toastCounter}`;
    const toast: Toast = {
      ...toastData,
      id,
      open: true,
      duration: toastData.duration ?? 5000,
    };

    setToasts((prev) => [...prev, toast]);

    // Auto dismiss
    if (toast.duration && toast.duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, toast.duration);
    }

    return id;
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((data: Omit<ToastData, "id">) => {
    return addToast(data);
  }, [addToast]);

  // Success toast shorthand
  const toastSuccess = useCallback((title: string, description?: string) => {
    return addToast({ title, description, variant: "success" });
  }, [addToast]);

  // Error toast shorthand
  const toastError = useCallback((title: string, description?: string) => {
    return addToast({ title, description, variant: "destructive" });
  }, [addToast]);

  return {
    toasts,
    toast,
    dismissToast,
    success: toastSuccess,
    error: toastError,
  };
}