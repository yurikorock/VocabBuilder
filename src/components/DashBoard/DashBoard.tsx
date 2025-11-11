import { useEffect, useState, type JSX } from "react";
import Select from "react-select";
import css from "./DashBoard.module.css";

const options = [
  { value: "verb", label: "Verb" },
  { value: "participle", label: "Participle" },
  { value: "noun", label: "Noun" },
  { value: "adjective", label: "Adjective" },
  { value: "pronoun", label: "Pronoun" },
  { value: "numerals", label: "Numerals" },
  { value: "adverb", label: "Adverb" },
  { value: "preposition", label: "Preposition" },
  { value: "conjuction", label: "Conjuction" },
  { value: "phrasal verb", label: "Phrasal verb" },
  { value: "functional phrase", label: "Functional phrase" },
];

export default function DashBoard(): JSX.Element {
  const [filter, setFilter] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<{
    value: string;
    label: string;
  } | null>(null);

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

  return (
    <div className={css.container}>
      <input
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
