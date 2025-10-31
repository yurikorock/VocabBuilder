import css from "./Hero.module.css"

export default function Hero() {
  return (
    <div className={css.container}>
      <svg className={css.icon} width="247" height="191">
          <use href="/public/image/illustration.svg"></use>
        </svg>
    </div>
  );
}