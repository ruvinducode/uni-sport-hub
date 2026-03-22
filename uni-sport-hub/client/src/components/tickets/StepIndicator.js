import { Link } from "react-router-dom";

const steps = [
  { key: "browse", label: "Matches", path: "/matches" },
  { key: "seats", label: "Seats", path: null },
  { key: "cart", label: "Cart", path: "/cart" },
  { key: "checkout", label: "Checkout", path: "/checkout" },
];

function StepIndicator({ active }) {
  const idx = steps.findIndex((s) => s.key === active);

  return (
    <nav aria-label="Booking progress" className="w-full">
      <ol className="flex flex-wrap items-center gap-2 text-xs font-bold sm:gap-3 sm:text-sm">
        {steps.map((s, i) => {
          const done = i < idx;
          const current = i === idx;
          const content =
            s.path && (done || (!current && i < idx)) ? (
              <Link to={s.path} className="underline-offset-2 hover:underline">
                {s.label}
              </Link>
            ) : (
              <span>{s.label}</span>
            );
          return (
            <li key={s.key} className="flex items-center gap-2">
              {i > 0 && (
                <span className="text-slate-300" aria-hidden>
                  /
                </span>
              )}
              <span
                className={`rounded-full px-3 py-1 ${
                  current
                    ? "bg-emerald-600 text-white"
                    : done
                      ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
                      : "bg-slate-100 text-slate-500"
                }`}
              >
                {content}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default StepIndicator;
