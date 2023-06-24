// import { Box } from '@mui/material'
import React from 'react'
import EventDetailedHeader from '../eventDetailed/EventDetailedHeader'
import EventDetailedChat from "../eventDetailed/EventDetailedChat";
import EventDetailedInfo from "../eventDetailed/EventDetailedInfo";
import EventDetailedSideBar from "../eventDetailed/EventDetailedSideBar";
import { Stack } from '@mui/material';


const EventDetailed = () => {
  return (
    <Stack marginTop={{ xs: 3, md: 4}} direction="row" justifyContent='space-around'>
      <Stack direction="column" spacing={{ xs: 1, sm: 2, md: 3.5 }}>
        <EventDetailedHeader />
        <EventDetailedChat />
        <EventDetailedInfo />
      </Stack>
      <EventDetailedSideBar />
    </Stack>
  );
}

export default EventDetailed