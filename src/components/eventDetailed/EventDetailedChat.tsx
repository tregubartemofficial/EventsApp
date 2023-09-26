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
import UserComment from '../../ui/comment/UserComment';
import {
  addEventChatComment,
  firebaseObjectToArray,
  getEventChatRef,
} from '../../app/firebase/firebaseService';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';

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
      }
    });
  }, [event.id, dispatch]);

  return (
    <Card>
      <List subheader={<ListSubheader>Chat about this event</ListSubheader>}>
        {comments[0] &&
          comments.map((comment) => {
            return <UserComment comment={comment} key={comment.date} />;
          })}
        {isAuth ? (
          <>
            <Divider />
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
          </>
        ) : (
          <ListItem>
            <ListItemText
              sx={{ textAlign: 'center' }}
              primary='Please login to comment'
            />
          </ListItem>
        )}
      </List>
    </Card>
  );
};

export default EventDetailedChat;
