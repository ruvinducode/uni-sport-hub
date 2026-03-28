import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "../../components/scoreboard/EmptyState";
import FilterTabs from "../../components/scoreboard/FilterTabs";
import LoadingSkeleton from "../../components/scoreboard/LoadingSkeleton";
import PageHeader from "../../components/scoreboard/PageHeader";
import ScoreboardLayout from "../../components/scoreboard/ScoreboardLayout";
import ScoreMatchCard from "../../components/scoreboard/ScoreMatchCard";
import SearchBar from "../../components/scoreboard/SearchBar";
import { useScoreboard } from "../../context/ScoreboardContext";

const CATEGORY_OPTIONS = [
  { key: "all", label: "All" },
  { key: "school", label: "Schools" },
  { key: "university", label: "Universities" },
];

function ScoreboardPage() {
  const { matches, toggleFavorite } = useScoreboard();
  const [tab, setTab] = useState("all");
  const [category, setCategory] = useState("all");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    let list = [...matches];
    if (tab !== "all") list = list.filter((m) => m.status === tab);
    if (category !== "all") list = list.filter((m) => m.category === category);
    const qq = q.trim().toLowerCase();
    if (qq) {
      list = list.filter(
        (m) =>
          m.leagueName.toLowerCase().includes(qq) ||
          m.teamA.name.toLowerCase().includes(qq) ||
          m.teamB.name.toLowerCase().includes(qq) ||
          m.venue.toLowerCase().includes(qq) ||
          (m.rivalryTag && m.rivalryTag.toLowerCase().includes(qq)) ||
          (m.city && m.city.toLowerCase().includes(qq))
      );
    }
    return list;
  }, [matches, tab, category, q]);

  return (
    <ScoreboardLayout>
      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">Sri Lanka · schools & campus</span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Live school & campus matches
            <span className="mt-2 block bg-gradient-to-r from-emerald-300 to-lime-200 bg-clip-text text-transparent">
              Big matches, knockouts & university games
            </span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-200">
            Follow Dialog Schools Rugby, Lovers&apos; Quarrel cricket, President&apos;s Trophy, and Sri Lanka University
            Games fixtures — demo scorecards with stats, timeline, and lineups.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/admin/scorecards"
              className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 shadow-sm hover:bg-slate-100"
            >
              Admin: manage scores
            </Link>
            <Link
              to="/matches"
              className="rounded-xl border border-white/20 px-5 py-3 text-sm font-bold text-white hover:bg-white/10"
            >
              Book tickets
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <PageHeader
          kicker="Matches"
          title="Scoreboard"
          subtitle="School and university fixtures across Sri Lanka — stored locally for demos; ready for API wiring."
        />

        <div className="flex flex-wrap gap-2" role="tablist" aria-label="School or university">
          {CATEGORY_OPTIONS.map((opt) => {
            const active = category === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setCategory(opt.key)}
                className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
                  active
                    ? "border-emerald-600 bg-emerald-600 text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <FilterTabs value={tab} onChange={setTab} />
          <div className="w-full lg:max-w-md">
            <SearchBar value={q} onChange={setQ} />
          </div>
        </div>

        <div className="mt-8">
          {loading ? (
            <LoadingSkeleton />
          ) : filtered.length === 0 ? (
            <EmptyState
              title="No matches found"
              description="Try another filter or search keyword."
              action={
                <button
                  type="button"
                  onClick={() => {
                    setTab("all");
                    setCategory("all");
                    setQ("");
                  }}
                  className="rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-700"
                >
                  Reset filters
                </button>
              }
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((m) => (
                <ScoreMatchCard key={m.id} match={m} onToggleFavorite={toggleFavorite} />
              ))}
            </div>
          )}
        </div>
      </div>
    </ScoreboardLayout>
  );
}

export default ScoreboardPage;
