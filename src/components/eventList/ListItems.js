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
} from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { events } from "../../sampleData";

const ListItems = () => {
  return (
    <List sx={{ width: "100%", maxWidth: 360 }}>
      {events.map((event) => (
        <ListItem
          alignItems="flex-start"
          sx={{ flexDirection: "column", bgcolor: "white", marginBottom: 1 }}
          key={event.id}
          divider={true}
        >
          <Stack
            direction="row"
            sx={{
              borderBottom: "0.2rem solid rgb(231, 234, 237)",
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
          <Stack direction="row">
            <AccessTimeIcon />
            <ListItemText primary={event.date.toLocaleDateString("de-DE")} />
            <LocationOnIcon />
            <ListItemText primary={event.city.address} />
          </Stack>
          <Stack
            direction="row"
            sx={{
              bgcolor: "rgb(231, 234, 237)",
              width: "100%",
              p: "1rem 0",
            }}
          >
            <AvatarGroup max={5}>
              {event.attendees.map((attender) => (
                <Avatar
                  alt={attender.name}
                  src={attender.photoURL}
                  key={attender.id}
                />
              ))}
            </AvatarGroup>
          </Stack>
          <Stack direction="row" alignItems="space-between" sx={{ w: "100%" }}>
            <ListItemText primary={event.description} />
            <Button variant="contained">View</Button>
          </Stack>
        </ListItem>
      ))}
    </List>
  );
};

export default ListItems;
