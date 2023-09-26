import React from "react";
import { List } from "@mui/material";
import { Event, fetchEvent } from "../../app/features/event/eventSlice";
import { listenToEventsFromFirestore } from "../../app/firebase/firebaseService";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import EventSkeleton from "./EventSkeleton";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import EventListItem from "../../ui/listItems/EventListItem";

const ListItems = () => {
  const dispatch = useAppDispatch();
  const eventState = useAppSelector((state) => state.events);

  useFirestoreCollection({
    query: () => listenToEventsFromFirestore(eventState.filter),
    data: (events: Event[]) => dispatch(fetchEvent(events)),
    deps: [dispatch, eventState.filter],
  });

  return (
    <>
      {eventState.events.length === 0 ? (
        <EventSkeleton />
      ) : (
        <List sx={{ width: "100%", maxWidth: 500 }}>
          {eventState.events.map((event) => {
            return <EventListItem event={event} key={event.id} />;
          })}
        </List>
      )}
    </>
  );
};

export default ListItems;
