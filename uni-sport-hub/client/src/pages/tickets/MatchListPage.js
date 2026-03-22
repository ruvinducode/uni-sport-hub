import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../../components/tickets/PublicLayout";
import SectionHeading from "../../components/tickets/SectionHeading";
import MatchCard from "../../components/tickets/MatchCard";
import { MOCK_MATCHES, SPORTS } from "../../data/matches";

function MatchListPage() {
  const [q, setQ] = useState("");
  const [sport, setSport] = useState("all");
  const [sort, setSort] = useState("date");

  const filtered = useMemo(() => {
    let list = [...MOCK_MATCHES];
    if (sport !== "all") list = list.filter((m) => m.sport === sport);
    const qq = q.trim().toLowerCase();
    if (qq) {
      list = list.filter(
        (m) =>
          m.homeTeam.toLowerCase().includes(qq) ||
          m.awayTeam.toLowerCase().includes(qq) ||
          m.venue.toLowerCase().includes(qq) ||
          m.league.toLowerCase().includes(qq) ||
          m.city.toLowerCase().includes(qq)
      );
    }
    if (sort === "date") list.sort((a, b) => new Date(a.dateISO) - new Date(b.dateISO));
    if (sort === "price") list.sort((a, b) => a.priceFrom - b.priceFrom);
    return list;
  }, [q, sport, sort]);

  return (
    <PublicLayout heroDark>
      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">Tickets</span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Upcoming matches
            <span className="mt-2 block bg-gradient-to-r from-emerald-300 to-lime-200 bg-clip-text text-transparent">
              Book seats in a few steps
            </span>
          </h1>
          <p className="mt-3 max-w-xl text-sm text-slate-200">
            Search by team or venue, filter by sport, and lock seats with transparent pricing.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/cart"
              className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 shadow-sm transition hover:bg-slate-100"
            >
              View cart
            </Link>
            <Link
              to="/"
              className="rounded-xl border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Back to hub home
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-end sm:justify-between">
          <div className="grid flex-1 gap-3 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label htmlFor="match-search" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Search
              </label>
              <input
                id="match-search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Team, venue, league…"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none ring-emerald-500/30 focus:border-emerald-500 focus:ring-2"
                type="search"
                autoComplete="off"
              />
            </div>
            <div>
              <label htmlFor="sort" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Sort
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
              >
                <option value="date">Soonest first</option>
                <option value="price">Lowest price</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Sport filter">
          <button
            type="button"
            role="tab"
            aria-selected={sport === "all"}
            onClick={() => setSport("all")}
            className={`rounded-full border px-4 py-2 text-xs font-bold ${
              sport === "all"
                ? "border-emerald-600 bg-emerald-600 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            All sports
          </button>
          {SPORTS.map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={sport === s.id}
              onClick={() => setSport(s.id)}
              className={`rounded-full border px-4 py-2 text-xs font-bold capitalize ${
                sport === s.id
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          <SectionHeading
            kicker="Results"
            title={`${filtered.length} match${filtered.length === 1 ? "" : "es"}`}
            subtitle="All-in pricing shown at checkout includes service fees."
          />
          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center">
              <p className="text-lg font-extrabold text-slate-900">No matches match your filters</p>
              <p className="mt-2 text-sm font-semibold text-slate-600">Try clearing search or choosing a different sport.</p>
              <button
                type="button"
                onClick={() => {
                  setQ("");
                  setSport("all");
                }}
                className="mt-6 rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-700"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((m) => (
                <MatchCard key={m.id} match={m} />
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}

export default MatchListPage;
