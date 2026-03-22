import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTicket } from "../../context/TicketContext";

function TicketNavbar({ variant = "light" }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { cartCount, ticketUser } = useTicket();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDarkHero = variant === "dark";
  const navClass = scrolled || !isDarkHero
    ? "bg-white/90 border-slate-200/80 text-slate-900"
    : "bg-transparent border-transparent text-slate-100";

  const linkClass = (to) =>
    `text-sm font-semibold transition ${
      scrolled || !isDarkHero
        ? pathname === to
          ? "text-emerald-700"
          : "text-slate-700 hover:text-slate-900"
        : pathname === to
          ? "text-white"
          : "text-slate-200 hover:text-white"
    }`;

  return (
    <header className={`fixed left-0 right-0 top-0 z-50 border-b backdrop-blur transition ${navClass}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-600 to-lime-600 shadow-md" />
          <div className="text-left">
            <div className="text-sm font-extrabold tracking-tight">Uni Sport Hub</div>
            <div
              className={`text-[11px] font-medium ${
                scrolled || !isDarkHero ? "text-slate-500" : "text-slate-300"
              }`}
            >
              Tickets
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <Link to="/scoreboard" className={linkClass("/scoreboard")}>
            Scoreboard
          </Link>
          <Link to="/matches" className={linkClass("/matches")}>
            Matches
          </Link>
          <Link to="/cart" className={linkClass("/cart")}>
            Cart
            {cartCount > 0 && (
              <span className="ml-1.5 inline-flex min-w-[1.25rem] justify-center rounded-full bg-emerald-600 px-1.5 text-[10px] font-extrabold text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/my-bookings" className={linkClass("/my-bookings")}>
            My bookings
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {ticketUser ? (
            <span className="max-w-[10rem] truncate text-xs font-semibold text-slate-600">
              {ticketUser.name || ticketUser.email}
            </span>
          ) : null}
          <Link
            to="/tickets/login"
            className={`rounded-xl border px-4 py-2 text-sm font-semibold shadow-sm transition ${
              scrolled || !isDarkHero
                ? "border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
                : "border-white/20 bg-white/10 text-white hover:bg-white/15"
            }`}
          >
            {ticketUser ? "Account" : "Log in"}
          </Link>
          <Link
            to="/matches"
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            Book tickets
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            to="/cart"
            className="relative rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-900"
          >
            Cart
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-extrabold text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg className="h-5 w-5 text-slate-800" viewBox="0 0 24 24" fill="none">
              <path
                d={open ? "M6 18L18 6M6 6l12 12" : "M4 7h16M4 12h16M4 17h16"}
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="mx-auto max-w-7xl space-y-2 px-4 py-3">
            <Link
              to="/scoreboard"
              className="block rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold"
              onClick={() => setOpen(false)}
            >
              Scoreboard
            </Link>
            <Link
              to="/matches"
              className="block rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold"
              onClick={() => setOpen(false)}
            >
              Matches
            </Link>
            <Link
              to="/my-bookings"
              className="block rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold"
              onClick={() => setOpen(false)}
            >
              My bookings
            </Link>
            <Link
              to="/tickets/login"
              className="block rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-900"
              onClick={() => setOpen(false)}
            >
              {ticketUser ? "Account" : "Log in / Register"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default TicketNavbar;
