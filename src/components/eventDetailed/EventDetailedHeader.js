import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { Link } from "react-router-dom";

const EventDetailedHeader = ({ event }) => {
  console.log(event);
  return (
    <Card sx={{ minWidth: 400 }}>
      <CardContent sx={{ background: grey[600], minHeight: 100 }}>
        <Typography variant="h5">{event.title}</Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {event.date.toUTCString()}
        </Typography>
        <Typography variant="body2">Hosted by {event.hostedBy}</Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button disabled size="small" variant="contained">
          Cancel my place
        </Button>
        <Stack flexDirection="row">
          <Button size="small" variant="contained" sx={{ margin: "0 0 0 5px" }}>
            Join this event
          </Button>
          <Button
            component={Link}
            to={`/manage/${event.id}`}
            size="small"
            variant="contained"
            sx={{ margin: "0 0 0 5px" }}
          >
            Manage event
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default EventDetailedHeader;
