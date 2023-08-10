import React from "react";
import EventDetailedHeader from "../eventDetailed/EventDetailedHeader";
import EventDetailedChat from "../eventDetailed/EventDetailedChat";
import EventDetailedInfo from "../eventDetailed/EventDetailedInfo";
import EventDetailedSideBar from "../eventDetailed/EventDetailedSideBar";
import { CircularProgress, Stack } from "@mui/material";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useFirestoreDoc } from "../../hooks/useFirestoreDoc";
import { fetchEvent } from "../../app/features/event/eventReducer";
import { listenToEventFromFirestore } from "../../app/firebase/firebaseService";

const EventDetailed = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useFirestoreDoc({
    query: () => listenToEventFromFirestore(id),
    data: (event) => {
      dispatch(fetchEvent(event))
    },
    deps: id,
  });

  const event = useSelector((state) =>
    state.events.events
  );

  if (!event.title) return <CircularProgress />

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
