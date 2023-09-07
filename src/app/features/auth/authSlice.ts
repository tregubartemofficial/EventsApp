import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  email?: string;
  photoURL?: string | null;
  uid?: string;
  displayName?: string;
  bio?: string;
  createdAt?: number;
  followers?: string;
  following?: string;
};

type AuthState = {
  isAuth: boolean;
  currUser: User | null;
  prevLocation: string;
  currLocation: string;
}

const initialState: AuthState = {
  isAuth: false,
  currUser: null,
  prevLocation: '',
  currLocation: '',
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, {payload}: PayloadAction<User>) => {
      state.isAuth = true;
      state.currUser = {
        email: payload.email,
        photoURL: payload.photoURL,
        uid: payload.uid,
        displayName: payload.displayName,
      };
    },
    signOut: (state) => {
      state.isAuth = false;
      state.currUser = null;
    },
    updateAvatarPhoto: (state, action: PayloadAction<{ photoURL: string }>) => {
      if (state.currUser) {
        state.currUser.photoURL = action.payload.photoURL;
      }
    },
    locationChange: (state, action: PayloadAction<{ location: string }>) => {
      state.prevLocation = state.currLocation;
      state.currLocation = action.payload.location;
    },
  },
});

export const { signIn, signOut, updateAvatarPhoto } = authSlice.actions;
export default authSlice;
