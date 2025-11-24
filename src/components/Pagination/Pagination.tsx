import type { JSX } from "react";
import css from "./Pagination.module.css";
import { useAppDispatch } from "../../redux/store";
import { setPage } from "../../redux/words/wordsSlice";

interface PaginationProps {
  page: number;
  totalPages: number;
}

export default function Pagination({
  page,
  totalPages,
}: PaginationProps): JSX.Element {
  const dispatch = useAppDispatch();
  
  const getPageNumbers = () => {
     const pages: (number | string)[] = [];
    if (totalPages < 5) {
      for (let i = 1; i < totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (page < totalPages - 2) pages.push("..."); // крапки після поточної
      pages.push(totalPages); // остання сторінка
    }
    return pages;
  };
  const pages = getPageNumbers();
  return (
    <div className={css.container_pagination}>
      <button disabled={page === 1} onClick={() => dispatch(setPage(1))}>
        {"<<"}
      </button>
      <button disabled={page === 1} onClick={() => dispatch(setPage(page - 1))}>
        {"<"}
      </button>

      {pages.map((p, idx) =>
        typeof p === "number" ? (
          <button
            key={idx}
            className={p === page ? css.active : ""}
            onClick={() => dispatch(setPage(p))}
          >
            {p}
          </button>
        ) : (
          <span key={idx} className={css.dots}>
            {p}
          </span>
        )
      )}

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
