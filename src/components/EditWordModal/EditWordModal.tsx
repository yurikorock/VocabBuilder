import type { JSX } from "react";
import css from "./EditWordModal.module.css";

interface MenuModalProps {
  onClose: () => void;
}

export default function EditWordModal({onClose}: MenuModalProps): JSX.Element {
  return (
    <div>
      <h2>EditWordModal Panel</h2>
    </div>
  );
}
