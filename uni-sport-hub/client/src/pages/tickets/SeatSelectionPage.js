import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import BookingLayout from "../../components/tickets/BookingLayout";
import SeatMap from "../../components/tickets/SeatMap";
import { useTicket } from "../../context/TicketContext";
import { formatMatchDate, getMatchById } from "../../data/matches";

function SeatSelectionPage() {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addSeatsToCart } = useTicket();
  const match = getMatchById(matchId);

  const tierFromState = location.state?.tierId;
  const [tierId, setTierId] = useState(tierFromState || match?.tiers?.[0]?.id || "");
  const [selected, setSelected] = useState([]);
  const [holdSeconds, setHoldSeconds] = useState(8 * 60);

  const tier = useMemo(() => match?.tiers?.find((t) => t.id === tierId) || match?.tiers?.[0], [match, tierId]);

  useEffect(() => {
    if (!match) return;
    const t = setInterval(() => setHoldSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [match]);

  const unavailableSet = useMemo(() => new Set(match?.unavailableSeats || []), [match]);

  const toggle = (seatId) => {
    setSelected((prev) => (prev.includes(seatId) ? prev.filter((x) => x !== seatId) : [...prev, seatId]));
  };

  const handleAdd = () => {
    if (!match || !tier || selected.length === 0) return;
    const seats = selected.map((seatId) => {
      const [row, col] = seatId.split("-");
      return {
        seatId,
        rowLabel: row,
        col: parseInt(col, 10),
        price: tier.price,
      };
    });
    addSeatsToCart({
      matchId: match.id,
      matchTitle: `${match.homeTeam} vs ${match.awayTeam}`,
      venue: `${match.venue}, ${match.city}`,
      dateISO: match.dateISO,
      tierId: tier.id,
      tierName: tier.name,
      seats,
    });
    navigate("/cart");
  };

  if (!match) {
    return (
      <BookingLayout step="seats" matchId={matchId}>
        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-center">
          <p className="font-extrabold text-rose-900">Match not found</p>
          <Link className="mt-3 inline-block font-semibold text-emerald-700" to="/matches">
            Back to matches
          </Link>
        </div>
      </BookingLayout>
    );
  }

  const mm = String(Math.floor(holdSeconds / 60)).padStart(1, "0");
  const ss = String(holdSeconds % 60).padStart(2, "0");

  return (
    <BookingLayout step="seats" matchId={matchId}>
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 className="text-2xl font-extrabold text-slate-900">Choose seats</h1>
          <p className="mt-1 text-sm font-semibold text-slate-600">
            {match.homeTeam} vs {match.awayTeam} · {formatMatchDate(match.dateISO)}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
            <span className="inline-flex h-2 w-2 rounded-full bg-amber-500" aria-hidden />
            <span>
              Hold timer (demo):{" "}
              <span className="tabular-nums font-extrabold">
                {mm}:{ss}
              </span>{" "}
              — refresh if seats become unavailable.
            </span>
          </div>

          <div className="mt-6">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Pricing tier</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {match.tiers.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTierId(t.id)}
                  className={`rounded-xl border px-4 py-2 text-sm font-bold ${
                    tierId === t.id
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {t.name} · ${t.price}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <SeatMap
              rows={match.seatRows}
              cols={match.seatCols}
              unavailableSet={unavailableSet}
              selectedIds={selected}
              onToggle={toggle}
              maxSelectable={8}
            />
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="sticky top-28 space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-500">Selection</h2>
              <p className="mt-2 text-sm font-semibold text-slate-600">
                {selected.length} seat{selected.length === 1 ? "" : "s"} · {tier?.name}
              </p>
              <p className="mt-2 text-2xl font-extrabold tabular-nums text-slate-900">
                ${(tier?.price || 0) * selected.length}
              </p>
              <p className="mt-1 text-xs font-semibold text-slate-500">Subtotal before fees</p>
              <button
                type="button"
                disabled={selected.length === 0}
                onClick={handleAdd}
                className="mt-6 w-full rounded-2xl bg-emerald-600 px-4 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add to cart
              </button>
              <Link
                to={`/matches/${match.id}`}
                className="mt-3 block text-center text-sm font-semibold text-emerald-700 hover:underline"
              >
                Change match details
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-xs font-semibold leading-relaxed text-slate-600">
              <p className="font-extrabold text-slate-800">Accessibility</p>
              <p className="mt-2">
                Each seat button includes a label for screen readers. Unavailable seats cannot be selected.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </BookingLayout>
  );
}

export default SeatSelectionPage;
