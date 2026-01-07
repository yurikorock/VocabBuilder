import type { JSX } from "react";
import { useForm } from "react-hook-form";
import css from "./EditWordModal.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  ukrainian: yup
    .string()
    .matches(/^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u, "Invalid text format")
    .required("Text is required"),
  english: yup
    .string()
    .matches(/\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/, "Invalid text format")
    .required("Text is required"),
  category: yup.string().required("Category is required"),
});

type FormData = yup.InferType<typeof schema>;

interface MenuModalProps {
  onClose: () => void;
}

export default function EditWordModal({
  onClose,
}: MenuModalProps): JSX.Element {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const watchUkrainian = watch("ukrainian");
  const watchEnglish = watch("english");

  const onSubmit = (data: FormData) => {
    const payload: Record<string, any> = {
      ua: data.ukrainian,
      en: data.english,
      category: data.category,
    };

    console.log(payload);
  };

  return (
    <div className={css.editwords_modal_container}>
      <button type="button" className={css.close_btn} onClick={onClose}>
        <svg className={css.close_icon} width="32" height="22">
          <use href="/sprite.svg#icon-close"></use>
        </svg>
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* *** BLOCK INPUT *** */}
        <div className={css.input_block}>
          <div className={css.input_wrap}>
            <div className={css.input_title}>
              <svg className={css.icon} width="28" height="28">
                <use href="/sprite.svg#icon-ukraine"></use>
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
                <use href="/sprite.svg#icon-united-kingdom"></use>
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
          <button type="submit" className={css.btn_add}>
            Save
          </button>
          <button type="button" className={css.btn_cnsl} onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
