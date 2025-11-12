import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import ModalContainer from "../ModalContainer/ModalContainer";
import type { JSX } from "react";
import css from "./Layout.module.css"

export default function Layout(): JSX.Element {
  return (
    <>
      <Header />
      <main className={css.main_container}>
        <Outlet />
      </main>
      <ModalContainer />
    
    </>
  );
}
