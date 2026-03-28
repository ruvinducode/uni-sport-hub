import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CoachFinderLayout from "../../components/coaches/CoachFinderLayout";
import CoachProfileHeader from "../../components/coaches/profile/CoachProfileHeader";
import CoachAboutSection from "../../components/coaches/profile/CoachAboutSection";
import CoachStatsCard from "../../components/coaches/profile/CoachStatsCard";
import CoachAchievementList from "../../components/coaches/profile/CoachAchievementList";
import CoachScheduleCard from "../../components/coaches/profile/CoachScheduleCard";
import VenueInfoCard from "../../components/coaches/profile/VenueInfoCard";
import SessionPackageCard from "../../components/coaches/profile/SessionPackageCard";
import SectionCard from "../../components/coaches/shared/SectionCard";
import CoachReviewCard from "../../components/coaches/profile/CoachReviewCard";
import { getCoachById } from "../../data/coaches";
import { useSavedCoaches } from "../../context/SavedCoachesContext";

function CoachProfilePage() {
  const { coachId } = useParams();
  const navigate = useNavigate();
  const { toggleSave, isSaved } = useSavedCoaches();

  const coach = useMemo(() => getCoachById(coachId), [coachId]);
  const saved = coach ? isSaved(coach.id) : false;

  if (!coach) {
    return (
      <CoachFinderLayout>
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-lg font-extrabold text-slate-900">Coach not found</p>
          <button
            type="button"
            onClick={() => navigate("/coaches")}
            className="mt-4 rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-extrabold text-white"
          >
            Back to coaches
          </button>
        </div>
      </CoachFinderLayout>
    );
  }

  return (
    <CoachFinderLayout>
      <CoachProfileHeader
        coach={coach}
        saved={saved}
        onSave={() => toggleSave(coach.id)}
        onBook={() => navigate(`/coaches/${coach.id}/book`)}
      />

      <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 p-4 md:hidden">
        <div className="pointer-events-auto mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur">
          <button
            type="button"
            onClick={() => navigate(`/coaches/${coach.id}/book`)}
            className="w-full rounded-2xl bg-slate-900 py-3 text-sm font-extrabold text-white shadow-sm"
          >
            Book Session
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 pb-24 lg:grid-cols-3 lg:pb-8">
        <div className="space-y-6 lg:col-span-2">
          <CoachAboutSection coach={coach} />
          <SectionCard kicker="Expertise" title="Coaching focus">
            <p className="text-sm font-semibold text-slate-600">
              {coach.specialization} — structured progression for student athletes, with clear weekly outcomes and
              feedback loops.
            </p>
          </SectionCard>
          <CoachAchievementList achievements={coach.achievements} certifications={coach.certifications} />
          <CoachScheduleCard availabilityDays={coach.availabilityDays} />
          <VenueInfoCard venues={coach.trainingVenues} />
          <SessionPackageCard packages={coach.sessionPackages} />
        </div>
        <div className="space-y-6">
          <CoachStatsCard coach={coach} />
          <SectionCard kicker="Contact" title="Reach out (placeholder)">
            <p className="text-sm font-semibold text-slate-600">
              Email and phone are mock values for demo layout. Wire to secure messaging after backend integration.
            </p>
            <div className="mt-4 space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-700">
              <p>{coach.contactEmail}</p>
              <p>{coach.contactPhone}</p>
            </div>
          </SectionCard>
          <SectionCard kicker="Reviews" title="What athletes say">
            <div className="space-y-3">
              {coach.reviews.length ? (
                coach.reviews.map((r) => <CoachReviewCard key={r.id} review={r} />)
              ) : (
                <p className="text-sm font-semibold text-slate-500">No public reviews yet (demo).</p>
              )}
            </div>
          </SectionCard>
        </div>
      </div>
    </CoachFinderLayout>
  );
}

export default CoachProfilePage;
