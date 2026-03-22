import { Link } from "react-router-dom";
import PublicLayout from "../../components/tickets/PublicLayout";
import { useTicket } from "../../context/TicketContext";
import { formatMatchDate } from "../../data/matches";

function MyBookingsPage() {
  const { bookings, ticketUser, logoutFan } = useTicket();

  return (
    <PublicLayout>
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">My bookings</h1>
            <p className="mt-1 text-sm font-semibold text-slate-600">
              Signed in as {ticketUser?.email}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => logoutFan()}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50"
            >
              Sign out
            </button>
            <Link
              to="/matches"
              className="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700"
            >
              Book tickets
            </Link>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
            <p className="text-lg font-extrabold text-slate-900">No bookings yet</p>
            <p className="mt-2 text-sm font-semibold text-slate-600">When you complete checkout, your orders appear here.</p>
            <Link
              to="/matches"
              className="mt-6 inline-flex rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-700"
            >
              Find a match
            </Link>
          </div>
        ) : (
          <ul className="mt-8 space-y-4">
            {bookings.map((b) => (
              <li key={b.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{b.status}</p>
                    <p className="mt-1 font-mono text-sm font-bold text-slate-900">{b.id}</p>
                    <p className="mt-2 text-xs font-semibold text-slate-500">
                      {new Date(b.createdAt).toLocaleString()}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {b.lines.map((line) => (
                        <li key={line.id} className="text-sm font-semibold text-slate-700">
                          {line.matchTitle} · {formatMatchDate(line.dateISO)}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-extrabold text-slate-900">${b.total.toFixed(2)}</p>
                    <Link
                      to={`/booking/${b.id}/confirmation`}
                      className="mt-2 inline-block text-sm font-semibold text-emerald-700 hover:underline"
                    >
                      View confirmation
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </PublicLayout>
  );
}

export default MyBookingsPage;
