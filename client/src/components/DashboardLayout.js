import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const roleConfig = {
  admin: {
    title: "Admin Console",
    hint: "Final decisions for selector-approved coaches.",
    accent:
      "from-blue-600 to-cyan-600",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    navBg: "bg-blue-50/60 text-blue-700 border-blue-200",
  },
  coach: {
    title: "Coach Area",
    hint: "Review player registration requests and decide approvals.",
    accent: "from-emerald-600 to-teal-600",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    navBg: "bg-emerald-50/60 text-emerald-700 border-emerald-200",
  },
  selector: {
    title: "Selector Room",
    hint: "Evaluate coach applications before admin review.",
    accent: "from-indigo-600 to-sky-600",
    badge: "bg-indigo-50 text-indigo-700 border-indigo-200",
    navBg: "bg-indigo-50/60 text-indigo-700 border-indigo-200",
  },
  player: {
    title: "Player Hub",
    hint: "Track performance and view progression opportunities.",
    accent: "from-orange-500 to-amber-500",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    navBg: "bg-amber-50/60 text-amber-700 border-amber-200",
  },
};

function IconBase({ className, children }) {
  return (
    <span
      className={`flex h-9 w-9 items-center justify-center rounded-xl border border-white/60 bg-white/60 ${className}`}
    >
      {children}
    </span>
  );
}

function IconCrown() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path
        d="M4 7l4 4 4-8 4 8 4-4v13H4V7z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconClipboard() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path
        d="M9 5l1-2h4l1 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <rect
        x="6"
        y="5"
        width="12"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M9 13h6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconTarget() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <circle
        cx="12"
        cy="12"
        r="8"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 2v3M22 12h-3M12 22v-3M2 12h3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconUserBall() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <circle
        cx="10.5"
        cy="9"
        r="3.2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M4.5 21c1.2-4.6 4-6.8 6-6.8s4.8 2.2 6 6.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="18.5" cy="7" r="2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function roleItems(role) {
  if (role === "admin") {
    return [
      { label: "Dashboard", to: "/admin", icon: <IconCrown /> },
      { label: "See Requests", to: "/admin", icon: <IconClipboard /> },
      { label: "Manage Users", disabled: true, icon: <IconClipboard /> },
      { label: "Activities", disabled: true, icon: <IconClipboard /> },
    ];
  }
  if (role === "coach") {
    return [
      { label: "Dashboard", to: "/coach", icon: <IconClipboard /> },
      { label: "See Requests", to: "/coach", icon: <IconClipboard /> },
      { label: "Matches", disabled: true, icon: <IconClipboard /> },
      { label: "Team Profile", disabled: true, icon: <IconClipboard /> },
    ];
  }
  if (role === "selector") {
    return [
      { label: "Dashboard", to: "/selector", icon: <IconTarget /> },
      { label: "See Requests", to: "/selector", icon: <IconTarget /> },
      { label: "Evaluations", disabled: true, icon: <IconTarget /> },
      { label: "Opportunities", disabled: true, icon: <IconTarget /> },
    ];
  }
  return [
    { label: "Dashboard", to: "/player", icon: <IconUserBall /> },
    { label: "Performance", to: "/player", icon: <IconUserBall /> },
    { label: "Opportunities", disabled: true, icon: <IconUserBall /> },
    { label: "Matches", disabled: true, icon: <IconUserBall /> },
  ];
}

function DashboardLayout({ role, children }) {
  const { pathname } = useLocation();
  const cfg = roleConfig[role] || roleConfig.player;
  const items = roleItems(role);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="flex">
        <aside className="hidden w-80 shrink-0 border-r bg-white lg:block">
          <div className="px-6 py-6">
            <div
              className={`rounded-3xl border border-slate-200 bg-gradient-to-br ${cfg.accent} p-[1px]`}
            >
              <div className="rounded-[1.25rem] bg-white p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${cfg.badge}`}
                    >
                      {role}
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-slate-900">
                      {cfg.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">{cfg.hint}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <nav className="px-4 pb-6">
            <div className="space-y-2">
              {items.map((item) => {
                const active = item.to && pathname === item.to;

                if (item.disabled) {
                  return (
                    <div
                      key={item.label}
                      className="cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 opacity-60"
                    >
                      <div className="flex items-center gap-3">
                        <IconBase className="text-slate-600">
                          {item.icon}
                        </IconBase>
                        <div className="text-sm font-semibold text-slate-700">
                          {item.label}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    className={`block rounded-xl border px-4 py-3 transition ${
                      active
                        ? `border-transparent bg-gradient-to-r ${cfg.accent} text-white shadow-sm`
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconBase
                        className={
                          active
                            ? "text-white bg-white/10 border-white/20"
                            : "text-slate-600"
                        }
                      >
                        {item.icon}
                      </IconBase>
                      <div
                        className={`text-sm font-semibold ${
                          active ? "text-white" : "text-slate-800"
                        }`}
                      >
                        {item.label}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </nav>
        </aside>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;

