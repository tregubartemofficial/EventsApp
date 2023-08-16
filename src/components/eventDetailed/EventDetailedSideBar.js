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
import React from "react";
import { Link } from "react-router-dom";

const EventDetailedSideBar = ({event}) => {
  return (
    <Card>
      <List
        subheader={
          <ListSubheader component="h6" id="subheader">
            {event.attendees.length} People going
          </ListSubheader>
        }
        sx={{ minWidth: 360, bgcolor: "background.paper" }}
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
