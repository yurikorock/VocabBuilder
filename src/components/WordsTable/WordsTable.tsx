import type { JSX } from "react";
import css from "./WordsTable.module.css";

export default function WordsTable(): JSX.Element {
  return (
    <div className={css.container_word_table}>
      <p>WordsTable</p>
    </div>
  );
}
