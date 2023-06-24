import { Button, Card, List, ListItem, ListItemText } from '@mui/material'
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import React from 'react'

const EventDetailedInfo = () => {
  return (
    <Card>
      <List>
        <ListItem divider>
          <InfoOutlinedIcon sx={{ marginRight: 2 }} />
          <ListItemText primary="Event Description" />
        </ListItem>
        <ListItem divider>
          <CalendarMonthIcon sx={{ marginRight: 2 }} />
          <ListItemText primary="Event Date" />
        </ListItem>
        <ListItem divider>
          <LocationOnIcon sx={{ marginRight: 2 }} />
          <ListItemText primary="Event Venue" />
          <Button variant="outlined"> Show Map</Button>
        </ListItem>
      </List>
    </Card>
  );
}

export default EventDetailedInfo