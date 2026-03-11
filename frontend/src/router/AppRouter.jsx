import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../components/Login";
import Register from "../components/Register";
import PublicRoute from "../components/PublicRoute";
import ProtectedRoute from "../components/ProtectedRoute";
import Profile from "../components/Profile";
import VerifyEmailPage from "../components/VerifyEmailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth/register" />,
  },
  {
    path: "/auth",
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "register", element: <Register /> },
          { path: "login", element: <Login /> },
          { path: "verify/:token",element: <VerifyEmailPage/> }
        ],

      },
    ],
  },
  {
    path: "/home",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Profile />,
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}