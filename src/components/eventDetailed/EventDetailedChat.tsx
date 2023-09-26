import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Stack,
  TextField,
} from '@mui/material';
import { Comment, Event, setEventComments } from '../../app/features/event/eventSlice';
import UserComment from '../../ui/comment/UserComment';
import {
  addEventChatComment,
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
      const date: Comment[] = Object.keys(snapshot.val()).map(
        (key) => snapshot.val()[key]
      );

      dispatch(setEventComments(date));
    });
  }, [event.id, dispatch]);

  return (
    <Card>
      <List subheader={<ListSubheader>Chat about this event</ListSubheader>}>
        {comments[0] && comments.map((comment) => {
          return <UserComment comment={comment} key={comment.date} />;
        })}
        {isAuth ? (
          <Stack spacing={2} alignItems='stretch' component={ListItem}>
            <TextField
              name='new comment'
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
