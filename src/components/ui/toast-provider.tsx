import { createContext, useContext, useState } from "react";
import { ToastData, Toast } from "@/hooks/useToast";

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<ToastData, "id">) => string;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toastData: Omit<ToastData, "id">) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const toast: Toast = {
      ...toastData,
      id,
      open: true,
      duration: toastData.duration ?? 5000,
    };

    setToasts((prev) => [...prev, toast]);

    if (toast.duration && toast.duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, toast.duration);
    }

    return id;
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, dismissToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return context;
}

function ToastContainer() {
  const { toasts, dismissToast } = useToastContext();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            p-4 rounded-lg shadow-lg backdrop-blur-sm border max-w-sm
            ${toast.variant === "destructive" 
              ? "bg-destructive text-destructive-foreground border-destructive" 
              : toast.variant === "success"
              ? "bg-success text-success-foreground border-success"
              : "bg-background border-border"
            }
            animate-slide-in-right
          `}
        >
          <div className="flex justify-between items-start">
            <div>
              {toast.title && (
                <p className="font-semibold text-sm">{toast.title}</p>
              )}
              {toast.description && (
                <p className="text-sm opacity-90 mt-1">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-sm opacity-70 hover:opacity-100 ml-2"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}