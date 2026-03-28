import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PublicLayout from "../../components/tickets/PublicLayout";
import { formatMatchDate, getMatchById } from "../../data/matches";

function MatchDetailPage() {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const match = getMatchById(matchId);
  const [tierId, setTierId] = useState(match?.tiers?.[0]?.id || "");

  const tier = useMemo(() => match?.tiers?.find((t) => t.id === tierId) || match?.tiers?.[0], [match, tierId]);

  if (!match) {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-center">
            <p className="text-lg font-extrabold text-rose-900">Match not found</p>
            <Link to="/matches" className="mt-4 inline-block font-semibold text-emerald-700 hover:underline">
              Browse all matches
            </Link>
          </div>
        </div>
      </PublicLayout>
    );
  }

  const title = `${match.homeTeam} vs ${match.awayTeam}`;

  return (
    <PublicLayout>
      <section className="border-b border-slate-200 bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="text-xs font-semibold text-slate-500" aria-label="Breadcrumb">
            <Link to="/matches" className="text-emerald-700 hover:underline">
              Matches
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-800">{title}</span>
          </nav>

          <div className="mt-6 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                {match.league}
              </div>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
              <p className="mt-2 text-sm font-semibold text-slate-600">
                {match.venue} · {match.city}
              </p>
              <time className="mt-4 block text-sm font-extrabold text-slate-900" dateTime={match.dateISO}>
                {formatMatchDate(match.dateISO)}
              </time>
              <p className="mt-6 text-sm leading-relaxed text-slate-600">{match.description}</p>

              <div className="mt-8">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-500">Ticket categories</h2>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {match.tiers.map((t) => {
                    const active = tierId === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTierId(t.id)}
                        className={`rounded-2xl border p-4 text-left transition ${
                          active
                            ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/30"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        <div className="text-sm font-extrabold text-slate-900">{t.name}</div>
                        <div className="mt-1 text-lg font-extrabold tabular-nums text-emerald-700">${t.price}</div>
                        <div className="mt-1 text-xs font-semibold text-slate-500">Per seat · fees at checkout</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-500">Policies</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm font-semibold text-slate-600">
                  {match.policies.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">From</p>
                <p className="mt-1 text-3xl font-extrabold tabular-nums text-slate-900">${match.priceFrom}</p>
                <p className="mt-2 text-xs font-semibold text-slate-500">Selected tier: {tier?.name} · ${tier?.price} per seat</p>
                <button
                  type="button"
                  onClick={() => navigate(`/matches/${match.id}/seats`, { state: { tierId: tier?.id } })}
                  className="mt-6 w-full rounded-2xl bg-emerald-600 px-4 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700"
                >
                  Select seats
                </button>
                <p className="mt-3 text-center text-[11px] font-semibold text-slate-500">
                  Secure checkout · mobile tickets
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="text-lg font-extrabold text-slate-900">You might also like</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to="/matches"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50"
          >
            Browse full schedule
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}

export default MatchDetailPage;
