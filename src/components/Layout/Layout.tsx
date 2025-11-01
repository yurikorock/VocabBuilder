import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import ModalContainer from "../ModalContainer/ModalContainer";
import type { JSX } from "react";

export default function Layout(): JSX.Element {
  return (
    <>
      <p>Layout Page</p>
      <Header />
      <main>
        <Outlet />
      </main>
      <ModalContainer />
    </>
  );
}
