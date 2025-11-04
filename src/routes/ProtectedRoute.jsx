import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}