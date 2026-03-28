function CoachReviewCard({ review }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-extrabold text-slate-900">{review.author}</p>
        <span className="text-sm font-extrabold text-emerald-700">★ {review.rating}</span>
      </div>
      <p className="mt-2 text-sm font-semibold text-slate-600">{review.text}</p>
      <p className="mt-2 text-[11px] font-bold text-slate-400">{review.date}</p>
    </article>
  );
}

export default CoachReviewCard;
