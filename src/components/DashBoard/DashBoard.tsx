import { useEffect, useState, type JSX } from "react";
import Select from "react-select";
import css from "./DashBoard.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectCategories } from "../../redux/words/selectors";
import { fetchWordsCategories, getWordsAll } from "../../redux/words/operation";
import { Link } from "react-router-dom";
import { openModal } from "../../redux/modal/modalSlice";
import WordsTable from "../WordsTable/WordsTable";
import { resetWords } from "../../redux/words/wordsSlice";

export default function DashBoard(): JSX.Element {
  const dispatch = useAppDispatch();
  const openAddWord = () => dispatch(openModal({ type: "addWord" }));

  const [filter, setFilter] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [verbType, setVerbType] = useState<"regular" | "irregular" | "">("");

  //Categories Redux
  const categories = useAppSelector(selectCategories);

  // Отримуємо категорії з бекенда при першому рендері

  useEffect(() => {
    dispatch(fetchWordsCategories());
  }, [dispatch]);

  // Дебаунс фільтра
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

  // Тут треба зробити запит
  useEffect(() => {
    if (!debouncedFilter && !selectedCategory && !verbType) return;
    const params = {
      category: selectedCategory?.value || "all",
      verbType: selectedCategory?.value === "verb" ? verbType : null,
      search: debouncedFilter,
    };
    console.log("Query params", params);

    dispatch(resetWords());
    dispatch(getWordsAll(params));
  }, [debouncedFilter, selectedCategory, verbType]);
  //перетворюємо масив  у потрібний для react-select формат.
  const options = categories?.map((cat: string) => ({
    value: cat,
    label: cat[0].toUpperCase() + cat.slice(1),
  }));

  const whatIsCategorySelected = selectedCategory?.value;

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

      <div
        className={css.block_radio_verbs}
        style={{
          visibility: whatIsCategorySelected === "verb" ? "visible" : "hidden",
        }}
      >
        <label className={css.checkbox_label}>
          <input
            type="radio"
            name="verbType"
            value="regular"
            onChange={() => setVerbType("regular")}
            className={css.checkbox_verbs}
          />
          Regular
        </label>
        <label className={css.checkbox_label}>
          <input
            type="radio"
            name="verbType"
            value="irregular"
            onChange={() => setVerbType("irregular")}
            className={css.checkbox_verbs}
          />
          Irregular
        </label>
      </div>

      <div className={css.statistics}>
        <h4 className={css.stat_title}>To study:</h4>
        <p className={css.stat_number}>NN</p>
      </div>
      <div className={css.block_add_word}>
        <button
          type="button"
          className={css.btn_add_word}
          onClick={openAddWord}
        >
          Add word
          <svg className={css.icon} width="20" height="20">
            <use href="/sprite.svg#icon-plus"></use>
          </svg>
        </button>
        <Link to="/training" className={css.nav_link}>
          <span>Train oneself</span>
          <svg className={css.icon} width="20" height="20">
            <use href="/sprite.svg#icon-arrow-right"></use>
          </svg>
        </Link>
      </div>
      <WordsTable />
    </div>
  );
}
