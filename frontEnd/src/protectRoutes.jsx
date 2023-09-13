import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/authContext";

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <h1>Loading...</h1>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/Login" />;
};