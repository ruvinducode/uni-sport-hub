import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminMatchTable from "../../components/scoreboard/AdminMatchTable";
import ConfirmDeleteModal from "../../components/scoreboard/ConfirmDeleteModal";
import EventFormModal from "../../components/scoreboard/EventFormModal";
import MatchFormModal from "../../components/scoreboard/MatchFormModal";
import PageHeader from "../../components/scoreboard/PageHeader";
import ScoreboardLayout from "../../components/scoreboard/ScoreboardLayout";
import ScoreUpdatePanel from "../../components/scoreboard/ScoreUpdatePanel";
import { useScoreboard } from "../../context/ScoreboardContext";

function ScorecardsAdminPage() {
  const {
    matches,
    createMatch,
    updateMatch,
    deleteMatch,
    addTimelineEvent,
    getMatch,
    resetToSeed,
  } = useScoreboard();
  const { matchId } = useParams();
  const navigate = useNavigate();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [selectedId, setSelectedId] = useState(matches[0]?.id || null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [eventFor, setEventFor] = useState(null);
  const [busy, setBusy] = useState(false);

  const selected = useMemo(() => getMatch(selectedId), [getMatch, selectedId]);

  useEffect(() => {
    if (matchId) {
      const m = getMatch(matchId);
      if (m) {
        setEditing(m);
        setFormOpen(true);
        setSelectedId(matchId);
      }
    }
  }, [matchId, getMatch, matches]);

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
    if (matchId) navigate("/admin/scorecards", { replace: true });
  };

  const saveForm = (payload) => {
    if (editing) {
      updateMatch(editing.id, payload);
    } else {
      createMatch(payload);
    }
    closeForm();
  };

  const onDelete = () => {
    if (!deleteTarget) return;
    setBusy(true);
    window.setTimeout(() => {
      deleteMatch(deleteTarget.id);
      if (selectedId === deleteTarget.id) setSelectedId(null);
      setDeleteTarget(null);
      setBusy(false);
    }, 250);
  };

  return (
    <ScoreboardLayout>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <PageHeader
          kicker="Admin"
          title="Scorecard management"
          subtitle="Frontend-only CRUD simulation. Data persists in localStorage for this browser."
          actions={
            <>
              <button
                type="button"
                onClick={resetToSeed}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50"
              >
                Reset demo data
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditing(null);
                  setFormOpen(true);
                }}
                className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700"
              >
                Create match
              </button>
            </>
          }
        />

        <div className="mb-6 flex flex-wrap gap-3 text-sm font-semibold">
          <Link to="/scoreboard" className="text-emerald-700 hover:underline">
            ← Public scoreboard
          </Link>
          <span className="text-slate-300">|</span>
          <Link to="/" className="text-slate-600 hover:underline">
            Hub home
          </Link>
        </div>

        <AdminMatchTable
          matches={matches}
          selectedId={selectedId}
          onSelect={(id) => setSelectedId(id)}
          onEdit={(m) => {
            setEditing(m);
            setFormOpen(true);
          }}
          onDelete={(m) => setDeleteTarget(m)}
          onAddEvent={(id) => setEventFor(id)}
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500">Selected match tools</h3>
            <p className="mt-1 text-sm font-semibold text-slate-600">
              Pick a row with <span className="font-extrabold">Manage</span>, then update scores or add events.
            </p>
            {selected ? (
              <div className="mt-4 space-y-4">
                <ScoreUpdatePanel
                  match={selected}
                  onSave={(patch) => updateMatch(selected.id, patch)}
                />
                <button
                  type="button"
                  onClick={() => setEventFor(selected.id)}
                  className="w-full rounded-2xl border border-emerald-200 bg-emerald-50 py-3 text-sm font-bold text-emerald-900 hover:bg-emerald-100"
                >
                  Add timeline event
                </button>
              </div>
            ) : (
              <p className="mt-4 text-sm font-semibold text-slate-500">Select a match to enable quick updates.</p>
            )}
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500">Integration notes</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm font-semibold text-slate-600">
              <li>Replace <code className="rounded bg-slate-100 px-1">ScoreboardContext</code> fetches with REST or WebSocket clients.</li>
              <li>Keep match IDs server-generated; preserve tab layout components.</li>
              <li>Move admin behind real auth + role checks.</li>
            </ul>
          </div>
        </div>
      </div>

      <MatchFormModal open={formOpen} initial={editing} onClose={closeForm} onSave={saveForm} />

      <EventFormModal
        open={!!eventFor}
        onClose={() => setEventFor(null)}
        onSave={(ev) => {
          if (eventFor) addTimelineEvent(eventFor, ev);
          setEventFor(null);
        }}
      />

      <ConfirmDeleteModal
        open={!!deleteTarget}
        title="Delete match?"
        message="This removes the match from the local demo store."
        busy={busy}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={onDelete}
      />
    </ScoreboardLayout>
  );
}

export default ScorecardsAdminPage;
