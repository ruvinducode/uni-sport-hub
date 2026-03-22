import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import HomeNavbar from "../../components/HomeNavbar";
import HomeArenaBackground from "../../components/HomeArenaBackground";

function SectionHeading({ kicker, title, subtitle }) {
  return (
    <div className="mb-8">
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 backdrop-blur">
        <span className="h-2 w-2 rounded-full bg-emerald-600" />
        <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
          {kicker}
        </span>
      </div>
      <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-slate-600">{subtitle}</p>
      )}
    </div>
  );
}

function SportIcon({ type }) {
  if (type === "football") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8.2 9.3 12 12l3.8-2.7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9 6.8 12 12l-3 5.2" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" opacity="0.8" />
      </svg>
    );
  }
  if (type === "rugby") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <path
          d="M14.5 3.5c2.4.7 4.1 2.9 4 5.4-.1 2.1-1.3 3.8-2.9 5.2-2.3 2-4.6 4.4-5.7 6-1.1-.7-2.2-1.8-2.9-2.9 1.7-1.1 4-3.4 6-5.7 1.4-1.6 3.1-2.8 5.2-2.9 2.5-.1 4.7 1.6 5.4 4-1 .6-2.6.3-3.7-.3-1.3-.7-2.4-1.9-3.1-3.2-.6-1.1-.9-2.7-.3-3.7Z"
          stroke="currentColor"
          strokeWidth="1.3"
          opacity="0.95"
        />
        <path d="M10 14l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <path
        d="M7.5 20.5c3-1.5 6-4.5 7.8-8.1 1-2 .9-3.7-.3-4.9-1.2-1.2-3-1.2-4.9-.3C6.5 9 3.5 12 2 15c1.8 3.1 3.6 4 5.5 5.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        opacity="0.9"
      />
      <path
        d="M14.5 3.5l6 2-2 6-6-2 2-6Z"
        stroke="currentColor"
        strokeWidth="1.3"
        opacity="0.7"
      />
    </svg>
  );
}

function HomePage() {
  const [matchTick, setMatchTick] = useState(0);
  const [activeSport, setActiveSport] = useState("football");

  useEffect(() => {
    const t = setInterval(() => setMatchTick((v) => v + 1), 2500);
    return () => clearInterval(t);
  }, []);

  const matches = useMemo(() => {
    const delta = matchTick % 5;
    return [
      { league: "University League", teamA: "Falcons", teamB: "Strikers", scoreA: 2 + (delta > 1 ? 1 : 0), scoreB: 1 + (delta > 3 ? 1 : 0), time: "LIVE" },
      { league: "Campus Derby", teamA: "Titans", teamB: "Comets", scoreA: 1 + (delta > 2 ? 1 : 0), scoreB: 1 + (delta > 3 ? 1 : 0), time: "LIVE" },
      { league: "Selection Week", teamA: "Raptors", teamB: "Eagles", scoreA: 0 + (delta > 1 ? 1 : 0), scoreB: 0 + (delta > 2 ? 1 : 0), time: "SOON" },
    ];
  }, [matchTick]);

  const news = [
    { title: "Uni Sport Hub launches live match workflow", tag: "Update", date: "Today" },
    { title: "Selector training: smarter evaluations, faster decisions", tag: "Programme", date: "This week" },
    { title: "How players progress: from university to national", tag: "Guide", date: "New" },
  ];

  const services = [
    { title: "Role-based dashboards", desc: "Players, coaches, selectors, and admins see what matters—securely.", accent: "from-emerald-600 to-lime-600" },
    { title: "Approvals & registration flow", desc: "Coach + selector + admin decisions with clear status.", accent: "from-emerald-600 to-teal-600" },
    { title: "Performance tracking", desc: "Build a measurable sports profile and improve with feedback.", accent: "from-amber-500 to-orange-600" },
    { title: "Live match scores", desc: "Real-time updates for matches and selection matches.", accent: "from-slate-900 to-slate-700" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <HomeNavbar />

      {/* Hero */}
      <section
        id="home"
        className="relative overflow-hidden bg-slate-950 pt-24 pb-20 text-white lg:min-h-[88vh] lg:pt-28"
      >
        <HomeArenaBackground activeSport={activeSport} />
        <div className="relative mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:min-h-[70vh] lg:grid-cols-12">
            <div className="relative lg:col-span-7">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                Uni Sport Hub
                <span className="block bg-gradient-to-r from-emerald-400 via-lime-300 to-green-200 bg-clip-text text-transparent">
                  for modern sports management
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-base text-slate-200">
                Manage university sports activity, track performance, run matches, and progress players from university to national and international levels.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                {[
                  { key: "football", label: "Football" },
                  { key: "rugby", label: "Rugby" },
                  { key: "cricket", label: "Cricket" },
                ].map((opt) => {
                  const isActive = activeSport === opt.key;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setActiveSport(opt.key)}
                      className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition ${
                        isActive
                          ? "border-white/20 bg-white/10 text-white shadow-sm"
                          : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to="/matches"
                  className="rounded-xl bg-emerald-600 px-6 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-500"
                >
                  Book match tickets
                </Link>
                <Link
                  to="/login"
                  className="rounded-xl bg-white/10 px-6 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-white/15 border border-white/10"
                >
                  Login to Dashboards
                </Link>
                <button
                  type="button"
                  onClick={() => document.getElementById("matches")?.scrollIntoView({ behavior: "smooth" })}
                  className="rounded-xl border border-white/15 bg-white/10 px-6 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-white/15"
                >
                  View Live Matches
                </button>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  { k: "5 Roles", v: "Secure RBAC" },
                  { k: "Approvals", v: "Coach → Selector → Admin" },
                  { k: "Selection", v: "University → National → International" },
                ].map((s, idx) => (
                  <div
                    key={s.k}
                    className={`rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur ${
                      idx === 0
                        ? "animate-fade-in-up-delay-1 animate-fade-in-up"
                        : idx === 1
                          ? "animate-fade-in-up-delay-2 animate-fade-in-up"
                          : "animate-fade-in-up-delay-3 animate-fade-in-up"
                    }`}
                    style={{ opacity: 0.96 }}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                      {s.k}
                    </div>
                    <div className="mt-1.5 text-xs font-extrabold">
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero right panel */}
            <div className="relative lg:col-span-5">
              <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-emerald-600/20 via-lime-500/10 to-green-500/20 blur-xl" />
              <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-sm backdrop-blur">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Live Spotlight
                    </div>
                    <div className="mt-1 text-xl font-extrabold">
                      Today’s Match Feed
                    </div>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-emerald-50/10 px-2.5 py-1 text-[10px] font-bold text-emerald-200 border border-emerald-200/20">
                    Auto-refresh
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  {matches.slice(0, 2).map((m) => (
                    <div
                      key={m.teamA}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-sm"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="truncate text-xs font-bold text-white">
                            {m.teamA} vs {m.teamB}
                          </div>
                          <div className="text-[11px] font-semibold text-slate-300">
                            {m.league}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-bold text-white border border-white/10">
                            {m.time}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="text-base font-extrabold text-emerald-300">
                          {m.scoreA}
                        </div>
                        <div className="text-xs font-bold text-slate-400">
                          —
                        </div>
                        <div className="text-base font-extrabold text-emerald-300">
                          {m.scoreB}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <p className="text-xs font-semibold text-slate-200">
                    Score updates simulate real-time match events.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Services"
          title="Everything you need to run sports operations"
          subtitle="Secure approvals, dashboards, tracking, and live match management — built as one complete system."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, idx) => (
            <div
              key={s.title}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${s.accent} opacity-0 transition group-hover:opacity-20`} />
              <div className="relative">
                <div className="text-sm font-extrabold text-slate-900">
                  {s.title}
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  {s.desc}
                </p>
                <button
                  type="button"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-slate-900 opacity-90"
                >
                  Learn more
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sports */}
      <section id="sports" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="Sports"
            title="Choose your sport, run the workflow"
            subtitle="Your university system can support multiple sports tracks with tailored match and selection behavior."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              { key: "football", title: "Football", desc: "Pace-based match engine and approvals.", from: "from-emerald-600", to: "to-lime-600", icon: "football" },
              { key: "rugby", title: "Rugby", desc: "Tough selection and high-impact match flow.", from: "from-emerald-600", to: "to-teal-600", icon: "rugby" },
              { key: "cricket", title: "Cricket", desc: "Precision scoring and selection milestones.", from: "from-amber-500", to: "to-orange-600", icon: "cricket" },
            ].map((sp, idx) => (
              <div
                key={sp.key}
                className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${sp.from} ${sp.to} opacity-10`} />
                <div className="relative">
                  <div className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white/70 p-4 text-slate-900">
                    <SportIcon type={sp.icon} />
                  </div>
                  <div className="mt-5 text-2xl font-extrabold text-slate-900">{sp.title}</div>
                  <p className="mt-2 text-sm font-semibold text-slate-600">{sp.desc}</p>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {[
                      { label: "Matches", value: sp.key === "cricket" ? "Overs" : "Live" },
                      { label: "Selection", value: "Pathways" },
                    ].map((c) => (
                      <div key={c.label} className="rounded-2xl border border-slate-200 bg-white/70 p-3">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          {c.label}
                        </div>
                        <div className="mt-1 text-sm font-extrabold text-slate-900">
                          {c.value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="mt-6 w-full rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-slate-700"
                    onClick={() => document.getElementById("matches")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Explore matches
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Matches */}
      <section id="matches" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Matches"
          title="Live scoreboard and match management"
          subtitle="A modern match view designed for real-time updates, approvals, and selection events."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {matches.map((m, idx) => {
            const scoreboardIds = ["sb_m_live_football", "sb_m_upcoming_cricket", "sb_m_done_basketball"];
            const centerHref = `/scoreboard/${scoreboardIds[idx] || scoreboardIds[0]}`;
            return (
            <div key={m.teamA} className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    {m.league}
                  </div>
                  <Link
                    to={centerHref}
                    className="mt-2 block text-lg font-extrabold text-slate-900 transition hover:text-emerald-700"
                  >
                    {m.teamA} vs {m.teamB}
                  </Link>
                </div>
                <span
                  className={`rounded-full border px-3 py-1 text-[11px] font-bold ${
                    m.time === "LIVE"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 bg-slate-50 text-slate-700"
                  }`}
                >
                  {m.time}
                </span>
              </div>

              <div className="mt-5 flex items-end justify-between">
                <div className="text-4xl font-extrabold text-emerald-700">
                  {m.scoreA}
                </div>
                <div className="text-xs font-bold text-slate-400">—</div>
                <div className="text-4xl font-extrabold text-emerald-700">
                  {m.scoreB}
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-slate-900/5 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Status</span>
                  <span className="text-xs font-extrabold text-slate-900">
                    {idx === 2 ? "Upcoming" : "In progress"}
                  </span>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-lime-500"
                    style={{ width: `${35 + ((matchTick + idx) % 45)}%` }}
                  />
                </div>
              </div>

              <Link
                to={centerHref}
                className="mt-5 flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-900 shadow-sm transition hover:bg-slate-50"
              >
                Manage match
              </Link>
            </div>
            );
          })}
        </div>
      </section>

      {/* News */}
      <section id="news" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="News"
            title="Updates, guides, and selection insights"
            subtitle="Stay informed about approvals, match workflows, and progression milestones."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {news.map((n, idx) => (
              <article
                key={n.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-gradient-to-br from-emerald-600/20 via-lime-500/10 to-green-600/20" />
                <div className="relative">
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-[11px] font-bold text-slate-700">
                      {n.tag}
                    </span>
                    <span className="text-xs font-bold text-slate-500">{n.date}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-extrabold text-slate-900">
                    {n.title}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-slate-600">
                    Built for university workflows and national-level progression.
                  </p>
                  <button
                    type="button"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-slate-900"
                  >
                    Read
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Contact Us"
          title="Talk to Uni Sport Hub"
          subtitle="Have questions about roles, approvals, or sports operations? Send your message."
        />

        <ContactForm />
      </section>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm font-semibold text-slate-700">
              Uni Sport Hub © {new Date().getFullYear()}
            </div>
            <div className="text-sm font-semibold text-slate-500">
              Built for university-level sports management.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setStatus(null);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Frontend-only demo. Hook this into backend later.
    setStatus("Message sent! We’ll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-3 rounded-3xl border border-slate-200 bg-white/70 p-7 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
                placeholder="you@email.com"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400"
              placeholder="Tell us what you need..."
            />
          </div>

          {status && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
              {status}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-slate-700"
          >
            Send Message
          </button>
        </form>
      </div>

      <aside className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white/60 p-7 shadow-sm">
        <div className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/70 px-4 py-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-600 to-lime-600" />
          <div>
            <div className="text-sm font-extrabold text-slate-900">
              Support Team
            </div>
            <div className="text-xs font-semibold text-slate-500">
              Fast replies • Clear guidance
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {[
            { k: "Approval Flow", v: "Coach → Selector → Admin" },
            { k: "Dashboards", v: "Role-based access" },
            { k: "Matches", v: "Live scoring & management" },
          ].map((x) => (
            <div key={x.k} className="rounded-2xl border border-slate-200 bg-white/70 p-4">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                {x.k}
              </div>
              <div className="mt-1 text-sm font-extrabold text-slate-900">
                {x.v}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

export default HomePage;

