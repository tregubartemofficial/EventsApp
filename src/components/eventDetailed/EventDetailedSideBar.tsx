import React from "react";
import {
  Avatar,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Event } from "../../app/features/event/eventSlice";
import { grey } from "@mui/material/colors";

type EventDetailedSideBarProps = { event: Event };

const EventDetailedSideBar = ({ event }: EventDetailedSideBarProps) => {
  return (
    <Card>
      <List
        subheader={
          <ListSubheader
            sx={{ bgcolor: grey[900] }}
          >
            {event.attendees.length} People going
          </ListSubheader>
        }
        sx={{ minWidth: 360, bgcolor: grey[900] }}
      >
        {event.attendees.map((attendee) => {
          return (
            <ListItem key={attendee.uid} disablePadding>
              <ListItemButton component={Link} to={`/profile/${attendee.uid}`}>
                <ListItemAvatar>
                  <Avatar
                    alt={`${attendee.name}`}
                    src={`${attendee.photoURL}`}
                  />
                </ListItemAvatar>
                <ListItemText primary={`${attendee.name}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};

export default EventDetailedSideBar;
