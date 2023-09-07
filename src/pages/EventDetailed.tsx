import React from "react";
import EventDetailedHeader from "../components/eventDetailed/EventDetailedHeader";
import EventDetailedChat from "../components/eventDetailed/EventDetailedChat";
import EventDetailedInfo from "../components/eventDetailed/EventDetailedInfo";
import EventDetailedSideBar from "../components/eventDetailed/EventDetailedSideBar";
import { Stack } from "@mui/material";
import { useParams } from "react-router";
import { Event, fetchEvent } from "../app/features/event/eventSlice";
import { listenToEventFromFirestore } from "../app/firebase/firebaseService";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useFirestoreDoc } from "../hooks/useFirestoreDoc";
import EventSkeleton from "../components/eventList/EventSkeleton";

const EventDetailed = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [event] = useAppSelector((state) => state.events.events);

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(id as string),
    data: (event: Event[]) => dispatch(fetchEvent(event)),
    deps: id,
  });

  if (!event?.title) return <EventSkeleton detailed={true} />;

  return (
    <Stack
      marginTop={{ xs: 3, md: 4 }}
      marginBottom={{ xs: 2, md: 3 }}
      direction={{ xs: "column", md: "row" }}
      justifyContent="space-around"
      alignItems={{ xs: "flex-center", md: "flex-start" }}
      spacing={{ xs: 1, sm: 2 }}
    >
      <Stack direction="column" spacing={{ xs: 1, sm: 2, md: 3.5 }}>
        <EventDetailedHeader event={event} />
        <EventDetailedChat event={event} />
        <EventDetailedInfo event={event} />
      </Stack>
      <EventDetailedSideBar event={event} />
    </Stack>
  );
};

export default EventDetailed;
