import { Link } from "react-router-dom";

function BookingSuccessState({ onReset }) {
  return (
    <div className="rounded-3xl border border-emerald-200 bg-emerald-50/80 p-8 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 13l4 4L19 7"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h2 className="mt-4 text-2xl font-extrabold text-slate-900">Booking request sent successfully</h2>
      <p className="mt-2 text-sm font-semibold text-slate-600">
        This is a demo — no data was saved. The coach would normally be notified and confirm your session soon.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          to="/coaches"
          className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-slate-700"
        >
          Return to coaches
        </Link>
        <button
          type="button"
          onClick={onReset}
          className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-extrabold text-slate-900 shadow-sm transition hover:bg-slate-50"
        >
          Book another
        </button>
      </div>
    </div>
  );
}

export default BookingSuccessState;
