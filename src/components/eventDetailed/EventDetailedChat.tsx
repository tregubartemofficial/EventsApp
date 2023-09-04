import React from "react";
import {
  Avatar,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { Event } from "../../app/features/event/eventSlice";

type EventDetailedChatProps = { event: Event };

const EventDetailedChat = ({ event }: EventDetailedChatProps) => {
  return (
    <Card>
      <List
        subheader={
          <ListSubheader component="h6" id="subheader">
            Chat about this event
          </ListSubheader>
        }
      >
        {[0, 1, 2, 3].map((value) => {
          return (
            <ListItem key={value} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/" />
              </ListItemAvatar>
              <ListItemText
                primary="NAME"
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      TEXT
                    </Typography>
                    {" TIME "}
                  </>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};

export default EventDetailedChat;
