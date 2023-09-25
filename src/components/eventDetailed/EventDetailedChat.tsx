import React, { useState } from 'react';
import {
  Button,
  Card,
  List,
  ListItem,
  ListSubheader,
  Stack,
  TextField,
} from '@mui/material';
import { Event } from '../../app/features/event/eventSlice';
import Comment from '../../ui/comment/Comment';
import { addEventChatComment } from '../../app/firebase/firebaseService';

type EventDetailedChatProps = { event: Event };

const EventDetailedChat = ({ event }: EventDetailedChatProps) => {
  const [commentInput, setCommentInput] = useState('');
  const handleSubmitComment = async () => {
    await addEventChatComment(event.id, commentInput);
    setCommentInput('');
  };
  return (
    <Card>
      <List subheader={<ListSubheader>Chat about this event</ListSubheader>}>
        {[].map((value) => {
          return <Comment key={value} />;
        })}
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
      </List>
    </Card>
  );
};

export default EventDetailedChat;
