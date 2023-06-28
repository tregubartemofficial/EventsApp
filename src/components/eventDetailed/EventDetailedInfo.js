import { Backdrop, Box, Button, Card, Fade, List, ListItem, ListItemText, Modal } from '@mui/material'
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import React, { useState } from 'react'
import tt from '@tomtom-international/web-sdk-maps';


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EventDetailedInfo = ({event}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true)
    setTimeout(() => {
      var map = tt.map({
        key: "GgFavlAqzd0k4TxkgANMCXD23Kc4lF9S",
        container: "map",
        center: [28.44840377571382, 49.22599785318803],
        zoom: 18,
        doubleClickZoom: true,
        trackResize: true,
      });
      var marker = new tt.Marker()
        .setLngLat([28.44840377571382, 49.22599785318803])
        .addTo(map);
    }, 0);
  };
  const handleClose = () => setOpen(false);

  

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
          <Button variant="outlined" onClick={handleOpen}>
            Show Map
          </Button>
        </ListItem>
      </List>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div id="map" style={{ width: "400px", margin: 'auto' }} />
          </Box>
        </Fade>
      </Modal>
    </Card>
  );
}

export default EventDetailedInfo