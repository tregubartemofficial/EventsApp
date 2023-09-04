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
import eventSlice from "./app/features/event/eventSlice";
import modalSlice from "./app/features/modal/modalSlice";
import authSlice from "./app/features/auth/authSlice";
import profileSlice from "./app/features/profile/profileSlice";

const eventPersistConfig = {
  key: "event",
  storage,
};

const authPersistConfig = {
  key: "auth",
  storage: storage,
};

const persistedEventReducer = persistReducer(eventPersistConfig, eventSlice.reducer);
const persistedAuthReducer = persistReducer(authPersistConfig, authSlice.reducer);

export const store = configureStore({
  reducer: {
    events: persistedEventReducer,
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

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch