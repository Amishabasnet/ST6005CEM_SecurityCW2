import { useAuth } from "../../context/AuthContext";

export default function BuyerDashboard() {
  const { user } = useAuth();
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-ink-900">Buyer Dashboard</h1>
      <p className="mt-1 text-sm text-ink-500">Welcome back, {user?.name}.</p>
      <div className="mt-6 rounded-xl border border-ink-100 bg-white p-5 text-sm text-ink-600">
        <p><span className="font-semibold text-ink-800">Email:</span> {user?.email}</p>
        <p><span className="font-semibold text-ink-800">Phone:</span> {user?.phone}</p>
        <p><span className="font-semibold text-ink-800">Role:</span> {user?.role}</p>
      </div>
    </div>
  );
}
