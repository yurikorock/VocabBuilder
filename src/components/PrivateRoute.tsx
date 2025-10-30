import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors";
import { Navigate } from "react-router-dom";
import type { ComponentType, JSX } from "react";

interface PrivateRouteProps {
  component: ComponentType;
  redirectTo: string;
}

export default function PrivateRoute({
  component: Component,
  redirectTo,
}: PrivateRouteProps): JSX.Element | null {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (isLoggedIn === undefined) return null;
  return isLoggedIn ? <Component /> : <Navigate to={redirectTo} replace />;
}
