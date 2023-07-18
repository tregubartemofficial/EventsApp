import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  currUser: null,
  prevLocation: null,
  currLocation: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
      signIn: (state, {payload}) => {
        state.isAuth = true
        state.currUser = {
          email: payload?.email,
          photoURL: payload?.photoURL,
          uid: payload?.uid,
          displayName: payload?.displayName,
          // providerId: payload.providedData[0].providerId, IDK
        };
      },
    signOut: (state) => {
      state.isAuth = false
      state.currUser = null
    },
    updateAvatarPhoto: (state, {payload}) => {
      state.currUser.photoURL = payload.photoURL
    },
    locationChange: (state, {payload}) => {
      state.prevLocation = state.currLocation
      state.currLocation = payload.location
    }
  },
});

export const { signIn, signOut, updateAvatarPhoto } = authSlice.actions;
export default authSlice;
