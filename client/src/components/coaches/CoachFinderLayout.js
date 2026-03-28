import CoachFinderNavbar from "./CoachFinderNavbar";

function CoachFinderLayout({ children, mainClassName = "" }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <CoachFinderNavbar />
      <main className={`mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8 ${mainClassName}`}>{children}</main>
    </div>
  );
}

export default CoachFinderLayout;
