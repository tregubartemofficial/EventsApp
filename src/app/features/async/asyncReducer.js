import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  initialized: false,
};

const asyncSlice = createSlice({
  name: "async",
  initialState,
  reducers: {
    asyncStart: (state) => {
        state.loading = true
        state.error = null
    },
    asyncFinish: (state) => state.loading = false,
    asyncError: (state, {payload}) => {
        state.loading = false
        state.error = payload
    },
    appLoaded: (state) => state.initialized = true
  },
});

export const { asyncStart, asyncFinish, asyncError, appLoaded} = asyncSlice.actions;
export default asyncSlice
