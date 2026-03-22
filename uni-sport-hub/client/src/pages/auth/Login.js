import { useState } from "react";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState("football");

  const handleChange = (e) => {
    setError(null);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);

        if (data.user.role === "admin") {
          window.location.href = "/admin";
        } else if (data.user.role === "coach" && data.user.isSelector) {
          window.location.href = "/selector";
        } else if (data.user.role === "coach") {
          window.location.href = "/coach";
        } else {
          window.location.href = "/player";
        }
      } else {
        setError(data.message || "Unable to sign in. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Connection failed. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  const themes = {
    football: {
      meshGradient:
        "linear-gradient(135deg, #0b1220 0%, #0a3a62 25%, #1d4ed8 50%, #0ea5e9 75%, #061224 100%)",
      meshAccent:
        "linear-gradient(120deg, rgba(59,130,246,0.55) 0%, transparent 42%, rgba(139,92,246,0.35) 55%, transparent 72%, rgba(6,182,212,0.25) 100%)",
      lights:
        "radial-gradient(circle at 15% 10%, rgba(59,130,246,0.35) 0%, transparent 45%), radial-gradient(circle at 85% 20%, rgba(139,92,246,0.30) 0%, transparent 48%)",
      orb1: "rgba(59,130,246,0.22)",
      orb2: "rgba(139,92,246,0.16)",
      orb3: "rgba(34,197,94,0.18)",
      titleAccentGradient:
        "linear-gradient(90deg, #93c5fd 0%, #60a5fa 35%, #22c55e 100%)",
      pitchBackground:
        "linear-gradient(180deg, rgba(2,6,23,0) 0%, rgba(34,197,94,0.10) 25%, rgba(4,120,87,0.45) 60%, rgba(14,165,233,0.10) 100%)," +
        "repeating-linear-gradient(90deg, rgba(34,197,94,0.22) 0 34px, rgba(34,197,94,0.06) 34px 68px)," +
        "repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0 28px, transparent 28px 56px)," +
        "linear-gradient(90deg, transparent 49.6%, rgba(250,204,21,0.60) 50%, transparent 50.4%)",
      pitchBackgroundSize: "auto, auto, auto, 100% 100%",
      buttonGradient: "from-blue-600 via-indigo-600 to-violet-600",
      brandGradient: "from-sky-400 to-indigo-400",
      roleSubtitle: "Football pace with clear decisions.",
      featureA: "Football pace with clean approvals.",
    },
    rugby: {
      meshGradient:
        "linear-gradient(135deg, #061826 0%, #0f3d2e 30%, #166534 55%, #92400e 80%, #061826 100%)",
      meshAccent:
        "linear-gradient(120deg, rgba(16,185,129,0.55) 0%, transparent 42%, rgba(245,158,11,0.45) 55%, transparent 72%, rgba(244,63,94,0.25) 100%)",
      lights:
        "radial-gradient(circle at 20% 15%, rgba(34,197,94,0.35) 0%, transparent 45%), radial-gradient(circle at 85% 25%, rgba(245,158,11,0.32) 0%, transparent 48%)",
      orb1: "rgba(34,197,94,0.22)",
      orb2: "rgba(245,158,11,0.18)",
      orb3: "rgba(239,68,68,0.14)",
      titleAccentGradient:
        "linear-gradient(90deg, #34d399 0%, #fbbf24 40%, #fb7185 100%)",
      pitchBackground:
        "linear-gradient(180deg, rgba(2,6,23,0) 0%, rgba(34,197,94,0.10) 22%, rgba(4,120,87,0.48) 60%, rgba(185,28,28,0.08) 100%)," +
        "repeating-linear-gradient(90deg, rgba(34,197,94,0.22) 0 30px, rgba(34,197,94,0.06) 30px 60px)," +
        "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0 26px, transparent 26px 52px)," +
        "linear-gradient(90deg, transparent 49.6%, rgba(248,113,113,0.55) 50%, transparent 50.4%)," +
        "radial-gradient(circle at 50% 38%, rgba(248,113,113,0.18) 0%, transparent 48%)",
      pitchBackgroundSize: "auto, auto, auto, 100% 100%, auto",
      buttonGradient: "from-emerald-700 via-amber-500 to-rose-600",
      brandGradient: "from-emerald-400 to-amber-300",
      roleSubtitle: "Rugby intensity with clean approvals.",
      featureA: "Rugby intensity with clean approvals.",
    },
    cricket: {
      meshGradient:
        "linear-gradient(135deg, #0b1220 0%, #4d7c0f 26%, #a16207 52%, #f59e0b 78%, #07131f 100%)",
      meshAccent:
        "linear-gradient(120deg, rgba(245,158,11,0.55) 0%, transparent 42%, rgba(34,197,94,0.35) 55%, transparent 72%, rgba(59,130,246,0.25) 100%)",
      lights:
        "radial-gradient(circle at 20% 15%, rgba(245,158,11,0.35) 0%, transparent 45%), radial-gradient(circle at 85% 25%, rgba(34,197,94,0.25) 0%, transparent 48%)",
      orb1: "rgba(245,158,11,0.20)",
      orb2: "rgba(34,197,94,0.16)",
      orb3: "rgba(59,130,246,0.12)",
      titleAccentGradient:
        "linear-gradient(90deg, #fde68a 0%, #f59e0b 35%, #22c55e 100%)",
      pitchBackground:
        "linear-gradient(180deg, rgba(2,6,23,0) 0%, rgba(34,197,94,0.08) 28%, rgba(34,197,94,0.18) 46%, rgba(2,6,23,0) 100%)," +
        "repeating-linear-gradient(90deg, rgba(34,197,94,0.12) 0 28px, rgba(34,197,94,0.05) 28px 56px)," +
        "repeating-linear-gradient(0deg, rgba(120,53,15,0.10) 0 26px, transparent 26px 52px)," +
        "linear-gradient(90deg, transparent 44%, rgba(191,146,74,0.46) 50%, transparent 56%)," +
        "radial-gradient(circle at 50% 50%, rgba(191,146,74,0.40) 0%, transparent 55%)",
      pitchBackgroundSize: "auto, auto, auto, 100% 100%, auto",
      buttonGradient: "from-amber-500 via-lime-500 to-emerald-600",
      brandGradient: "from-amber-400 to-lime-400",
      roleSubtitle: "Cricket precision with selection clarity.",
      featureA: "Cricket precision with selection clarity.",
    },
  };

  const t = themes[theme] || themes.football;

  const SportIcon = () => {
    if (theme === "rugby") {
      return (
        <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
          <path
            d="M14.5 3.5c2.4.7 4.1 2.9 4 5.4-.1 2.1-1.3 3.8-2.9 5.2-2.3 2-4.6 4.4-5.7 6-1.1-.7-2.2-1.8-2.9-2.9 1.7-1.1 4-3.4 6-5.7 1.4-1.6 3.1-2.8 5.2-2.9 2.5-.1 4.7 1.6 5.4 4-1 .6-2.6.3-3.7-.3-1.3-.7-2.4-1.9-3.1-3.2-.6-1.1-.9-2.7-.3-3.7Z"
            stroke="currentColor"
            strokeWidth="1.3"
            opacity="0.95"
          />
          <path
            d="M10 14l4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.8"
          />
        </svg>
      );
    }

    if (theme === "cricket") {
      return (
        <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
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
          <path
            d="M6.5 18.2l1.3-1.3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.85"
          />
        </svg>
      );
    }

    return (
      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" opacity="0.95" />
        <path
          d="M8.2 9.3 12 12l3.8-2.7M7.6 14.1 12 12l4.4 2.1"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
          opacity="0.9"
        />
        <path
          d="M9 6.8 12 12l-3 5.2M15 6.8 12 12l3 5.2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
          opacity="0.65"
        />
      </svg>
    );
  };

  const StickPlayer = ({ className, color, style }) => {
    return (
      <svg
        viewBox="0 0 64 64"
        className={className}
        style={{ color, ...style }}
        aria-hidden
      >
        {/* Head */}
        <circle cx="32" cy="18" r="7" fill="currentColor" opacity="0.95" />
        {/* Body */}
        <path
          d="M32 26 C28 34, 22 40, 18 46"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M32 26 C36 34, 42 40, 46 46"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* Legs */}
        <path
          d="M26 42 C24 48, 23 54, 22 58"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M38 42 C40 48, 41 54, 42 58"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          opacity="0.8"
        />
      </svg>
    );
  };

  const Ball = ({ className, color, style }) => {
    return (
      <svg
        viewBox="0 0 64 64"
        className={className}
        style={{ color, ...style }}
        aria-hidden
      >
        <circle cx="32" cy="32" r="12" fill="currentColor" opacity="0.95" />
        <path
          d="M20 32 H44"
          stroke="white"
          strokeWidth="3"
          opacity="0.7"
          strokeLinecap="round"
        />
        <path
          d="M32 20 V44"
          stroke="white"
          strokeWidth="3"
          opacity="0.35"
          strokeLinecap="round"
        />
      </svg>
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50">
      {/* Sports arena: football + rugby + cricket lanes with animated players */}
      <div className="pointer-events-none absolute inset-0">
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.08),transparent_55%)]" />

        <div className="grid h-full grid-rows-3">
          {/* Football lane */}
          <div
            className={`relative overflow-hidden transition-opacity duration-500 ${
              theme === "football" ? "opacity-100" : "opacity-18"
            }`}
          >
            <div
              className="absolute inset-0 animate-turf-pan"
              style={{
                background: themes.football.pitchBackground,
                backgroundSize: themes.football.pitchBackgroundSize,
                opacity: theme === "football" ? 0.55 : 0.15,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 via-transparent to-transparent" />

            <div className="absolute left-[9%] top-[23%]">
              <StickPlayer
                className="h-20 w-20 animate-player-run"
                color="rgba(59,130,246,0.95)"
                style={{ animation: "player-run 2.6s ease-in-out infinite" }}
              />
            </div>
            <div className="absolute right-[10%] top-[33%]">
              <StickPlayer
                className="h-20 w-20 animate-player-run-fast"
                color="rgba(34,197,94,0.95)"
                style={{
                  animation: "player-run-fast 1.8s ease-in-out infinite",
                }}
              />
            </div>
            <div className="absolute left-[38%] top-[40%]">
              <Ball
                className="h-14 w-14 animate-ball-arc"
                color="rgba(250,204,21,0.98)"
                style={{ animation: "ball-arc 1.9s ease-in-out infinite" }}
              />
            </div>
            {/* Goal / pass line */}
            <div className="absolute left-[18%] top-[58%] h-px w-[66%] bg-gradient-to-r from-sky-400/0 via-sky-300/60 to-sky-400/0 opacity-60" />
          </div>

          {/* Rugby lane */}
          <div
            className={`relative overflow-hidden transition-opacity duration-500 ${
              theme === "rugby" ? "opacity-100" : "opacity-15"
            }`}
          >
            <div
              className="absolute inset-0 animate-turf-pan"
              style={{
                background: themes.rugby.pitchBackground,
                backgroundSize: themes.rugby.pitchBackgroundSize,
                opacity: theme === "rugby" ? 0.62 : 0.15,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/5 via-transparent to-slate-900/7" />

            {/* Scrum / line (hike moment) */}
            <div className="absolute left-[35%] top-[42%]">
              <StickPlayer className="h-16 w-16" color="rgba(34,197,94,0.95)" />
            </div>
            <div className="absolute left-[43%] top-[41%]">
              <StickPlayer className="h-16 w-16" color="rgba(245,158,11,0.95)" />
            </div>
            <div className="absolute left-[51%] top-[44%]">
              <StickPlayer className="h-16 w-16" color="rgba(244,63,94,0.88)" />
            </div>

            {/* Ball hiking/pass */}
            <div className="absolute left-[48%] top-[36%]">
              <Ball
                className="h-10 w-10 animate-rugby-hike"
                color="rgba(245,158,11,0.98)"
              />
            </div>

            {/* Try line */}
            <div className="absolute left-[10%] top-[62%] h-[2px] w-[80%] bg-gradient-to-r from-amber-300/0 via-amber-300/60 to-amber-300/0 opacity-70" />
          </div>

          {/* Cricket lane */}
          <div
            className={`relative overflow-hidden transition-opacity duration-500 ${
              theme === "cricket" ? "opacity-100" : "opacity-10"
            }`}
          >
            <div
              className="absolute inset-0 animate-turf-pan"
              style={{
                background: themes.cricket.pitchBackground,
                backgroundSize: themes.cricket.pitchBackgroundSize,
                opacity: theme === "cricket" ? 0.72 : 0.18,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/6 via-transparent to-slate-900/10" />

            {/* Bowler */}
            <div className="absolute left-[44%] top-[70%]">
              <StickPlayer
                className="h-20 w-20 animate-bowler-bob-cricket"
                color="rgba(34,197,94,0.95)"
                style={{
                  animation: "bowler-bob-cricket 1.2s ease-in-out infinite",
                }}
              />
            </div>

            {/* Wicket */}
            <div className="absolute left-[57%] top-[72%]">
              <div
                className="h-28 w-3 animate-wicket-breathe-cricket rounded bg-amber-400/80"
                style={{
                  animation: "wicket-breathe-cricket 1.8s ease-in-out infinite",
                }}
              />
              <div className="mt-1 h-2 w-4 rounded bg-amber-400/70" />
              <div className="mt-1 h-2 w-4 rounded bg-amber-400/50" />
            </div>

            {/* Bat swing */}
            <div className="absolute right-[24%] top-[62%]">
              <div className="relative">
                <StickPlayer
                  className="h-18 w-18"
                  color="rgba(245,158,11,0.98)"
                />
                <div
                  className="absolute -right-3 top-5 h-1 w-14 origin-left animate-bat-swing-cricket rounded bg-amber-300/90"
                  style={{
                    animation: "bat-swing-cricket 1s ease-in-out infinite",
                  }}
                />
              </div>
            </div>

            {/* Cricket ball */}
            <div className="absolute left-[45%] top-[52%]">
              <Ball
                className="h-14 w-14 animate-cricket-ball-arc"
                color="rgba(250,204,21,0.98)"
                style={{
                  animation: "cricket-ball-arc 1.4s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </div>

        {/* Soft overlay for readability (reduced so animations show through) */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/20 to-transparent" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col lg:flex-row">
        {/* Brand panel */}
        <aside className="relative flex flex-1 flex-col justify-center px-8 py-16 sm:px-12 lg:px-16 xl:px-24">
          <div className="max-w-lg animate-fade-in-up opacity-0 [animation-fill-mode:forwards]">
            <div className="mb-8 inline-flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/60 px-4 py-2 backdrop-blur-md">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${t.brandGradient} shadow-lg shadow-blue-500/30`}
              >
                <SportIcon />
              </span>
              <span className="text-sm font-medium tracking-wide text-slate-700/90">
                Uni Sport Hub
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Elevate your
              <span
                className="block bg-clip-text text-transparent"
                style={{ backgroundImage: t.titleAccentGradient }}
              >
                university sports
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              One portal for players, coaches, selectors, and administrators —
              performance, approvals, and selection in sync.
            </p>

            <ul className="mt-10 space-y-3 text-sm text-slate-400">
              {[
                t.featureA,
                "Rugby · Football · Cricket approvals in one place",
                "Pathways to national & international",
              ].map((item, i) => (
                <li
                  key={item}
                  className={`flex items-center gap-3 opacity-0 [animation-fill-mode:forwards] ${
                    i === 0
                      ? "animate-fade-in-up-delay-2"
                      : i === 1
                        ? "animate-fade-in-up-delay-3"
                        : "animate-fade-in-up-delay-4"
                  }`}
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Login card */}
        <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-8 lg:py-16">
          <div
            className="w-full max-w-md animate-scale-in opacity-0 [animation-fill-mode:forwards] [animation-delay:0.15s]"
          >
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/[0.28] p-px shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/70 via-transparent to-transparent opacity-40" />
              <div className="relative rounded-[1.4rem] bg-white/60 px-8 py-10 sm:px-10 sm:py-12">
            <div className="mb-8 animate-fade-in-up-delay-1 opacity-0 [animation-fill-mode:forwards]">
              <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                    Welcome back
                  </h2>
              <p className="mt-2 text-sm text-slate-600">
                    Sign in with your university credentials
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="animate-fade-in-up-delay-1 opacity-0 [animation-fill-mode:forwards]">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-medium uppercase tracking-wider text-slate-600">
                        Sport theme
                      </span>
                      <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-800">
                        {theme === "rugby"
                          ? "Rugby"
                          : theme === "cricket"
                            ? "Cricket"
                            : "Football"}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setTheme("football")}
                        className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                          theme === "football"
                            ? "border-slate-300 bg-slate-100 text-slate-900"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                        disabled={loading}
                      >
                        Football
                      </button>
                      <button
                        type="button"
                        onClick={() => setTheme("rugby")}
                        className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                          theme === "rugby"
                            ? "border-slate-300 bg-slate-100 text-slate-900"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                        disabled={loading}
                      >
                        Rugby
                      </button>
                      <button
                        type="button"
                        onClick={() => setTheme("cricket")}
                        className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                          theme === "cricket"
                            ? "border-slate-300 bg-slate-100 text-slate-900"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                        disabled={loading}
                      >
                        Cricket
                      </button>
                    </div>

                    <p className="mt-3 text-xs text-slate-600">{t.roleSubtitle}</p>
                  </div>

                  <div className="animate-fade-in-up-delay-2 opacity-0 [animation-fill-mode:forwards]">
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-600"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="you@university.edu"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 placeholder:text-slate-400 outline-none transition duration-300 focus:border-blue-400/50 focus:bg-slate-50 focus:ring-2 focus:ring-blue-500/20"
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="animate-fade-in-up-delay-3 opacity-0 [animation-fill-mode:forwards]">
                    <label
                      htmlFor="password"
                      className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-600"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      autoComplete="current-password"
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 placeholder:text-slate-400 outline-none transition duration-300 focus:border-blue-400/50 focus:bg-slate-50 focus:ring-2 focus:ring-blue-500/20"
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>

                  {error && (
                    <div
                      role="alert"
                      className="animate-fade-in-up rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
                    >
                      {error}
                    </div>
                  )}

                  <div className="animate-fade-in-up-delay-4 pt-2 opacity-0 [animation-fill-mode:forwards]">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`group relative w-full overflow-hidden rounded-xl bg-gradient-to-r ${t.buttonGradient} py-3.5 text-sm font-semibold text-white shadow-lg transition duration-300 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60`}
                    >
                      <span
                        className="absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.15)_50%,transparent_100%)] bg-[length:200%_100%] opacity-0 transition-opacity duration-500 group-hover:animate-shimmer group-hover:opacity-100"
                        aria-hidden
                      />
                      <span className="relative flex items-center justify-center gap-2">
                        {loading ? (
                          <>
                            <svg
                              className="h-5 w-5 animate-spin"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              aria-hidden
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            Signing in…
                          </>
                        ) : (
                          "Sign in"
                        )}
                      </span>
                    </button>
                  </div>
                </form>

                <p className="mt-8 animate-fade-in-up-delay-4 text-center text-xs text-slate-500 opacity-0 [animation-fill-mode:forwards]">
                  Secure access · Role-based dashboards
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
