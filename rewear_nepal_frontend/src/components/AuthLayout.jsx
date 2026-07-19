import { Link, Outlet } from "react-router-dom";
import { Leaf } from "lucide-react";

export default function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-forest-700 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1200)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Link to="/" className="relative z-10 flex items-center gap-2 text-cream-50">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rust-500 font-display text-lg font-bold">
            R
          </div>
          <span className="font-display text-xl font-semibold">ReWear Nepal</span>
        </Link>
        <div className="relative z-10 space-y-3 text-cream-50">
          <h2 className="font-display text-3xl font-semibold leading-tight">
            Give your clothes a second story.
          </h2>
          <p className="flex items-center gap-2 text-sm text-forest-100">
            <Leaf className="h-4 w-4 text-mustard-400" /> Buy, sell, and reduce textile waste across Nepal
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-cream-50 px-6 py-12">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
