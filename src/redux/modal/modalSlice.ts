import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ModalType = "menu" |  "addWord" | "editWord" | null;

interface ModalState {
  isOpen: boolean;
  type: ModalType;
}
const initialState: ModalState = {
  isOpen: false,
  type:null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{type?: Exclude<ModalType, null>} | undefined>) => {
      state.isOpen = true;
      state.type = action.payload?.type ?? null;
    },
    closeModal: (state)=>{
        state.isOpen = false;
        state.type = null;
    }
  },
});

export const {openModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer;