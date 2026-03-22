import { useScoreboard } from "../../context/ScoreboardContext";
import ScoreboardNavbar from "./ScoreboardNavbar";
import ToastBanner from "./ToastBanner";

function ScoreboardLayout({ children }) {
  const { toast } = useScoreboard();
  return (
    <div className="min-h-screen bg-slate-50">
      <ScoreboardNavbar />
      <main className="pt-16">{children}</main>
      <ToastBanner toast={toast} />
    </div>
  );
}

export default ScoreboardLayout;
