import { Link, useParams } from "react-router-dom";
import PublicLayout from "../../components/tickets/PublicLayout";
import { useTicket } from "../../context/TicketContext";
import { formatMatchDate } from "../../data/matches";

function BookingConfirmationPage() {
  const { bookingId } = useParams();
  const { bookings } = useTicket();
  const booking = bookings.find((b) => b.id === bookingId);

  return (
    <PublicLayout>
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        {!booking ? (
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8 text-center">
            <p className="text-lg font-extrabold text-amber-900">Booking not found in this browser</p>
            <p className="mt-2 text-sm font-semibold text-amber-800">
              Confirmations are stored locally for this demo. Open the link from the same device/session.
            </p>
            <Link to="/matches" className="mt-6 inline-block font-bold text-emerald-700 hover:underline">
              Browse matches
            </Link>
          </div>
        ) : (
          <div>
            <div
              role="status"
              className="rounded-3xl border border-emerald-200 bg-emerald-50 px-6 py-8 text-center shadow-sm"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="mt-4 text-2xl font-extrabold text-slate-900">You&apos;re booked!</h1>
              <p className="mt-2 text-sm font-semibold text-slate-600">
                Reference{" "}
                <span className="select-all rounded-md bg-white px-2 py-0.5 font-mono text-slate-900">
                  {booking.id}
                </span>
              </p>
              <p className="mt-2 text-xs font-semibold text-slate-500">
                A confirmation email would be sent to {booking.email} (demo).
              </p>
            </div>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-500">Order</h2>
              <ul className="mt-4 space-y-4">
                {booking.lines.map((line) => (
                  <li key={line.id} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                    <p className="font-extrabold text-slate-900">{line.matchTitle}</p>
                    <p className="text-sm font-semibold text-slate-600">{line.venue}</p>
                    <time className="text-xs font-bold text-slate-500" dateTime={line.dateISO}>
                      {formatMatchDate(line.dateISO)}
                    </time>
                    <p className="mt-2 text-sm font-semibold text-slate-700">
                      {line.tierName} ·{" "}
                      {line.seats.map((s) => `${s.rowLabel}${s.col}`).join(", ")}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-sm font-extrabold text-slate-700">Total paid</span>
                <span className="text-xl font-extrabold tabular-nums text-slate-900">${booking.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/my-bookings"
                className="flex flex-1 items-center justify-center rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-700"
              >
                View my bookings
              </Link>
              <Link
                to="/matches"
                className="flex flex-1 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50"
              >
                Book another match
              </Link>
            </div>
          </div>
        )}
      </section>
    </PublicLayout>
  );
}

export default BookingConfirmationPage;
