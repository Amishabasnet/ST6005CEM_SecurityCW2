import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getDashboardPath } from "../utils/roleRedirect";

export default function BuyerRoute() {
  const { isAuthenticated, isBuyer, user, loading } = useAuth();

  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isBuyer) return <Navigate to={getDashboardPath(user?.role)} replace />;

  return <Outlet />;
}
