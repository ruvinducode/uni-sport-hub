import TicketNavbar from "./TicketNavbar";

function PublicLayout({ children, heroDark = false }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <TicketNavbar variant={heroDark ? "dark" : "light"} />
      <div className="pt-16">{children}</div>
    </div>
  );
}

export default PublicLayout;
