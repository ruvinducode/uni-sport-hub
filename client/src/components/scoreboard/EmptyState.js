function EmptyState({ title, description, action }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center">
      <p className="text-lg font-extrabold text-slate-900">{title}</p>
      {description && <p className="mt-2 text-sm font-semibold text-slate-600">{description}</p>}
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}

export default EmptyState;
