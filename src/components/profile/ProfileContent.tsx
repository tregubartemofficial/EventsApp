import React, { useState } from "react";
import {
  List,
  ListItemButton,
  Collapse,
  ListItem,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { ProfileState } from "../../app/features/profile/profileSlice";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { listenToEventsFromFirestore } from "../../app/firebase/firebaseService";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Event, fetchEvent } from "../../app/features/event/eventSlice";
import EventListItem from "../../ui/cards/EventListItem";
import { motion } from "framer-motion";

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
        component={ListItem}
        onClick={handleItemClick}
        sx={{ bgcolor: grey[900], justifyContent: "space-between" }}
      >
        Participating events
        {showEvents ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse component={ListItem} in={showEvents} timeout="auto">
        {eventState.events.length === 0 ? (
          <Typography textAlign="center" variant="h5">
            No events
          </Typography>
        ) : (
          eventState.events.map((event) => {
            return (
              <motion.section
                whileHover={{
                  backgroundColor: grey[900],
                  transition: { duration: 0.2 },
                }}
                key={event.id}
              >
                <EventListItem event={event} isProfile={true} />
              </motion.section>
            );
          })
        )}
      </Collapse>
    </List>
  );
};

export default ProfileContent;
