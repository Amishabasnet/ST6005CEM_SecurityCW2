import { Link } from "react-router-dom";

export default function StatCard({ label, value, icon: Icon, to, accent = "rust" }) {
  const accents = {
    rust: "bg-rust-50 text-rust-500",
    forest: "bg-forest-50 text-forest-600",
    mustard: "bg-mustard-100 text-ink-800",
  };

  const content = (
    <div className="flex items-center justify-between rounded-xl border border-ink-100 bg-white p-4 transition hover:shadow-md">
      <div>
        <p className="text-xs font-medium text-ink-400">{label}</p>
        <p className="text-xl font-semibold text-ink-900">{value}</p>
      </div>
      <div className={`rounded-full p-2.5 ${accents[accent]}`}>
        <Icon className="h-5 w-5" />
      </div>
    </div>
  );

  return to ? <Link to={to}>{content}</Link> : content;
}
