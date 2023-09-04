import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  email: string;
  photoURL: string | null;
  uid: string;
  displayName: string;
  bio?: string;
}

type AuthState = {
  isAuth: boolean;
  currUser: User | null;
  prevLocation: string | null;
  currLocation: string | null;
}

const initialState: AuthState = {
  isAuth: false,
  currUser: null,
  prevLocation: null,
  currLocation: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<User>) => {
      state.isAuth = true;
      state.currUser = {
        email: action.payload.email,
        photoURL: action.payload.photoURL,
        uid: action.payload.uid,
        displayName: action.payload.displayName,
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
