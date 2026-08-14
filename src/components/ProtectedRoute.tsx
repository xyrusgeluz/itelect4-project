// src/components/ProtectedRoute.tsx
// A pathless layout route that guards every child route behind a login check.
// It renders no UI of its own — it only decides whether to allow or redirect.

import { Navigate, Outlet } from "react-router";
import useAuthStore from "../store/authStore";

function ProtectedRoute() {
  const token = useAuthStore((state) => state.token);

  // No token → send them to login instead of the page they asked for.
  // `replace` overwrites the history entry so Back doesn't loop back here.
  if (token === null) {
    return <Navigate to="/login" replace />;
  }

  // Token present → render whichever child route matched.
  return <Outlet />;
}

export default ProtectedRoute;
