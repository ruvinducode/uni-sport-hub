function LoadingSkeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 bg-[length:200%_100%] ${className}`}
      style={{ animation: "shimmer 2.5s ease-in-out infinite" }}
    />
  );
}

export default LoadingSkeleton;
