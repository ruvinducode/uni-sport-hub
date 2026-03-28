import { useMemo } from "react";
import { Link } from "react-router-dom";
import CoachFinderLayout from "../../components/coaches/CoachFinderLayout";
import PageHeader from "../../components/coaches/shared/PageHeader";
import EmptyState from "../../components/coaches/shared/EmptyState";
import CoachGrid from "../../components/coaches/finder/CoachGrid";
import { COACHES } from "../../data/coaches";
import { useSavedCoaches } from "../../context/SavedCoachesContext";

function SavedCoachesPage() {
  const { savedIds } = useSavedCoaches();

  const saved = useMemo(
    () => COACHES.filter((c) => savedIds.includes(c.id)),
    [savedIds]
  );

  return (
    <CoachFinderLayout>
      <PageHeader
        kicker="Saved"
        title="Your saved coaches"
        subtitle="Stored locally in this browser for demo purposes."
      />
      {saved.length === 0 ? (
        <EmptyState
          title="No saved coaches yet"
          description="Browse coaches and tap Save Coach on a profile."
          action={
            <Link
              to="/coaches"
              className="rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-extrabold text-white shadow-sm"
            >
              Find coaches
            </Link>
          }
        />
      ) : (
        <CoachGrid coaches={saved} />
      )}
    </CoachFinderLayout>
  );
}

export default SavedCoachesPage;
