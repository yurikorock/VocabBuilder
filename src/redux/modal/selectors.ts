import type { RootState } from "../store";


export const selectIsModalOpen = (state: RootState) => state.modal.isOpen;
export const selectModalType = (state: RootState) => state.modal.type;





