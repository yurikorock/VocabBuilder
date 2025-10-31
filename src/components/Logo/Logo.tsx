import { Link } from "react-router-dom";

import css from "./Logo.module.css"



export default function Logo() {
  return (
    <Link to="/">
      <div className={css.logo}>
        <svg className={css.icon} width="36" height="36">
          <use href="/public/sprite.svg#icon-craftwork"></use>
        </svg>
        <p className={css.text}>VocabBuilder</p>
      </div>
    </Link>
  );
}