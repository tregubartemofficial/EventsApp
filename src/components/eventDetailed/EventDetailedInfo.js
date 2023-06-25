import { Button, Card, List, ListItem, ListItemText } from '@mui/material'
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import React from 'react'
import { Link } from 'react-router-dom';

const EventDetailedInfo = ({event}) => {
  return (
    <Card>
      <List sx={{ maxWidth: 350 }}>
        <ListItem divider>
          <InfoOutlinedIcon sx={{ marginRight: 2 }} />
          <ListItemText primary={event.description} />
        </ListItem>
        <ListItem divider>
          <CalendarMonthIcon sx={{ marginRight: 2 }} />
          <ListItemText primary={event.date.toUTCString()} />
        </ListItem>
        <ListItem divider>
          <LocationOnIcon sx={{ marginRight: 2 }} />
          <ListItemText primary={event.venue.address} />
          <Button variant="outlined" >Show Map</Button>
        </ListItem>
      </List>
    </Card>
  );
}

export default EventDetailedInfo