import { useMemo, type JSX } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { columnDef } from "./columns.ts";

import css from "./WordsTable.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/store.ts";
import {
  selectWords,
  selectWordsLoading,
  selectWordsPage,
  selectWordsTotalPage,
} from "../../redux/words/selectors.ts";
import { setPage } from "../../redux/words/wordsSlice.ts";

export default function WordsTable(): JSX.Element {
  const dispatch = useAppDispatch();

  const words = useAppSelector(selectWords);
  const isLoading = useAppSelector(selectWordsLoading);
  const data = useMemo(() => words, [words]);
  const page = useAppSelector(selectWordsPage);
  const totalPage = useAppSelector(selectWordsTotalPage);
  const table = useReactTable({
    columns: columnDef,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={css.container_word_table}>
      {isLoading && <p>Loading...</p>}
      <table>
        <thead>
          {/* // name of columns header // */}
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
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
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button disabled={page === 1} onClick={() => dispatch(setPage(page - 1))}>
        First page
      </button>
      <button
        disabled={page === totalPage}
        onClick={() => dispatch(setPage(page + 1))}
      >
        Next
      </button>
    </div>
  );
}
