import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import ModalContainer from "../ModalContainer/ModalContainer";

export default function Layout() {
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
