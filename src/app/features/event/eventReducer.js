import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [
    {
      id: "",
      title: "",
      date: "",
      category: "",
      description: "",
      city: {
        address: "",
        latLng: {
          lat: 40.7484405,
          lng: -73.98566440000002,
        },
      },
      venue: {
        address: "",
        latLng: {
          lat: 40.7484405,
          lng: -73.98566440000002,
        },
      },
      hostedBy: "",
      hostPhotoURL: "",
      attendees: [
        {
          id: "",
          name: "",
          photoURL: "",
        },
      ],
    },
  ],
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    addEvent: (state, { payload }) => {
      state.events.push(payload);
    },
    updateEvent: (state, { payload }) => {
      state.events = [
        ...state.events.filter((evt) => evt.id !== payload.id),
        payload,
      ];
    },
    deleteEvent: (state, { payload }) => {
      state.events = [...state.events.filter((evt) => evt.id !== payload)];
    },
    fetchEvent: (state, {payload}) => {
      state.events = payload
    }
  },
});

export const { addEvent, updateEvent, deleteEvent, fetchEvent} = eventSlice.actions;
export default eventSlice;
