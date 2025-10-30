import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors";
import { Navigate } from "react-router-dom";
import type { ComponentType, JSX } from "react";

interface RestrictedRouteProps {
  component: ComponentType;
  redirectTo: string;
}

export default function RestrictedRoute({
  component: Component,
  redirectTo,
}: RestrictedRouteProps): JSX.Element | null {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (isLoggedIn === undefined) return null;
  return isLoggedIn ? <Navigate to={redirectTo} replace /> : <Component />;
}
