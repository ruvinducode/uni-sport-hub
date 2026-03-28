import { jwtDecode } from "jwt-decode";
import BrandLogo from "./BrandLogo";

function Navbar() {
  const token = localStorage.getItem("token");

  let user = null;

  if (token) {
    try {
      user = jwtDecode(token);
    } catch (error) {
      console.error("Invalid token");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const roleLabel = user?.isSelector ? "selector" : user?.role;

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <BrandLogo className="rounded-xl bg-white shadow-md ring-1 ring-slate-200/90" />
          <div>
            <h1 className="text-lg font-semibold text-slate-900">Uni Sport Hub</h1>
            <p className="text-xs text-slate-500">University Sports Management Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user && (
            <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
              {roleLabel}
            </span>
          )}

          <button
            onClick={handleLogout}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;