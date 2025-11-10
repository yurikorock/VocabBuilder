import { useEffect, useState, type JSX } from "react";
import css from "./DashBoard.module.css";

export default function DashBoard(): JSX.Element {
  const [filter, setFilter] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      const trimmed = filter.trim();
      if (trimmed !== "") {
        setDebouncedFilter(trimmed);
      } else {
        setDebouncedFilter("");
      }
    }, 1000);
    return () => clearTimeout(handler);
  }, [filter]);

  // Тут треба зробити запит або фільтрацію за debouncedFilter
  useEffect(() => {
    if (debouncedFilter) {
      console.log("Запит за:", debouncedFilter);
    }
  }, [debouncedFilter]);

  return (
    <div className={css.container}>
      <input
        placeholder="Find the word"
        type="search"
        name="filterwords"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
}
