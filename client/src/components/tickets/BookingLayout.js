import { Link } from "react-router-dom";
import TicketNavbar from "./TicketNavbar";
import StepIndicator from "./StepIndicator";

function BookingLayout({ children, step, matchId }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <TicketNavbar variant="light" />
      <div className="border-b border-slate-200 bg-white pt-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <StepIndicator active={step} />
          {matchId && (
            <Link
              to={`/matches/${matchId}`}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
            >
              ← Back to match
            </Link>
          )}
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}

export default BookingLayout;
