import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PublicLayout from "../../components/tickets/PublicLayout";
import { useTicket } from "../../context/TicketContext";

function TicketRegisterPage() {
  const { loginFan } = useTicket();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (!email.trim()) {
      setError("Enter your email.");
      return;
    }
    loginFan({ email: email.trim(), name: name.trim() || email.split("@")[0] });
    navigate("/matches", { replace: true });
  };

  return (
    <PublicLayout>
      <div className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-extrabold text-slate-900">Create fan account</h1>
          <p className="mt-2 text-sm font-semibold text-slate-600">
            Demo registration — stored locally for booking history and faster checkout.
          </p>
          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="tr-name" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Full name
              </label>
              <input
                id="tr-name"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/25"
              />
            </div>
            <div>
              <label htmlFor="tr-email" className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Email
              </label>
              <input
                id="tr-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/25"
                required
              />
            </div>
            {error && (
              <div role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full rounded-2xl bg-emerald-600 px-4 py-3.5 text-sm font-bold text-white hover:bg-emerald-700"
            >
              Sign up
            </button>
          </form>
          <p className="mt-6 text-center text-sm font-semibold text-slate-600">
            Already have an account?{" "}
            <Link to="/tickets/login" className="font-bold text-emerald-700 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}

export default TicketRegisterPage;
