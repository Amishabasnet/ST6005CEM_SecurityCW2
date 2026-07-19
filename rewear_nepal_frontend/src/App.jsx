import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./components/MainLayout";
import AuthLayout from "./components/AuthLayout";

import ProtectedRoute from "./routes/ProtectedRoute";
import BuyerRoute from "./routes/BuyerRoute";
import SellerRoute from "./routes/SellerRoute";
import AdminRoute from "./routes/AdminRoute";

import Home from "./pages/static/Home";
import NotFound from "./pages/static/NotFound";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

import BuyerDashboard from "./pages/dashboard/BuyerDashboard";
import SellerDashboard from "./pages/dashboard/SellerDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            style: { background: "#1C1815", color: "#FDFBF7", fontSize: "14px" },
          }}
        />
        <Routes>
          {/* Public site */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />

            {/* Any authenticated user */}
            <Route element={<ProtectedRoute />}>
              {/* generic protected pages could be added here */}
            </Route>

            {/* Role-specific dashboards */}
            <Route element={<BuyerRoute />}>
              <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
            </Route>
            <Route element={<SellerRoute />}>
              <Route path="/seller/dashboard" element={<SellerDashboard />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>
          </Route>

          {/* Auth pages */}
          <Route element={<AuthLayout />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
