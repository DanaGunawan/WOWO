import { useAuth } from "@/hooks/use-auth";
import { Navigate, Outlet } from "react-router-dom";

interface props {
  requiredAuth?: boolean;
}

const RouteGuard = ({ requiredAuth }: props) => {
  console.log(requiredAuth);

  const { user } = useAuth();

  if (requiredAuth && !user) return <Navigate to="/" replace />;
  if (!requiredAuth && user) return <Navigate to="chat" replace />;

  return <Outlet />;
};

export default RouteGuard;
