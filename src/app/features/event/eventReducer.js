import { createSlice } from "@reduxjs/toolkit";
import { events as sampleData } from "../../../sampleData";

const initialState = {
  events: sampleData,
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, { payload }) => {
      state.events = [
        ...state.events.filter((evt) => evt.id !== payload.id),
        payload,
      ];
    },
    deleteEvent: (state, { payload }) => {
      state.events = [
        ...state.events.filter((evt) => evt.id !== payload)];
    },
  },
});

export const { addEvent, updateEvent, deleteEvent } = eventSlice.actions;
export default eventSlice;
