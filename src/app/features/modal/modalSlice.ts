import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ModalState = {
  editProfile: boolean;
  auth: boolean;
};

const initialState: ModalState = {
  editProfile: false,
  auth: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state, {payload}: PayloadAction<keyof ModalState>) => {
      state[payload] = !state[payload] as boolean;
    },
  },
});

export const { toggleModal } = modalSlice.actions;
export default modalSlice;
