import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { grey } from '@mui/material/colors';
import React from 'react'
import { Link } from 'react-router-dom';

const EventDetailedHeader = () => {
  return (
    <Card sx={{ minWidth: 400 }}>
      <CardContent sx={{ background: grey[600] }}>
        <Typography variant="h5" >
          Event Title
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Event date
        </Typography>
        <Typography variant="body2">
          Hosted by BOB
        </Typography>
      </CardContent>
      <CardActions>
        <Button disabled={true} size="small" variant="contained">
          Cancel my place
        </Button>
        <Button size="small" variant="contained">
          Join this event
        </Button>
        <Button component={Link} to={`/manage/`} size="small" variant="contained">
          Manage event
        </Button>
      </CardActions>
    </Card>
  );
}

export default EventDetailedHeader