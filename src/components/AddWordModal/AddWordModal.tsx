import { useEffect, useState, type JSX } from "react";
import Select from "react-select";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectCategories } from "../../redux/words/selectors";
import { fetchWordsCategories } from "../../redux/words/operation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import css from "./AddWordModal.module.css";

const schema = yup.object({
  ukrainian: yup
    .string()
    .matches(/^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u, "Invalid text format")
    .required("Text is required"),
  english: yup
    .string()
    .matches(/\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/, "Invalid text format")
    .required("Text is required"),
});

interface FormData {
  ukrainian: string;
  english: string;
}

export default function AddWordModal(): JSX.Element {
  const dispath = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const watchUkrainian = watch("ukrainian");
  const watchEnglish = watch("english");

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

  const onSubmit = (data: FormData) => {
    console.log("Form OK", data);
  };

  return (
    <div className={css.addwords_modal_container}>
      <div className={css.title_wrap}>
        <h3 className={css.title}>Add word</h3>
        <p className={css.descr}>
          Adding a new word to the dictionary is an important step in enriching
          the language base and expanding the vocabulary.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Select
          options={options}
          placeholder="Categories"
          name="categories"
          unstyled //обнулили стилі
          isSearchable={false} // вимикаємо інпут повністю
          value={selectedCategory}
          // onChange={(opt) => dispatch(setLevel(opt?.value || ""))}
          onChange={(option) => setSelectedCategory(option)}
          classNamePrefix="custom-sel"
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
        {/* *** BLOCK INPUT *** */}
        <div className={css.input_block}>
          <div className={css.input_wrap}>
            <div className={css.input_title}>
              <svg className={css.icon} width="28" height="28">
                <use href="/public/sprite.svg#icon-ukraine"></use>
              </svg>
              <p>Ukrainian</p>
            </div>
            <input
              type="text"
              {...register("ukrainian")}
              placeholder="enter text"
              className={`${css.input_form} ${
                errors.ukrainian ? css.error : ""
              } ${!errors.ukrainian && watchUkrainian ? css.correct : ""}  `}
            />
            {errors.ukrainian && <p>{errors.ukrainian.message}</p>}
             <div className={css.input_title}>
              <svg className={css.icon} width="28" height="28">
                <use href="/public/sprite.svg#icon-united-kingdom"></use>
              </svg>
              <p>English</p>
            </div>
            <input
              type="text"
              {...register("english")}
              placeholder="enter text"
              className={`${css.input_form} ${
                errors.english ? css.error : ""
              } ${!errors.english && watchEnglish ? css.correct : ""}  `}
            />
            {errors.english && <p>{errors.english.message}</p>}
          </div>
        </div>
        {/* *** BLOCK BUTTONS *** */}
        <div className={css.block_buttons}>
          <button type="submit" className={css.btn_add}>Add</button>
          <button type="button" className={css.btn_cnsl}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
