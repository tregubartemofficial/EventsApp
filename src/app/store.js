import { configureStore } from "@reduxjs/toolkit";
import eventSlice from "./features/event/eventReducer";
import modalSlice from "./features/modal/modalReducer";

export default configureStore({
  reducer: {
    events: eventSlice.reducer,
    modals: modalSlice.reducer,
  },
});
