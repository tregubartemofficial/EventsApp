import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { grey } from '@mui/material/colors';
import React from 'react'
import { Link } from 'react-router-dom';

const EventDetailedHeader = ({event}) => {
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
      <CardActions>
        <Button disabled={true} size="small" variant="contained">
          Cancel my place
        </Button>
        <Button size="small" variant="contained">
          Join this event
        </Button>
        <Button
          component={Link}
          to={`/manage/`}
          size="small"
          variant="contained"
        >
          Manage event
        </Button>
      </CardActions>
    </Card>
  );
}

export default EventDetailedHeader