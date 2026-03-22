import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function ScoreboardNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const link = (to, label) => {
    const active = pathname === to || (to !== "/" && pathname.startsWith(to));
    return (
      <Link
        to={to}
        className={`text-sm font-semibold transition ${
          active
            ? "text-emerald-700"
            : scrolled
              ? "text-slate-700 hover:text-slate-900"
              : "text-slate-200 hover:text-white"
        }`}
        onClick={() => setOpen(false)}
      >
        {label}
      </Link>
    );
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b transition ${
        scrolled ? "border-slate-200/80 bg-white/90 backdrop-blur" : "border-transparent bg-slate-950/40 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-600 to-lime-600 shadow-md" />
          <div className="text-left">
            <div className={`text-sm font-extrabold tracking-tight ${scrolled ? "text-slate-900" : "text-white"}`}>
              Uni Sport Hub
            </div>
            <div className={`text-[11px] font-medium ${scrolled ? "text-slate-500" : "text-slate-300"}`}>
              Scoreboard
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {link("/", "Home")}
          {link("/scoreboard", "Scoreboard")}
          {link("/matches", "Tickets")}
          {link("/admin/scorecards", "Admin")}
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            aria-label="Menu"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border shadow-sm ${
              scrolled ? "border-slate-200 bg-white" : "border-white/15 bg-white/10"
            }`}
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
            <Link to="/" className="block rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold" onClick={() => setOpen(false)}>
              Home
            </Link>
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
              Tickets
            </Link>
            <Link
              to="/admin/scorecards"
              className="block rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-900"
              onClick={() => setOpen(false)}
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default ScoreboardNavbar;
