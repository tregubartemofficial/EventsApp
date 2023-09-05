import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ProfileState = {
  error: boolean;
  createdAt: number;
  displayName: string;
  email: string;
  uid: string;
  photoURL?: string;
  followers?: string;
  following?: string;
};

const initialState: ProfileState = {
  error: false,
  createdAt: new Date().getTime(),
  displayName: "",
  email: "",
  uid: "",
  photoURL: "",
  followers: '',
  following: '',
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, { payload }: PayloadAction<ProfileState>) => {
      state.uid = payload.uid;
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
