function ToastBanner({ toast }) {
  if (!toast) return null;
  const isError = toast.variant === "error";
  return (
    <div
      role="status"
      className={`fixed bottom-6 left-1/2 z-[60] w-[min(92vw,24rem)] -translate-x-1/2 rounded-2xl border px-4 py-3 text-sm font-semibold shadow-lg ${
        isError ? "border-rose-200 bg-rose-50 text-rose-900" : "border-emerald-200 bg-emerald-50 text-emerald-900"
      }`}
    >
      {toast.message}
    </div>
  );
}

export default ToastBanner;
