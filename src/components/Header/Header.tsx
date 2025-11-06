import { type JSX } from "react";
import Logo from "../Logo/Logo";
import UserBar from "../UserBar/UserBar";
import css from "./Header.module.css";
import { useAppSelector } from "../../redux/store";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";

export default function Header(): JSX.Element {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const user = useAppSelector(selectUser);
  
  return (
    <div className={css.container}>
      <Logo />
      {/* <UserNav/> */}
      {isLoggedIn && user && <UserBar />}
    </div>
  );
}
