function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border border-slate-200 bg-white p-5">
      <div className="h-4 w-1/3 rounded bg-slate-200" />
      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="h-12 w-12 rounded-2xl bg-slate-200" />
        <div className="h-8 w-24 rounded bg-slate-200" />
        <div className="h-12 w-12 rounded-2xl bg-slate-200" />
      </div>
      <div className="mt-6 h-10 rounded-2xl bg-slate-200" />
    </div>
  );
}

function LoadingSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export default LoadingSkeleton;
