import { configureStore } from "@reduxjs/toolkit";
import { eventSlice } from "./features/event/eventReducer";

export default configureStore({
  reducer: {
    events: eventSlice.reducer,
  },
});
