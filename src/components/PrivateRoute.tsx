import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors";
import { Navigate } from "react-router-dom";
import type { ComponentType } from "react";

interface PrivateRouteProps {
    component: ComponentType,
    redirectTo: string,
}

export default function PrivateRoute ({component: Component, redirectTo}:PrivateRouteProps){
   const isLoggedIn = useSelector(selectIsLoggedIn);
   return isLoggedIn ? <Component/> : <Navigate to={redirectTo} replace/>;
}