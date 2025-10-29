import { Outlet } from "react-router-dom";
import css from "./Layout.module.css";

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
