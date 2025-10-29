import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors";
import { Navigate } from "react-router-dom";
import type { ComponentType } from "react";

interface RestrictedRouteProps {
  component: ComponentType;
  redirectTo: string;
}

export default function RestrictedRoute({
  component: Component,
  redirectTo,
}: RestrictedRouteProps) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? <Navigate to={redirectTo} replace/> : <Component />;
}
