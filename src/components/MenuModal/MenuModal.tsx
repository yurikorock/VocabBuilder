import type { JSX } from "react";
import css from "./MenuModal.module.css";
import { useAppSelector } from "../../redux/store";
import { selectUser } from "../../redux/auth/selectors";

export default function MenuModal(): JSX.Element {
  const user = useAppSelector(selectUser);
  return (
    <div className={css.menu_backdrop}>
      <div className={css.menu_modal}>
        <div className={css.user_bar_container}>
          <div className={css.user_info}>
            <p className={css.user_name}>{user.name}</p>
            <div className={css.icon_wrap}>
              <svg className={css.user_icon} width="20" height="20">
                <use href="/sprite.svg#icon-user"></use>
              </svg>
            </div>
            
          </div>
          <button type="button" className={css.close_btn}>
              <svg className={css.close_icon} width="32" height="22">
                <use href="/sprite.svg#icon-close"></use>
              </svg>
            </button>
        </div>
      </div>
    </div>
  );
}
