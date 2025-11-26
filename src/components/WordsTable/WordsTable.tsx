import { useMemo, type JSX } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { columnDef } from "./columns.ts";

import css from "./WordsTable.module.css";
import { useAppSelector } from "../../redux/store.ts";
import {
  selectWords,
  selectWordsLoading,
  selectWordsPage,
  selectWordsTotalPage,
} from "../../redux/words/selectors.ts";

import WordsPagination from "../WordsPagination/WordsPagination.tsx";

export default function WordsTable(): JSX.Element {
  const words = useAppSelector(selectWords);
  const isLoading = useAppSelector(selectWordsLoading);

  //   console.log("WORDS FROM BACKEND:", words);
  const data = useMemo(() => words, [words]);
  const page = useAppSelector(selectWordsPage);
  const totalPages = useAppSelector(selectWordsTotalPage);
  const table = useReactTable({
    columns: columnDef,
    data,
    getCoreRowModel: getCoreRowModel(),
    
    columnResizeMode: "onChange",
    
    
  });

  return (
    <div className={css.container_word_table}>
      {isLoading && <p>Loading...</p>}
      <table className={css.table}>
        <thead className={css.thead}>
          {/* // name of columns header // */}
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className={css.table_row}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={css.th} style={{ width: header.getSize() }}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        {/* // rows create // */}
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={css.table_row_cell}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={css.td} style={{ width: cell.column.getSize() }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <WordsPagination page={page} totalPages={totalPages} />
    </div>
  );
}
