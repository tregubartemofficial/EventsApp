import React from "react";
import {
  Card,
  List,
  ListSubheader,
} from "@mui/material";
import { Event } from "../../app/features/event/eventSlice";
import Comment from "../../ui/comment/Comment";

type EventDetailedChatProps = { event: Event };

const EventDetailedChat = ({ event }: EventDetailedChatProps) => {
  return (
    <Card>
      <List
        subheader={
          <ListSubheader>
            Chat about this event
          </ListSubheader>
        }
      >
        {[0, 1 ].map((value) => {
          return (
            <Comment key={value}/>
          );
        })}
      </List>
    </Card>
  );
};

export default EventDetailedChat;
