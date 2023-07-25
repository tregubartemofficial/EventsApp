import React from "react";
import {
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Stack,
  Button,
  AvatarGroup,
  CircularProgress,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, fetchEvent } from "../../app/features/event/eventReducer";
import { listenToEventsFromFirestore } from "../../app/firebase/firebaseService";
import { useFirestoreCollection } from "../../hooks/useFirestoreCollection";
import { grey } from "@mui/material/colors";
import { motion } from "framer-motion";

const ListItems = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.events);

  useFirestoreCollection({
    query: () => listenToEventsFromFirestore(),
    data: (events) => dispatch(fetchEvent(events)),
    deps: dispatch,
  });

  if (!events[0]) {
    return <CircularProgress/>
  }
  
  return (
    <List sx={{ width: "100%", maxWidth: 500 }}>
      {events.map((event) => {
        const deserializedDate = new Date(event.date);
        return (
          <motion.div
            whileHover={{
              borderRadius: '10px',
              backgroundColor: grey[900],
              transition: { duration: 0.2 },
            }}
          >
            <ListItem
              sx={{ flexDirection: "column", marginBottom: 1}}
              key={event.id}
            >
              <Stack
                direction="row"
                sx={{
                  width: "100%",
                }}
              >
                <ListItemAvatar>
                  <Avatar alt={event.hostedBy} src={event.hostPhotoURL} />
                </ListItemAvatar>
                <ListItemText
                  primary={event.title}
                  secondary={`Hosted by ${event.hostedBy}`}
                />
              </Stack>
              <Stack direction="row" sx={{ width: "100%" }}>
                <AccessTimeIcon />
                <ListItemText
                  primary={deserializedDate.toLocaleDateString("de-DE")}
                />
                <LocationOnIcon />
                <ListItemText primary={event.venue.address} />
              </Stack>
              <Stack
                direction="row"
                sx={{
                  width: "100%",
                  p: "1rem 0",
                  bgcolor: grey[900],
                }}
              >
                <AvatarGroup sx={{ marginLeft: 2 }} max={5}>
                  {event.attendees.map((attender) => (
                    <Avatar
                      alt={attender.name}
                      src={attender.photoURL}
                      key={attender.id}
                    />
                  ))}
                </AvatarGroup>
              </Stack>
              <Stack
                flexDirection="row"
                justifyContent="start"
                sx={{ width: "100%" }}
              >
                <ListItemText primary={event.description} />
              </Stack>
              <Stack
                flexDirection="row"
                justifyContent="end"
                sx={{ width: "100%" }}
              >
                <Button
                  variant="contained"
                  sx={{ m: 1 }}
                  component={Link}
                  to={`/events/${event.id}`}
                >
                  View
                </Button>
                <Button
                  onClick={() => dispatch(deleteEvent(event.id))}
                  variant="contained"
                  color="error"
                  sx={{ m: 1 }}
                >
                  Delete
                </Button>
              </Stack>
            </ListItem>
          </motion.div>
        );
      })}
    </List>
  );
};

export default ListItems;
