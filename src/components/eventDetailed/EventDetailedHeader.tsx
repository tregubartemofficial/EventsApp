import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { updateAttendees } from "../../app/firebase/firebaseService";
import { toggleModal } from "../../app/features/modal/modalSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { Event } from "../../app/features/event/eventSlice";

type EventDetailedHeaderProps = {event: Event}

const EventDetailedHeader = ({ event }: EventDetailedHeaderProps) => {
  const deserializedDate = new Date(event.date).toUTCString();
  const dispatch = useAppDispatch();
  const { currUser } = useAppSelector((state) => state.auth);

  return (
    <Card>
      <CardContent sx={{ bgcolor: grey[600], minHeight: 100 }}>
        <Typography variant="h5">{event.title}</Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {deserializedDate}
        </Typography>
        <Typography variant="body2">Hosted by {event.hostedBy}</Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        {currUser?.uid ? (
          <>
            {!event.attendees.some(
              (attendee) => attendee.uid === currUser.uid
            ) ? (
              <Button
                variant="contained"
                sx={{ ml: "5px" }}
                onClick={() => updateAttendees(event.id, currUser, "ADD")}
              >
                Join this event
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{ ml: "5px" }}
                onClick={() => updateAttendees(event.id, currUser, "REMOVE")}
              >
                Cancel my place
              </Button>
            )}
            {event.uid === currUser.uid && (
              <>
                <Button
                  component={Link}
                  to={`/manage/${event.id}`}
                  variant="contained"
                  sx={{ ml: "5px" }}
                >
                  Manage event
                </Button>
                <Button
                  onClick={() => {
                    dispatch(toggleModal("confirmDeleteEvent"));
                  }}
                  variant="contained"
                  color="error"
                  sx={{ ml: "5px" }}
                >
                  Delete
                </Button>
              </>
            )}
          </>
        ) : (
          <Button
            variant="contained"
            onClick={() => dispatch(toggleModal("auth"))}
          >
            Log in to join event
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default EventDetailedHeader;
