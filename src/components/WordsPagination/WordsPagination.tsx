import type { JSX } from "react";
import css from "./WordsPagination.module.css";
import { useAppDispatch } from "../../redux/store";
import { setPage } from "../../redux/words/wordsSlice";

interface PaginationProps {
  page: number;
  totalPages: number;
}

export default function WordsPagination({
  page,
  totalPages,
}: PaginationProps): JSX.Element {
  const dispatch = useAppDispatch();

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 1) {
      // тільки одна сторінка
      return [1];
    }

    // Перша сторінка завжди
    pages.push(1);

    if (totalPages < 5) {
      // Якщо сторінок мало, показуємо всі
      for (let i = 2; i <= totalPages; i++) pages.push(i);
    } else {
      // Якщо поточна сторінка близько до початку
      if (page <= 2) {
        pages.push(2, "...");
      }
      // // Якщо поточна сторінка посередині
      else if (page > 2 && page < totalPages - 2) {
        pages.push(page, "...");
      }
      // Якщо поточна сторінка ближче до кінця
      else {
        pages.push(totalPages - 1, "...");
      }

      // Остання сторінка завжди
      pages.push(totalPages);
    }

    return pages;
  };
  const pages = getPageNumbers();
  return (
    <div className={css.container_pagination}>
      <button
        className={page === 1 ? css.disabled : css.normal}
        disabled={page === 1}
        onClick={() => dispatch(setPage(1))}
      >
        {"<<"}
      </button>
      <button
        className={page === 1 ? css.disabled : css.normal}
        disabled={page === 1}
        onClick={() => dispatch(setPage(page - 1))}
      >
        {"<"}
      </button>

      {pages.map((p, idx) =>
        typeof p === "number" ? (
          <button
            key={idx}
            className={p === page ? css.active : css.normal}
            onClick={() => dispatch(setPage(p))}
          >
            {p}
          </button>
        ) : (
          <span key={idx} className={css.normal}>
            {p}
          </span>
        )
      )}

      <button
        className={page === totalPages ? css.disabled : css.normal}
        onClick={() => dispatch(setPage(page + 1))}
        disabled={page === totalPages}
      >
        {">"}
      </button>
      <button
        className={page === totalPages ? css.disabled : css.normal}
        onClick={() => dispatch(setPage(totalPages))}
        disabled={page === totalPages}
      >
        {">>"}
      </button>
    </div>
  );
}
