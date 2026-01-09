import type { JSX } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  selectIsModalOpen,
  selectModalType,
} from "../../redux/modal/selectors";
import { closeModal } from "../../redux/modal/modalSlice";
import MenuModal from "../MenuModal/MenuModal";
import Modal from "../Modal/Modal";
import AddWordModal from "../AddWordModal/AddWordModal";
import EditWordModal from "../EditWordModal/EditWordModal";
import { selectModalWordId } from "../../redux/words/selectors";

export default function ModalContainer(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsModalOpen);
  const modalType = useAppSelector(selectModalType);
  const wordId = useAppSelector(selectModalWordId);

  if (!isOpen) return null;

  const handleClose = () => dispatch(closeModal());
  return (
    <Modal onClose={handleClose}>
      {modalType === "menu" && <MenuModal onClose={handleClose} />}
      {modalType === "addWord" && <AddWordModal onClose={handleClose} />}
      {modalType === "editWord" && wordId && (
        <EditWordModal onClose={handleClose} wordId={wordId} />
      )}
    </Modal>
  );
}
