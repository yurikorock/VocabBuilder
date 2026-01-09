import type { CellContext, ColumnDef } from "@tanstack/react-table";
import ProgressBar from "../ProgressBar/ProgressBar";
import type { Word } from "../../redux/words/types";
import css from "./WordsTable.module.css"
import ActionsBtn from "../ActionsBtn/ActionsBtn";


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
    cell: (context: CellContext<Word, unknown>) => {
      // row.original тепер правильно типізований
      const wordId = (context.row.original as Word & { _id?: string })._id ?? "";
      return <ActionsBtn wordId={wordId} />;
    },
  },
];
