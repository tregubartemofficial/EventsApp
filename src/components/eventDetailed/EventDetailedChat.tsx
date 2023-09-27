import React, { useState, useEffect } from 'react';
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
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { grey } from '@mui/material/colors';

type EventDetailedChatProps = { event: Event };

const EventDetailedChat = ({ event }: EventDetailedChatProps) => {
  const [commentInput, setCommentInput] = useState('');
  const dispatch = useAppDispatch();
  const { comments } = useAppSelector((state) => state.events);
  const { isAuth } = useAppSelector((state) => state.auth);

  const handleSubmitComment = async () => {
    await addEventChatComment(event.id, commentInput);
    setCommentInput('');
  };

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
            <Stack spacing={2} alignItems='stretch' component={ListItem}>
              <TextField
                variant='outlined'
                multiline
                maxRows={7}
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder='Add your comment'
              />
              <Button
                onClick={handleSubmitComment}
                color='info'
                variant='contained'
              >
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
