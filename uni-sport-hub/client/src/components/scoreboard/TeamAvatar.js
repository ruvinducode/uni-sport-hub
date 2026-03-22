function TeamAvatar({ shortName, className = "" }) {
  const letter = (shortName || "?").slice(0, 2).toUpperCase();
  return (
    <div
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-100 to-white text-sm font-extrabold text-slate-800 shadow-sm ${className}`}
      aria-hidden
    >
      {letter}
    </div>
  );
}

export default TeamAvatar;
