import React, { useState } from "react";
import {
  List,
  ListItemButton,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { ProfileState } from "../../app/features/profile/profileSlice";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { listenToEventsFromFirestore } from "../../app/firebase/firebaseService";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Event, fetchEvent } from "../../app/features/event/eventSlice";
import EventCard from "../../ui/cards/EventCard";

type ProfileContentProps = { profile: ProfileState };

const ProfileContent = ({ profile }: ProfileContentProps) => {
  const dispatch = useAppDispatch();
  const eventState = useAppSelector((state) => state.events);
  const [showEvents, setShowEvents] = useState(true);

  const handleItemClick = () => {
    setShowEvents(!showEvents);
  };

  useFirestoreCollection({
    query: () => listenToEventsFromFirestore("GOING", profile.uid),
    data: (events: Event[]) => dispatch(fetchEvent(events)),
    deps: [dispatch, profile.uid],
  });

  return (
    <List>
      <ListItemButton
        component="li"
        onClick={handleItemClick}
        sx={{ bgcolor: grey[900], justifyContent: "space-between" }}
      >
        Participating events
        {showEvents ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse component="li" in={showEvents} timeout="auto">
        {eventState.events.map((event) => {
          return <EventCard event={event} key={event.id} border={true}/>;
        })}
      </Collapse>
    </List>
  );
};

export default ProfileContent;
