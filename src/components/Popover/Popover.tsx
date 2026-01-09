import type { JSX } from "react";
import css from "./Popover.module.css";
import { useAppDispatch } from "../../redux/store";
import { openModal } from "../../redux/modal/modalSlice";

interface PopoverProps {
  wordId: string;
}

export default function Popover({ wordId }: PopoverProps): JSX.Element {
  const dispatch = useAppDispatch();
  const openEditWordModal = () => dispatch(openModal({type: "editWord", wordId}));


  return (
    <div className={css.container_popover}>
      <div className={css.block}>
        <button className={css.btn} onClick={openEditWordModal}>
          <svg className={css.icon} width="16" height="16">
            <use href="/sprite.svg#icon-pencil"></use>
          </svg>
          Edit
        </button>
      </div>
       <div className={css.block}>
        <button className={css.btn}>
          <svg className={css.icon} width="16" height="16">
            <use href="/sprite.svg#icon-trash"></use>
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
}
