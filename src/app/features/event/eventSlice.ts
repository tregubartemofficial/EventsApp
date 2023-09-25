import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Event = {
  uid: string;
  id: string; // firestore id
  title: string;
  date: number;
  category: string;
  description: string;
  venue: {
    address: string;
    id: string;
    name?: string;
    latLon?: {
      lat: number;
      lon: number;
    };
  };
  hostedBy: string;
  hostPhotoURL: string;
  attendees: Array<{
    uid: string;
    name: string;
    photoURL: string;
  }>;
};

export type Filter = 'ALL' | 'GOING' | 'HOSTING';

type EventState = {
  events: Event[];
  filter: Filter;
  comments: any[];
};

const initialState: EventState = {
  events: [],
  filter: 'ALL',
  comments: [],
};

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    addEvent: (state, { payload }: PayloadAction<Event>) => {
      state.events.push(payload);
    },
    updateEvent: (state, { payload }: PayloadAction<Event>) => {
      state.events = [
        ...state.events.filter((event) => event.uid !== payload.uid),
        payload,
      ];
    },
    deleteEvent: (state, { payload }: PayloadAction<string>) => {
      state.events = [...state.events.filter((event) => event.uid !== payload)];
    },
    fetchEvent: (state, { payload }: PayloadAction<Event[]>) => {
      if (Array.isArray(payload)) {
        state.events = payload;
      } else {
        state.events = [payload];
      }
    },
    setFilter: (state, { payload }: PayloadAction<Filter>) => {
      state.filter = payload;
    },
    setEventComments: (state, { payload }: PayloadAction<any[]>) => {
      state.comments = payload;
    },
  },
});

export const {
  addEvent,
  updateEvent,
  deleteEvent,
  fetchEvent,
  setFilter,
  setEventComments,
} = eventSlice.actions;
export default eventSlice;
