import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../auth/authSlice";

export type ProfileState = {
  error: boolean;
  createdAt: number;
  displayName: string;
  email: string;
  uid: string;
  photoURL?: string;
  followerUIDs?: string[];
  followingUIDs?: string[];
};

const initialState: ProfileState = {
  error: false,
  createdAt: new Date().getTime(),
  displayName: "",
  email: "",
  uid: "",
  photoURL: "",
  followerUIDs: [],
  followingUIDs: [],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, { payload }: PayloadAction<User>) => {
      state.uid = payload.uid!;
      state.createdAt = payload.createdAt!;
      state.displayName = payload.displayName!;
      state.email = payload.email!;
      state.photoURL = payload.photoURL!;
      state.error = false;
      state.followerUIDs = payload.followerUIDs!;
      state.followingUIDs = payload.followingUIDs!;
    },
    setNoProfile: (state) => {
      state.error = true;
    },
    setFollowers: (state, { payload }: PayloadAction<string[]>) => {
      state.followerUIDs = payload;
    }
  },
});

export const { setProfile, setNoProfile, setFollowers } = profileSlice.actions;
export default profileSlice;
