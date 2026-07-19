import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-semibold text-ink-900">404</h1>
      <p className="mt-2 text-sm text-ink-500">This page doesn't exist.</p>
      <Link to="/" className="btn-primary mt-6 !w-auto px-6">
        Back to home
      </Link>
    </div>
  );
}
