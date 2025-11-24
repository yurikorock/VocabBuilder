import type { JSX } from "react";
import css from "./Pagination.module.css";
import { useAppDispatch } from "../../redux/store";
import { setPage } from "../../redux/words/wordsSlice";

export default function Pagination({ page, totalPages }): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className={css.container_pagination}>
      <button disabled={page === 1} onClick={() => dispatch(setPage(1))}>
        {"<<"}
      </button>
      <button disabled={page === 1} onClick={() => dispatch(setPage(page - 1))}>
        {"<"}
      </button>
      <button
        onClick={() => dispatch(setPage(page + 1))}
        disabled={page === totalPages}
      >
        {">"}
      </button>
      <button
        onClick={() => dispatch(setPage(totalPages))}
        disabled={page === totalPages}
      >
        {">>"}
      </button>
    </div>
  );
}
