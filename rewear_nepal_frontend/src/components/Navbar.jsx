import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="border-b border-ink-100 bg-cream-50">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-600 font-display text-lg font-bold text-cream-50">
            R
          </div>
          <span className="font-display text-lg font-semibold text-ink-900">
            ReWear <span className="text-rust-500">Nepal</span>
          </span>
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-ink-900">{user?.name}</p>
              <p className="text-xs capitalize text-ink-400">{user?.role}</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-100 font-semibold text-forest-700">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 rounded-full border border-ink-200 px-3 py-1.5 text-sm font-medium text-ink-600 hover:bg-ink-50"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login" className="text-sm font-medium text-ink-600 hover:text-rust-500">
              Log in
            </Link>
            <Link to="/register" className="btn-primary !w-auto !px-4 !py-2 text-sm">
              Sign up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
