import { useCallback, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CoachFinderLayout from "../../components/coaches/CoachFinderLayout";
import PageHeader from "../../components/coaches/shared/PageHeader";
import BookingForm from "../../components/coaches/booking/BookingForm";
import BookingSummaryCard from "../../components/coaches/booking/BookingSummaryCard";
import BookingSuccessState from "../../components/coaches/booking/BookingSuccessState";
import { getCoachById } from "../../data/coaches";
import { SESSION_TYPE_OPTIONS } from "../../data/coachConstants";

function BookingPage() {
  const { coachId } = useParams();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [draft, setDraft] = useState(null);

  const handleDraft = useCallback((f) => setDraft(f), []);

  const coach = useMemo(() => getCoachById(coachId), [coachId]);

  if (!coach) {
    return (
      <CoachFinderLayout>
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-lg font-extrabold text-slate-900">Coach not found</p>
          <Link to="/coaches" className="mt-4 inline-block rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-extrabold text-white">
            Find coaches
          </Link>
        </div>
      </CoachFinderLayout>
    );
  }

  return (
    <CoachFinderLayout>
      <PageHeader
        kicker="Booking"
        title="Request a training session"
        subtitle="Submit a demo booking request. No data is sent to a server."
        actions={
          <button
            type="button"
            onClick={() => navigate(`/coaches/${coach.id}`)}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-extrabold text-slate-900 shadow-sm"
          >
            Back to profile
          </button>
        }
      />

      {success ? (
        <BookingSuccessState
          onReset={() => {
            setSuccess(false);
            setDraft(null);
            setFormKey((k) => k + 1);
          }}
        />
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <img
                  src={coach.avatar}
                  alt=""
                  className="h-20 w-20 rounded-2xl object-cover ring-2 ring-emerald-50"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Coach</p>
                  <p className="text-xl font-extrabold text-slate-900">{coach.fullName}</p>
                  <p className="mt-1 text-sm font-bold text-emerald-700">{coach.sport}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    {coach.district} · {coach.area}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-right">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Session fee</p>
                  <p className="text-lg font-extrabold text-slate-900">
                    LKR {coach.pricePerSession.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-lg font-extrabold text-slate-900">Booking details</p>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                Tell us about you and your preferred session. Required fields are marked in the form.
              </p>
              <div className="mt-6">
                <BookingForm
                  key={formKey}
                  coach={coach}
                  onChange={handleDraft}
                  onSuccess={() => setSuccess(true)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <BookingSummaryCard
              coach={coach}
              sport={draft?.sport ?? coach.sport}
              area={draft?.area ?? coach.area}
              sessionTypeLabelText={
                draft?.sessionType
                  ? SESSION_TYPE_OPTIONS.find((o) => o.value === draft.sessionType)?.label
                  : ""
              }
              date={draft?.preferredDate}
              time={draft?.preferredTime}
              fee={coach.pricePerSession}
            />
            <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-5 text-sm font-semibold text-slate-600">
              After submit, you’ll see a confirmation screen. Replace this flow with POST /bookings and email/SMS
              notifications when the API is ready.
            </div>
          </div>
        </div>
      )}
    </CoachFinderLayout>
  );
}

export default BookingPage;
