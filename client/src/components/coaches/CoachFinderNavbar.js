import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function CoachFinderNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = (to) =>
    `text-sm font-semibold transition ${
      pathname === to ? "text-emerald-700" : "text-slate-700 hover:text-slate-900"
    }`;

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b backdrop-blur transition ${
        scrolled ? "border-slate-200/80 bg-white/90" : "border-slate-200/60 bg-white/85"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-600 to-lime-600 shadow-md" />
          <div className="text-left">
            <div className="text-sm font-extrabold tracking-tight text-slate-900">Uni Sport Hub</div>
            <div className="text-[11px] font-medium text-slate-500">Coach booking</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <Link to="/coaches" className={linkClass("/coaches")}>
            Find coaches
          </Link>
          <Link to="/saved-coaches" className={linkClass("/saved-coaches")}>
            Saved coaches
          </Link>
          <Link to="/scoreboard" className={linkClass("/scoreboard")}>
            Scoreboard
          </Link>
          <Link to="/matches" className={linkClass("/matches")}>
            Tickets
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 lg:inline-flex"
          >
            Login
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
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
        <div className="border-t border-slate-200/80 bg-white/95 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2 px-4 py-3 sm:px-6">
            {[
              ["/coaches", "Find coaches"],
              ["/saved-coaches", "Saved coaches"],
              ["/scoreboard", "Scoreboard"],
              ["/matches", "Tickets"],
              ["/login", "Login"],
            ].map(([to, label]) => (
              <Link
                key={to}
                to={to}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default CoachFinderNavbar;
