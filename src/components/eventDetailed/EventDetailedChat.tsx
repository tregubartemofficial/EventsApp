import React, { useEffect } from 'react';
import {
  Button,
  Card,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Stack,
  TextField,
} from '@mui/material';
import { Event, setEventComments } from '../../app/features/event/eventSlice';
import UserComment from '../comment/UserComment';
import {
  addEventChatComment,
  firebaseObjectToArray,
  getEventChatRef,
} from '../../app/firebase/firebaseService';
import * as yup from 'yup';
import { grey } from '@mui/material/colors';
import { useFormik } from 'formik';

import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';

type EventDetailedChatProps = { event: Event };

const validationSchema = yup.object({
  text: yup.string().required('Text is required'),
});

const EventDetailedChat = ({ event }: EventDetailedChatProps) => {
  const dispatch = useAppDispatch();
  const { comments } = useAppSelector((state) => state.events);
  const { isAuth } = useAppSelector((state) => state.auth);

  const {values, handleChange, handleSubmit} = useFormik({
    initialValues: { text: '' },
    onSubmit: async(values) => {
      await addEventChatComment(event.id, values.text);
      values.text = '';
    },
    validationSchema,
  });

  useEffect(() => {
    getEventChatRef(event.id).on('value', (snapshot) => {
      if (snapshot.exists()) {
        dispatch(setEventComments(firebaseObjectToArray(snapshot.val())));
      } else {
        dispatch(setEventComments([]));
      }
    });
  }, [event.id, dispatch]);

  return (
    <Card>
      <List
        subheader={
          <ListSubheader sx={{ bgcolor: grey[900] }}>
            Chat about this event
          </ListSubheader>
        }
      >
        {isAuth ? (
          <>
            <Stack sx={{p:2}} spacing={2} alignItems='stretch' component='form' onSubmit={handleSubmit}>
                <TextField
                  variant='outlined'
                  name='text'
                  multiline
                  maxRows={7}
                  value={values.text}
                  onChange={handleChange}
                  placeholder='Add your comment'
                />
                <Button type='submit' color='info' variant='contained'>
                  Add comment
                </Button>
            </Stack>
            <Divider />
          </>
        ) : (
          <ListItem>
            <ListItemText
              sx={{ textAlign: 'center' }}
              primary='Please login to comment'
            />
          </ListItem>
        )}
        {comments[0] ? (
          comments.map((comment) => {
            return (
              <UserComment
                eventId={event.id}
                comment={comment}
                key={comment.date}
              />
            );
          })
        ) : (
          <ListItem>
            <ListItemText
              sx={{ textAlign: 'center' }}
              primary='No comments for this event yet'
            />
          </ListItem>
        )}
      </List>
    </Card>
  );
};

export default EventDetailedChat;
