import React from "react";
import { List } from "@mui/material";
import { Event, fetchEvent } from "../../app/features/event/eventSlice";
import { listenToEventsFromFirestore } from "../../app/firebase/firebaseService";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import { grey } from "@mui/material/colors";
import { motion } from "framer-motion";
import EventSkeleton from "./EventSkeleton";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import EventCard from "../../ui/cards/EventCard";

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
            return (
              <motion.li
                whileHover={{
                  borderRadius: "10px",
                  backgroundColor: grey[900],
                  transition: { duration: 0.2 },
                }}
                key={event.id}
              >
                <EventCard event={event} />
              </motion.li>
            );
          })}
        </List>
      )}
    </>
  );
};

export default ListItems;
