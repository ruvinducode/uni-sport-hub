import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import BookingLayout from "../../components/tickets/BookingLayout";
import { useTicket } from "../../context/TicketContext";

function CheckoutPage() {
  const { cart, computeTotals, placeOrder, ticketUser } = useTicket();
  const navigate = useNavigate();
  const { subtotal, serviceFee, total } = computeTotals(cart, 0);

  const [email, setEmail] = useState(ticketUser?.email || "");
  const [phone, setPhone] = useState("");
  const [nameOnCard, setNameOnCard] = useState(ticketUser?.name || "");
  const [terms, setTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (cart.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (!terms) {
      setError("Please accept the terms to continue.");
      return;
    }
    setSubmitting(true);
    window.setTimeout(() => {
      const id = placeOrder({
        contactEmail: email,
        contactPhone: phone,
        cardName: nameOnCard,
      });
      setSubmitting(false);
      navigate(`/booking/${id}/confirmation`, { replace: true });
    }, 700);
  };

  return (
    <BookingLayout step="checkout">
      <h1 className="text-2xl font-extrabold text-slate-900">Checkout</h1>
      <p className="mt-1 text-sm font-semibold text-slate-600">Secure payment — demo mode (no real charge).</p>

      <form onSubmit={onSubmit} className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-7">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-500">Contact</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="co-email" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Email
                </label>
                <input
                  id="co-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/25"
                />
              </div>
              <div>
                <label htmlFor="co-phone" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Phone
                </label>
                <input
                  id="co-phone"
                  name="tel"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/25"
                />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-500">Payment (demo)</h2>
            <p className="mt-2 text-xs font-semibold text-slate-500">
              Card fields are visual only — submitting does not charge a real card.
            </p>
            <div className="mt-4">
              <label htmlFor="co-name" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Name on card
              </label>
              <input
                id="co-name"
                name="ccname"
                autoComplete="cc-name"
                required
                value={nameOnCard}
                onChange={(e) => setNameOnCard(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/25"
              />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="co-card" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Card number
                </label>
                <input
                  id="co-card"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="4242 4242 4242 4242"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/25"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="co-exp" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Exp
                  </label>
                  <input
                    id="co-exp"
                    autoComplete="cc-exp"
                    placeholder="MM/YY"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/25"
                  />
                </div>
                <div>
                  <label htmlFor="co-cvc" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    CVC
                  </label>
                  <input
                    id="co-cvc"
                    autoComplete="cc-csc"
                    placeholder="123"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/25"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <label className="flex cursor-pointer items-start gap-3 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span>I agree to the terms of sale, refund policy, and venue rules (demo).</span>
            </label>
          </div>

          {error && (
            <div role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800">
              {error}
            </div>
          )}
        </div>

        <aside className="lg:col-span-5">
          <div className="sticky top-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-500">Pay</h2>
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
            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full rounded-2xl bg-emerald-600 px-4 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Processing…" : `Pay $${total.toFixed(2)}`}
            </button>
            <Link to="/cart" className="mt-3 block text-center text-sm font-semibold text-emerald-700 hover:underline">
              Back to cart
            </Link>
          </div>
        </aside>
      </form>
    </BookingLayout>
  );
}

export default CheckoutPage;
