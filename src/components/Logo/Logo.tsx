import { Link } from "react-router-dom";

import css from "./Logo.module.css"
import type { JSX } from "react";



export default function Logo():JSX.Element {
  return (
    <Link to="/">
      <div className={css.logo}>
        <svg className={css.icon} width="36" height="36">
          <use href="/sprite.svg#icon-craftwork"></use>
        </svg>
        <p className={css.text}>VocabBuilder</p>
      </div>
    </Link>
  );
}