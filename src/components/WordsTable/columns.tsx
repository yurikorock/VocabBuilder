import type { ColumnDef } from "@tanstack/react-table";
import ProgressBar from "../ProgressBar/ProgressBar";
import type { Word } from "../../redux/words/types";
import css from "./WordsTable.module.css"


export const columns: ColumnDef<Word>[] = [
  {
    accessorKey: "en",
    header: "Word",
    size: 82,
  },
  {
    accessorKey: "ua",
    header: "Translation",
    size: 116,
  },
  {
  accessorKey: "progress",
  header: "Progress",
  size: 95,
  cell: ({ getValue }) => {
    const value = getValue<number | undefined>();
    return (
      <div className={css.progress_cell}>
        <ProgressBar value={value ?? 0} />
      </div>
    );
  },
},
  {
    id: "actions",
    header: "",
    size: 50,
    cell: () => "...",
  },
];
