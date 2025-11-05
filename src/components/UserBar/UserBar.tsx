import type { JSX } from "react";
import css from "./UserBar.module.css";

export default function UserBar(): JSX.Element {
  return (
    <div className={css.user_bar_container}>
      <div className={css.user_info}>
        <p className={css.user_name}>Iryna</p>
        <div className={css.icon_wrap}>
          <svg className={css.user_icon} width="20" height="20">
            <use href="/sprite.svg#icon-user"></use>
          </svg>
        </div>
        <button type="button" className={css.burger_btn}>
          <svg className={css.burger_icon}  width="32" height="22">
            <use href="/sprite.svg#icon-burger-menu"></use>
          </svg>
        </button>
      </div>
    </div>
  );
}
