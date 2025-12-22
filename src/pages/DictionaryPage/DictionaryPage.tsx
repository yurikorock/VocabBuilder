import DashBoard from "../../components/DashBoard/DashBoard";
import css from "./DictionaryPage.module.css";

export default function DictionaryPage() {
  return (
    <div className={css.dictionary_container}>
      <DashBoard />
    </div>
  );
}
