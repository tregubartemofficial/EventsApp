import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal1: false,
  auth: false
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal : (state, {payload}) => {
      state[payload] = !state[payload];
    }
  },
});

export const { toggleModal } = modalSlice.actions;
export default modalSlice;
