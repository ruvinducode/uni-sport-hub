import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ScoreboardLayout from "../../components/scoreboard/ScoreboardLayout";
import MatchHeader from "../../components/scoreboard/matchCenter/MatchHeader";
import MatchTabs from "../../components/scoreboard/matchCenter/MatchTabs";
import OverviewTab from "../../components/scoreboard/matchCenter/OverviewTab";
import PlayerStatsTab from "../../components/scoreboard/matchCenter/PlayerStatsTab";
import TeamStatsTab from "../../components/scoreboard/matchCenter/TeamStatsTab";
import TimelineTabMC from "../../components/scoreboard/matchCenter/TimelineTabMC";
import LineupsTabMC from "../../components/scoreboard/matchCenter/LineupsTabMC";
import ScorecardTabMC from "../../components/scoreboard/matchCenter/ScorecardTabMC";
import MatchInfoTab from "../../components/scoreboard/matchCenter/MatchInfoTab";
import { useScoreboard } from "../../context/ScoreboardContext";
import { getMatchForCenter } from "../../data/matchCenterMock";

function MatchDetailPage() {
  const { matchId } = useParams();
  const { getMatch } = useScoreboard();
  const raw = getMatch(matchId);
  const match = useMemo(() => getMatchForCenter(raw), [raw]);
  const [tab, setTab] = useState("overview");

  const content = useMemo(() => {
    if (!match) return null;
    switch (tab) {
      case "overview":
        return <OverviewTab match={match} />;
      case "players":
        return <PlayerStatsTab match={match} />;
      case "teams":
        return <TeamStatsTab match={match} />;
      case "timeline":
        return <TimelineTabMC events={match.timeline} match={match} />;
      case "lineups":
        return <LineupsTabMC match={match} />;
      case "scorecard":
        return <ScorecardTabMC match={match} />;
      case "info":
        return <MatchInfoTab match={match} />;
      default:
        return null;
    }
  }, [match, tab]);

  if (!match) {
    return (
      <ScoreboardLayout>
        <div className="mx-auto max-w-3xl px-4 py-16">
          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-center">
            <p className="text-lg font-extrabold text-rose-900">Match not found</p>
            <p className="mt-2 text-sm font-semibold text-rose-800">
              Check the URL or return to the scoreboard.
            </p>
            <Link to="/scoreboard" className="mt-4 inline-block font-bold text-emerald-700 hover:underline">
              Back to scoreboard
            </Link>
          </div>
        </div>
      </ScoreboardLayout>
    );
  }

  return (
    <ScoreboardLayout>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <nav className="text-xs font-semibold text-slate-500" aria-label="Breadcrumb">
          <Link to="/scoreboard" className="text-emerald-700 hover:underline">
            Scoreboard
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800">
            {match.teamA.shortName} vs {match.teamB.shortName}
          </span>
        </nav>

        <div className="sticky top-16 z-30 mt-6 space-y-4 border-b border-slate-200/90 bg-slate-50/95 pb-4 pt-2 backdrop-blur supports-[backdrop-filter]:bg-slate-50/90">
          <MatchHeader match={match} />
          <MatchTabs value={tab} onChange={setTab} />
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Match center</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-900 hover:bg-slate-50"
              onClick={() => window.alert("Demo: e-ticket PDF would download here.")}
            >
              Download ticket
            </button>
            <Link
              to={`/admin/scorecards/${match.id}/edit`}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800"
            >
              Manage in admin
            </Link>
          </div>
        </div>

        <section
          aria-label="Match content"
          className="mt-6 min-h-[280px] rounded-3xl border border-slate-100 bg-white/60 p-4 sm:p-6"
        >
          {content}
        </section>

        <div className="mt-8 rounded-3xl border border-dashed border-slate-200 bg-white p-6 text-center">
          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">E-ticket preview</p>
          <div className="mx-auto mt-4 flex h-36 w-36 items-center justify-center rounded-2xl border-2 border-slate-200 bg-slate-50 text-sm font-extrabold text-slate-400">
            QR
          </div>
        </div>
      </div>
    </ScoreboardLayout>
  );
}

export default MatchDetailPage;
