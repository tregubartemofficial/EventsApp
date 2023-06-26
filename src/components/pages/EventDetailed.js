// import { Box } from '@mui/material'
import React from 'react'
import EventDetailedHeader from '../eventDetailed/EventDetailedHeader'
import EventDetailedChat from "../eventDetailed/EventDetailedChat";
import EventDetailedInfo from "../eventDetailed/EventDetailedInfo";
import EventDetailedSideBar from "../eventDetailed/EventDetailedSideBar";
import { Stack } from '@mui/material';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';


const EventDetailed = () => {
  const {id} = useParams();
  const event = useSelector(state => state.events.events.find(e => e.id === id))

  return (
    <Stack
      marginTop={{ xs: 3, md: 4 }}
      direction={{ xs: "column", md: "row" }}
      justifyContent="space-around"
      alignItems={{ xs: "flex-center", md: "flex-start" }}
      spacing={{ xs: 1, sm: 2 }}
    >
      <Stack direction="column" spacing={{ xs: 1, sm: 2, md: 3.5 }}>
        <EventDetailedHeader event={event} />
        <EventDetailedChat event={event} />
        <EventDetailedInfo event={event} />
      </Stack>
      <EventDetailedSideBar event={event} />
    </Stack>
  );
}

export default EventDetailed