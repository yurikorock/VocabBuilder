import type { JSX } from "react";
import css from "./Hero.module.css"

export default function Hero():JSX.Element {
  return (
    <div className={css.container}>
      <svg className={css.icon} width="247" height="191">
          <use href="/public/image/illustration.svg"></use>
        </svg>
    </div>
  );
}