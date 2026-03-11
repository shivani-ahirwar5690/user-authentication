// ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { axiosInstance } from "../config/axiosInstance";

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    axiosInstance.get("/auth/current-user", { withCredentials: true })
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!isAuth) return <Navigate to="/auth/login" replace />;
  return <Outlet />;
};

export default ProtectedRoute;