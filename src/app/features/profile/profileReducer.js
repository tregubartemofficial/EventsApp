import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  createdAt: null,
  displayName: "",
  email: "",
  photoURL: "",
  followers: '',
  following: '',
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, { payload }) => {
      state.createdAt = payload.createdAt;
      state.displayName = payload.displayName;
      state.email = payload.email;
      state.photoURL = payload.photoURL;
      state.error = false;
    },
    setNoProfile: (state) => {
      state.error = true;
    },
  },
});

export const { setProfile, setNoProfile } = profileSlice.actions;
export default profileSlice;
