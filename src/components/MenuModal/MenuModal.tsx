import type { JSX } from "react";
import css from "./MenuModal.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectUserName } from "../../redux/auth/selectors";
import { NavLink, useNavigate } from "react-router-dom";
import { logOut } from "../../redux/auth/operation";

interface MenuModalProps {
  onClose: () => void;
}

export default function MenuModal({ onClose }: MenuModalProps): JSX.Element {
  const user = useAppSelector(selectUserName);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await dispatch(logOut());
    onClose();
    navigate("/register");
  };

  return (
    <div className={css.menu_backdrop}>
      <div className={css.menu_modal}>
        <div className={css.user_bar_container}>
          <div className={css.user_info}>
            <p className={css.user_name}>{user}</p>
            <div className={css.icon_wrap}>
              <svg className={css.user_icon} width="20" height="20">
                <use href="/sprite.svg#icon-user"></use>
              </svg>
            </div>
          </div>
          <button type="button" className={css.close_btn} onClick={onClose}>
            <svg className={css.close_icon} width="32" height="22">
              <use href="/sprite.svg#icon-close"></use>
            </svg>
          </button>
        </div>
        <nav className={css.navigation}>
          <NavLink
            to={"dictionary"}
            onClick={onClose}
            className={({ isActive }) =>
              isActive ? css.isActive : css.nav_link
            }
          >
            Dictionary
          </NavLink>
          <NavLink
            to={"recommend"}
            onClick={onClose}
            className={({ isActive }) =>
              isActive ? css.isActive : css.nav_link
            }
          >
            Recommend
          </NavLink>
          <NavLink
            to={"training"}
            onClick={onClose}
            className={({ isActive }) =>
              isActive ? css.isActive : css.nav_link
            }
          >
            Training
          </NavLink>
          <button
            type="button"
            onClick={handleLogOut}
            className={css.btn_logout}
          >
            Log out
            <svg className={css.arrow_icon} width="16" height="16">
              <use href="/sprite.svg#icon-arrow-right"></use>
            </svg>
          </button>
        </nav>
        <div className={css.illustration_wrapper}>
          <img
            className={css.illustration}
            src="/image/illustration-cut.svg"
            width="185"
            height="318"
            alt="Illustration"
          />
        </div>
      </div>
    </div>
  );
}
