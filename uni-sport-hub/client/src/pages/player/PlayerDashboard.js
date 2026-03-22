import DashboardLayout from "../../components/DashboardLayout";

function PlayerDashboard() {
  return (
    <DashboardLayout role="player">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white shadow-lg">
          <p className="text-sm uppercase tracking-wider text-amber-100">Player Dashboard</p>
          <h2 className="mt-2 text-3xl font-bold">Performance Overview</h2>
          <p className="mt-2 max-w-3xl text-amber-100">
            Track your sports journey, monitor progress, and get ready for selection opportunities.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Current level</p>
            <p className="mt-2 text-xl font-bold text-slate-900">University Squad</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Recent form</p>
            <p className="mt-2 text-xl font-bold text-slate-900">Consistent</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Selection status</p>
            <p className="mt-2 text-xl font-bold text-slate-900">Under Review</p>
          </article>
        </section>

        <section className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
          <p className="text-lg font-semibold text-slate-700">More modules coming soon</p>
          <p className="mt-2 text-sm text-slate-500">
            Match analytics, performance charts, and progression milestones will be displayed here.
          </p>
        </section>
      </main>
    </DashboardLayout>
  );
}

export default PlayerDashboard;