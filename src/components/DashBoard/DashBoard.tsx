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

  // Simple pagination state (optional)
  const [page, setPage] = useState(1);
  const [limit] = useState(7); // to match your swagger example

  //Categories Redux
  const categories = useAppSelector(selectCategories);

  // Отримуємо категорії з бекенда при першому рендері

  useEffect(() => {
    dispatch(fetchWordsCategories());
  }, [dispatch]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedFilter(filter.trim()), 300);
    return () => clearTimeout(t);
  }, [filter]);

  // Reset page on any filter change
  useEffect(() => {
    setPage(1);
  }, [debouncedFilter, selectedCategory, verbType]);

  useEffect(() => {
    // Build safe params for thunk
    const _category = selectedCategory?.value || "all";
    const _verbType =
      _category === "verb"
        ? ((verbType || null) as "regular" | "irregular" | null)
        : null;

    // Keyword must be passed as 'keyword'
    const _keyword = debouncedFilter || "";

    dispatch(resetWords());
    dispatch(
      getWordsAll({
        category: _category,
        verbType: _verbType,
        keyword: _keyword, 
        page,
        limit,
      })
    );
  }, [debouncedFilter, selectedCategory, verbType, page, limit, dispatch]);

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
        onChange={(option) => {
          setSelectedCategory(option);
          const v = (option as { value: string } | null)?.value ?? "";
          if (v !== "verb") setVerbType(""); //reset to empty when not verb
        }}
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
