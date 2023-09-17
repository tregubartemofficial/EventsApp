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
  followerProfiles?: User[];
  followingProfiles?: User[];
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
  followerProfiles: [],
  followingProfiles: [],
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
    },
    setFollowerProfiles: (state, { payload }: PayloadAction<User[]>) => {
      state.followerProfiles = payload;
    },
    setFollowingProfiles: (state, { payload }: PayloadAction<User[]>) => {
      state.followingProfiles = payload;
    }
  },
});

export const {
  setProfile,
  setNoProfile,
  setFollowers,
  setFollowerProfiles,
  setFollowingProfiles,
} = profileSlice.actions;
export default profileSlice;
