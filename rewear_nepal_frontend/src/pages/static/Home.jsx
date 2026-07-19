import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getDashboardPath } from "../../utils/roleRedirect";

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center">
      <h1 className="text-4xl font-semibold text-ink-900">
        Pre-loved fashion, <span className="text-rust-500">newly found</span>.
      </h1>
      <p className="mt-4 max-w-md text-ink-500">
        ReWear Nepal is Nepal's thrift fashion marketplace. Buy and sell
        second-hand clothes, and help reduce textile waste.
      </p>

      {isAuthenticated ? (
        <Link to={getDashboardPath(user?.role)} className="btn-primary mt-8 !w-auto px-6">
          Go to my dashboard
        </Link>
      ) : (
        <div className="mt-8 flex gap-3">
          <Link to="/register" className="btn-primary !w-auto px-6">
            Create an account
          </Link>
          <Link
            to="/login"
            className="flex items-center rounded-full border-2 border-ink-800 px-6 text-sm font-semibold text-ink-800 hover:bg-ink-800 hover:text-cream-50"
          >
            Log in
          </Link>
        </div>
      )}
    </div>
  );
}
