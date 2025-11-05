import type { JSX } from "react";
import Logo from "../Logo/Logo";
import UserBar from "../UserBar/UserBar";
import css from "./Header.module.css"

export default function Header():JSX.Element {
  return (
    <div className={css.container}>
      <Logo/>
      {/* <UserNav/> */}
      <UserBar/>
    </div>
  );
}