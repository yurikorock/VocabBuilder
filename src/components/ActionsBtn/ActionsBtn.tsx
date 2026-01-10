import { useState } from "react";
import Popover from "../Popover/Popover";

import css from "./ActionsBtn.module.css"

export default function ActionsBtn({ wordId }: { wordId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const togglePopover = () => {
    setIsOpen((prev) => !prev);
    
  };

  return (
    <div className={css.wrapper}>
      <button type="button" onClick={togglePopover} className={css.btn}>
        ...
      </button>
      {isOpen && <Popover wordId={wordId} onClose={() => setIsOpen(false)}/>}
    </div>
  );
}
