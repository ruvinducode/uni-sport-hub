function StickPlayer({ className, color, style }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      style={{ color, ...style }}
      aria-hidden
    >
      <circle cx="32" cy="18" r="7" fill="currentColor" opacity="0.95" />
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
}

function Ball({ className, style, color }) {
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
}

function HomeArenaBackground({ activeSport }) {
  const isFootball = activeSport === "football";
  const isRugby = activeSport === "rugby";
  const isCricket = activeSport === "cricket";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Stadium glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-x-0 top-0 h-72 opacity-80 animate-pulse-glow" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,197,94,0.22),transparent_55%)]" />

      {/* Three pitch lanes */}
      <div className="absolute inset-0 grid grid-rows-3">
        {/* Football lane (top) */}
        <div className={`relative overflow-hidden transition-opacity ${isFootball ? "opacity-100" : "opacity-30"}`}>
          <div
            className="absolute inset-0 animate-turf-pan"
            style={{
              background:
                "repeating-linear-gradient(90deg, rgba(34,197,94,0.28) 0 28px, rgba(34,197,94,0.10) 28px 56px)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          <div className="absolute left-[10%] top-[25%]">
            <StickPlayer
              className="h-16 w-16"
              color="rgba(34,197,94,0.98)"
              style={{ animation: "player-run 2.6s ease-in-out infinite" }}
            />
          </div>
          <div className="absolute left-[42%] top-[38%]">
            <Ball
              className="h-12 w-12"
              color="rgba(250,204,21,0.98)"
              style={{ animation: "ball-arc 1.9s ease-in-out infinite" }}
            />
          </div>
        </div>

        {/* Rugby lane (middle) */}
        <div className={`relative overflow-hidden transition-opacity ${isRugby ? "opacity-100" : "opacity-25"}`}>
          <div
            className="absolute inset-0 animate-turf-pan"
            style={{
              background:
                "repeating-linear-gradient(90deg, rgba(34,197,94,0.22) 0 26px, rgba(34,197,94,0.07) 26px 52px)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/20" />

          <div className="absolute left-[46%] top-[28%]">
            <StickPlayer
              className="h-20 w-20"
              color="rgba(34,197,94,0.95)"
              style={{ animation: "player-run 2.8s ease-in-out infinite" }}
            />
          </div>

          <div className="absolute left-[50%] top-[18%]">
            <Ball
              className="h-11 w-11"
              color="rgba(245,158,11,0.98)"
              style={{ animation: "rugby-hike 2.3s ease-in-out infinite" }}
            />
          </div>

          <div className="absolute left-[10%] top-[62%] h-px w-[80%] bg-gradient-to-r from-amber-300/0 via-amber-300/70 to-amber-300/0 opacity-70" />
        </div>

        {/* Cricket lane (bottom) */}
        <div className={`relative overflow-hidden transition-opacity ${isCricket ? "opacity-100" : "opacity-25"}`}>
          <div
            className="absolute inset-0 animate-turf-pan"
            style={{
              background:
                "repeating-linear-gradient(90deg, rgba(250,204,21,0.16) 0 26px, rgba(250,204,21,0.06) 26px 52px)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35" />

          <div className="absolute left-[42%] top-[35%]">
            <StickPlayer
              className="h-20 w-20"
              color="rgba(34,197,94,0.95)"
              style={{ animation: "bowler-bob-cricket 1.2s ease-in-out infinite" }}
            />
          </div>

          <div className="absolute left-[57%] top-[38%]">
            <div
              className="h-24 w-3 rounded bg-amber-400/80"
              style={{
                animation: "wicket-breathe-cricket 1.8s ease-in-out infinite",
              }}
            />
          </div>

          <div className="absolute left-[46%] top-[18%]">
            <Ball
              className="h-14 w-14"
              color="rgba(250,204,21,0.98)"
              style={{ animation: "cricket-ball-arc 1.4s ease-in-out infinite" }}
            />
          </div>
        </div>
      </div>

      {/* Center vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
    </div>
  );
}

export default HomeArenaBackground;

