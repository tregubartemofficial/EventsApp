import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: ({ payload }) => {
      const { modalType, modalProps } = payload;
      return { modalType, modalProps };
    },
    closeModal: () => false,
  },
});

export const {openModal, closeModal} = modalSlice.actions
export default modalSlice