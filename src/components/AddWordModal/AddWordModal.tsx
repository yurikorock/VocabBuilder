import { useEffect, useState, type JSX } from "react";
import Select from "react-select";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectCategories } from "../../redux/words/selectors";
import { fetchWordsCategories } from "../../redux/words/operation";

import css from "./AddWordModal.module.css";

export default function AddWordModal(): JSX.Element {
  const dispath = useAppDispatch();
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

   //перетворюємо масив  у потрібний для react-select формат.
  const options = categories?.map((cat: string) => ({
    value: cat,
    label: cat[0].toUpperCase() + cat.slice(1),
  }));

  const whatIsCategorySelected = selectedCategory?.value;

  return (
    <div className={css.addwords_modal_container}>
      <div className={css.title_wrap}>
        <h3 className={css.title}>Add word</h3>
        <p className={css.descr}>
          Adding a new word to the dictionary is an important step in enriching
          the language base and expanding the vocabulary.
        </p>
      </div>
      <form>
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
            visibility:
              whatIsCategorySelected === "verb" ? "visible" : "hidden",
          }}
        >
          <label className={css.checkbox_label}>
            <input
              type="radio"
              name="verbType"
              className={css.checkbox_verbs}
            />
            Regular
          </label>
          <label className={css.checkbox_label}>
            <input
              type="radio"
              name="verbType"
              className={css.checkbox_verbs}
            />
            Irregular
          </label>
        </div>
      </form>
    </div>
  );
}
