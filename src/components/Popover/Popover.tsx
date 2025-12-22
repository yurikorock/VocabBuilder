import css from "./Popover.module.css";

export default function Popover() {
  return (
    <div className={css.container_popover}>
      <div className={css.block}>
        <button className={css.btn}>
          <svg className={css.icon} width="16" height="16">
            <use href="/sprite.svg#icon-pencil"></use>
          </svg>
          Edit
        </button>
      </div>
       <div className={css.block}>
        <button className={css.btn}>
          <svg className={css.icon} width="16" height="16">
            <use href="/sprite.svg#icon-trash"></use>
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
}
