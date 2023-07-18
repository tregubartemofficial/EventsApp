import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import eventSlice from "./app/features/event/eventReducer";
import modalSlice from "./app/features/modal/modalReducer";
import authSlice from "./app/features/auth/authReducer";
import profileSlice from "./app/features/profile/profileReducer";

const persistConfig = {
  key: "root",
  storage,
};

const authPersistConfig = {
  key: "auth",
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, eventSlice.reducer);
const persistedAuthReducer = persistReducer(authPersistConfig, authSlice.reducer);

export const store = configureStore({
  reducer: {
    events: persistedReducer,
    auth: persistedAuthReducer,
    modals: modalSlice.reducer,
    profile: profileSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);