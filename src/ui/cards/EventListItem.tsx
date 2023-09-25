import React from 'react';
import {
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Stack,
  Button,
  AvatarGroup,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import { Event } from '../../app/features/event/eventSlice';
import { motion, useViewportScroll, useTransform } from 'framer-motion';

type EventListItemProps = { event: Event; isProfile?: boolean };

const EventListItem = ({ event, isProfile = false }: EventListItemProps) => {
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  console.log(scale, scrollYProgress);
  

  const deserializedDate = new Date(event.date);
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0.5 }}
      animate={{ scale: 1, opacity: 1, boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)' }}
      transition={{type:'string', delay: 0.1}}
      whileHover={{ scale: 1.05, backgroundColor: grey[900] }}
    >
      <ListItem
        sx={{
          flexDirection: 'column',
          mb: 1,
          border: isProfile ? `1px solid ${grey[900]}` : 0,
          cursor: isProfile ? 'pointer' : 'default',
          color: isProfile ? 'white' : 'inherit',      
        }}
        component={isProfile ? Link : 'section'}
        to={`/events/${event.id}`}
      >
        <Stack
          direction='row'
          sx={{
            width: '100%',
          }}
        >
          <ListItemAvatar>
            <Avatar alt={event.hostedBy} src={event.hostPhotoURL} />
          </ListItemAvatar>
          <ListItemText
            primary={event.title}
            secondary={`Hosted by ${event.hostedBy}`}
          />
        </Stack>
        <Stack direction='row' sx={{ width: '100%' }} spacing={2}>
          <Stack direction='row'>
            <AccessTimeIcon />
            <ListItemText
              primary={deserializedDate.toLocaleDateString('de-DE')}
            />
          </Stack>
          <Stack direction='row'>
            <LocationOnIcon />
            <ListItemText primary={event.venue.address} />
          </Stack>
        </Stack>
        {event.attendees[0] && (
          <Stack
            direction='row'
            sx={{
              width: '100%',
              py: 2,
              bgcolor: grey[900],
            }}
          >
            <AvatarGroup sx={{ marginLeft: 2 }} max={8}>
              {event.attendees.map((attender) => (
                <Avatar
                  alt={attender.name}
                  src={attender.photoURL}
                  key={attender.uid}
                />
              ))}
            </AvatarGroup>
          </Stack>
        )}
        <Stack
          flexDirection='row'
          justifyContent='start'
          sx={{ width: '100%' }}
        >
          <ListItemText primary={event.description} />
        </Stack>
        {!isProfile && (
          <Stack
            flexDirection='row'
            justifyContent='end'
            sx={{ width: '100%' }}
          >
            <Button
              variant='contained'
              color='info'
              sx={{ m: 1 }}
              component={Link}
              to={`/events/${event.id}`}
            >
              View
            </Button>
          </Stack>
        )}
      </ListItem>
    </motion.div>
  );
};

export default EventListItem;