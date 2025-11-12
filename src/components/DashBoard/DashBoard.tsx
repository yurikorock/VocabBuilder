import { useEffect, useState, type JSX } from "react";
import Select from "react-select";
import css from "./DashBoard.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectCategories } from "../../redux/words/selectors";
import { fetchWordsCategories } from "../../redux/words/operation";


export default function DashBoard(): JSX.Element {
  const dispath = useAppDispatch();

  const [filter, setFilter] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<{
    value: string;
    label: string;
  } | null>(null);

  //Categories Redux
  const categories = useAppSelector(selectCategories);

  // ✅ Отримуємо категорії з бекенда при першому рендері

  useEffect(() => {
    dispath(fetchWordsCategories());
  }, [dispath]);

  // ✅ Дебаунс фільтра
  useEffect(() => {
    const handler = setTimeout(() => {
      const trimmed = filter.trim();
      if (trimmed !== "") {
        setDebouncedFilter(trimmed);
      } else {
        setDebouncedFilter("");
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [filter]);

  // Тут треба зробити запит або фільтрацію за debouncedFilter
  useEffect(() => {
    if (debouncedFilter) {
      console.log("Запит за:", debouncedFilter);
    }
  }, [debouncedFilter]);
  //перетворюємо масив  у потрібний для react-select формат.
  const options = categories?.map((cat: string) => ({
    value: cat,
    label: cat[0].toUpperCase() + cat.slice(1),
  }));

  return (
    <div className={css.container}>
      <input
      className={css.filter_words}
        placeholder="Find the word"
        type="search"
        name="filterwords"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <Select
        options={options}
        placeholder="Categories"
        name="categories"
        unstyled //обнулили стилі
        isSearchable={false} // вимикаємо інпут повністю
        value={selectedCategory}
        // onChange={(opt) => dispatch(setLevel(opt?.value || ""))}
        onChange={(option) => setSelectedCategory(option)}
        classNamePrefix="custom-select"
      />
    </div>
  );
}
