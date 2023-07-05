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
        {event.attendees.map((attender) => {
          return (
            <ListItem key={attender.id} disableGutters divider>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    alt={`${attender.name}`}
                    src={`${attender.photoURL}`}
                  />
                </ListItemAvatar>
                <ListItemText primary={`${attender.name}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};

export default EventDetailedSideBar;
