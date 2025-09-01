import { toast } from "../components/ui/use-toast";

type ToastType = "success" | "error" | "info" | "warning";

interface ShowToastProps {
  title?: string;
  description: string;
  type?: ToastType;
  duration?: number;
}

export const showToast = ({
  title,
  description,
  type = "info",
  duration = 2000,
}: ShowToastProps) => {
  // عنوان پیش‌فرض برای هر نوع توست
  const defaultTitles: Record<ToastType, string> = {
    success: "موفقیت آمیز!",
    error: "خطا!",
    info: "اطلاع!",
    warning: "هشدار!",
  };

  // کلاس‌های CSS برای هر نوع توست
  const defaultClasses: Record<ToastType, string> = {
    success: "bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold",
    error: "bg-red-100 text-red-800 border border-red-300 font-semibold",
    info: "bg-blue-100 text-blue-800 border border-blue-300 font-semibold",
    warning: "bg-yellow-100 text-yellow-800 border border-yellow-300 font-semibold",
  };

  toast({
    title: title || defaultTitles[type],
    description,
    duration,
    className: defaultClasses[type],
  });
};
