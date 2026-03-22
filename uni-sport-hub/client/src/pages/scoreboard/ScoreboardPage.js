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

function ScoreboardPage() {
  const { matches, toggleFavorite } = useScoreboard();
  const [tab, setTab] = useState("all");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    let list = [...matches];
    if (tab !== "all") list = list.filter((m) => m.status === tab);
    const qq = q.trim().toLowerCase();
    if (qq) {
      list = list.filter(
        (m) =>
          m.leagueName.toLowerCase().includes(qq) ||
          m.teamA.name.toLowerCase().includes(qq) ||
          m.teamB.name.toLowerCase().includes(qq) ||
          m.venue.toLowerCase().includes(qq)
      );
    }
    return list;
  }, [matches, tab, q]);

  return (
    <ScoreboardLayout>
      <section className="border-b border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">Live scores</span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            University scoreboard
            <span className="mt-2 block bg-gradient-to-r from-emerald-300 to-lime-200 bg-clip-text text-transparent">
              Fast, readable match center
            </span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-200">
            Filter by status, search teams, and open a full scorecard with stats, timeline, and info — demo data with
            admin updates.
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
          subtitle="Mock data stored in your browser — perfect for demos and future API wiring."
        />

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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
