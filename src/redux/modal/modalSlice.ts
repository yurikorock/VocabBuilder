import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ModalType = "menu" |  "addWord" | "editWord" | null;

interface ModalState {
  isOpen: boolean;
  type: ModalType;
  wordId: string | null;
}

interface OpenModalPayload {
  type: Exclude<ModalType, null>;
  wordId?: string;
}
const initialState: ModalState = {
  isOpen: false,
  type:null,
  wordId: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<OpenModalPayload>) => {
      state.isOpen = true;
      state.type = action.payload?.type ?? null;
      state.wordId = action.payload.wordId || null;
    },
    closeModal: (state)=>{
        state.isOpen = false;
        state.type = null;
        state.wordId = null;
    }
  },
});

export const {openModal, closeModal} = modalSlice.actions;
export default modalSlice.reducer;