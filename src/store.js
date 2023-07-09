import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import eventSlice from "./app/features/event/eventReducer";
import modalSlice from "./app/features/modal/modalReducer";
import asyncSlice from "./app/features/async/asyncReducer";
import authSlice from "./app/features/auth/authReducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, eventSlice.reducer);

export const store = configureStore({
  reducer: {
    events: persistedReducer,
    modals: modalSlice.reducer,
    async: asyncSlice.reducer,
    auth: authSlice.reducer,
  },
});

export const persistor = persistStore(store);