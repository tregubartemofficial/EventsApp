import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Event = {
  id: string;
  title: string;
  date: number;
  category: string;
  description: string;
  city: {
    address: string;
    latLng: {
      lat: number;
      lng: number;
    };
  };
  venue: {
    address: string;
    latLng: {
      lat: number;
      lng: number;
    };
  };
  hostedBy: string;
  hostPhotoURL: string;
  attendees: Array<{
    uid: string;
    name: string;
    photoURL: string;
  }>;
}

type EventState = {
  events: Event[];
}

const initialState: EventState = {
  events: [
    {
      id: "",
      title: "",
      date: 4546452,
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
          uid: "",
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
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action: PayloadAction<Event>) => {
      state.events = [
        ...state.events.filter((event) => event.id !== action.payload.id),
        action.payload,
      ];
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = [
        ...state.events.filter((event) => event.id !== action.payload),
      ];
    },
    fetchEvent: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
    },
  },
});

export const { addEvent, updateEvent, deleteEvent, fetchEvent } =
  eventSlice.actions;
export default eventSlice;
