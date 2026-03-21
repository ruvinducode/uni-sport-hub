import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomeNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const items = [
    { label: "Home", id: "home" },
    { label: "Services", id: "services" },
    { label: "Sports", id: "sports" },
    { label: "Matches", id: "matches" },
    { label: "News", id: "news" },
    { label: "Contact Us", id: "contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b transition ${
        scrolled
          ? "bg-white/80 backdrop-blur shadow-sm border-slate-200/70"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => scrollToId("home")}
          className="flex items-center gap-3"
        >
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-600 to-lime-600 shadow-md" />
          <div className="text-left">
            <div
              className={`text-sm font-extrabold tracking-tight ${
                scrolled ? "text-slate-900" : "text-slate-100"
              }`}
            >
              Uni Sport Hub
            </div>
            <div
              className={`text-[11px] font-medium ${
                scrolled ? "text-slate-500" : "text-slate-300"
              }`}
            >
              Sports Management Portal
            </div>
          </div>
        </button>

        <nav className="hidden items-center gap-6 lg:flex">
          {items.map((it) => (
            <button
              key={it.id}
              type="button"
              onClick={() => scrollToId(it.id)}
              className={`text-sm font-semibold transition ${
                scrolled
                  ? "text-slate-700 hover:text-slate-900"
                  : "text-slate-200 hover:text-white"
              }`}
            >
              {it.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="relative hidden lg:block">
            <button
              type="button"
              onClick={() => setRegisterOpen((v) => !v)}
              className={`rounded-xl border px-4 py-2 text-sm font-semibold shadow-sm transition ${
                scrolled
                  ? "border-slate-200 bg-white/70 text-slate-900 hover:bg-white"
                  : "border-white/20 bg-white/10 text-slate-100 hover:bg-white/15"
              }`}
            >
              Register
            </button>
            {registerOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
                <Link
                  to="/register/player"
                  className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  onClick={() => setRegisterOpen(false)}
                >
                  Player Registration
                </Link>
                <Link
                  to="/register/coach"
                  className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  onClick={() => setRegisterOpen(false)}
                >
                  Coach Registration
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/login"
            className={`hidden rounded-xl border px-4 py-2 text-sm font-semibold shadow-sm transition lg:block ${
              scrolled
                ? "border-slate-200 bg-white/70 text-slate-900 hover:bg-white"
                : "border-white/20 bg-white/10 text-slate-100 hover:bg-white/15"
            }`}
          >
            Login
          </Link>

          <Link
            to="/login"
            className={`rounded-xl px-4 py-2 text-sm font-semibold shadow-sm transition lg:hidden ${
              scrolled
                ? "bg-slate-900 text-white hover:bg-slate-700"
                : "bg-white/10 text-white hover:bg-white/15"
            }`}
          >
            Login
          </Link>

          <button
            type="button"
            className={`rounded-xl px-4 py-2 text-sm font-semibold shadow-sm transition lg:hidden ${
              scrolled
                ? "bg-emerald-700 text-white hover:bg-emerald-600"
                : "bg-emerald-500/80 text-white hover:bg-emerald-500"
            }`}
            onClick={() => setMobileOpen((v) => !v)}
          >
            Register
          </button>

          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border shadow-sm transition lg:hidden ${
              scrolled
                ? "border-slate-200 bg-white/70 hover:bg-white"
                : "border-white/20 bg-white/10 hover:bg-white/15"
            }`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            <svg className="h-5 w-5 text-slate-800" viewBox="0 0 24 24" fill="none">
              <path
                d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 7h16M4 12h16M4 17h16"}
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className={`lg:hidden border-t backdrop-blur ${
            scrolled ? "border-slate-200/70 bg-white/90" : "border-white/15 bg-slate-950/60"
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-2">
              {items.map((it) => (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => scrollToId(it.id)}
                  className={`rounded-xl border px-3 py-2 text-left text-sm font-semibold shadow-sm transition ${
                    scrolled
                      ? "border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
                      : "border-white/15 bg-white/10 text-slate-100 hover:bg-white/15"
                  }`}
                >
                  {it.label}
                </button>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-1 gap-2">
              <Link
                to="/register/player"
                className={`rounded-xl border px-3 py-2 text-left text-sm font-semibold shadow-sm transition ${
                  scrolled
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                    : "border-emerald-300/40 bg-emerald-500/20 text-emerald-100 hover:bg-emerald-500/30"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                Player Registration
              </Link>
              <Link
                to="/register/coach"
                className={`rounded-xl border px-3 py-2 text-left text-sm font-semibold shadow-sm transition ${
                  scrolled
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                    : "border-emerald-300/40 bg-emerald-500/20 text-emerald-100 hover:bg-emerald-500/30"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                Coach Registration
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default HomeNavbar;

