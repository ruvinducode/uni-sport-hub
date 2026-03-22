import { Link } from "react-router-dom";
import BookingLayout from "../../components/tickets/BookingLayout";
import { useTicket } from "../../context/TicketContext";
import { formatMatchDate } from "../../data/matches";

function CartPage() {
  const { cart, removeLine, computeTotals } = useTicket();
  const { subtotal, serviceFee, total } = computeTotals(cart, 0);

  return (
    <BookingLayout step="cart">
      <h1 className="text-2xl font-extrabold text-slate-900">Your cart</h1>
      <p className="mt-1 text-sm font-semibold text-slate-600">Review tickets before checkout.</p>

      {cart.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
          <p className="text-lg font-extrabold text-slate-900">Your cart is empty</p>
          <p className="mt-2 text-sm font-semibold text-slate-600">Browse matches and select seats to get started.</p>
          <Link
            to="/matches"
            className="mt-6 inline-flex rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-700"
          >
            Browse matches
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-8">
            {cart.map((line) => (
              <div
                key={line.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900">{line.matchTitle}</h2>
                    <p className="mt-1 text-sm font-semibold text-slate-600">{line.venue}</p>
                    <time className="mt-2 block text-xs font-bold text-slate-500" dateTime={line.dateISO}>
                      {formatMatchDate(line.dateISO)}
                    </time>
                    <p className="mt-2 text-sm font-semibold text-slate-700">
                      {line.tierName} · {line.seats.length} ticket{line.seats.length === 1 ? "" : "s"}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {line.seats.map((s) => (
                        <li
                          key={s.seatId}
                          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-800"
                        >
                          {s.rowLabel}
                          {s.col}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-extrabold tabular-nums text-slate-900">
                      $
                      {line.seats.reduce((sum, s) => sum + (s.price || 0), 0)}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeLine(line.id)}
                      className="mt-3 text-sm font-semibold text-rose-600 hover:text-rose-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-500">Order summary</h2>
              <dl className="mt-4 space-y-2 text-sm font-semibold text-slate-700">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd className="tabular-nums">${subtotal.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Service fee</dt>
                  <dd className="tabular-nums">${serviceFee.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-3 text-base font-extrabold text-slate-900">
                  <dt>Total</dt>
                  <dd className="tabular-nums">${total.toFixed(2)}</dd>
                </div>
              </dl>
              <p className="mt-3 text-[11px] font-semibold leading-relaxed text-slate-500">
                Fees include payment processing and platform service (demo values).
              </p>
              <Link
                to="/checkout"
                className="mt-6 flex w-full items-center justify-center rounded-2xl bg-emerald-600 px-4 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700"
              >
                Proceed to checkout
              </Link>
              <Link
                to="/matches"
                className="mt-3 block text-center text-sm font-semibold text-emerald-700 hover:underline"
              >
                Continue shopping
              </Link>
            </div>
          </aside>
        </div>
      )}
    </BookingLayout>
  );
}

export default CartPage;
