import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Grow,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField,
} from '@mui/material';

import { Comment } from '../../app/features/event/eventSlice';

import ConfirmDeleteCommentModal from '../modal/ConfirmDeleteCommentModal';
import Answer from './Answer';
import CommentActions from './CommentActions';
import { useAppSelector } from '../../hooks/useAppSelector';
import { updateEventComment } from '../../app/firebase/firebaseService';

type UserCommentProps = { comment: Comment; eventId: string };

const showTime = (time: number) => {
  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor(time / (1000 * 60 * 60));
  const minutes = Math.floor(time / (1000 * 60));

  if (minutes < 60 ) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  if (days === 1) return `${days} day ago`;
  return `${days} days ago`;
};

const UserComment = ({ comment, eventId }: UserCommentProps) => {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [isEditInputVisible, setIsEditInputVisible] = useState(false);
  const [editInput, setEditInput] = useState(comment.text);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { isAuth, currUser } = useAppSelector((state) => state.auth);
  const isUserComment = comment.uid === currUser?.uid;

  const isOpenButtonMenu = Boolean(anchorEl);

  const timeAgo = showTime(new Date().getTime() - Number(comment.date));

  const handleClickButtonMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseButtonMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Stack spacing={2} alignItems='stretch' component={ListItem}>
        <Stack alignItems='center' direction='row' spacing={1}>
          <ListItemAvatar>
            <Avatar alt={comment.displayName} src={comment.photoURL} />
          </ListItemAvatar>
          <ListItemText primary={comment.displayName} />
          <ListItemText secondary={timeAgo} />

          {isAuth && (
            <CommentActions
              anchorEl={anchorEl}
              handleCloseButtonMenu={handleCloseButtonMenu}
              handleClickButtonMenu={handleClickButtonMenu}
              setIsAnswerVisible={setIsAnswerVisible}
              setIsEditInputVisible={setIsEditInputVisible}
              isEditInputVisible={isEditInputVisible}
              isOpenButtonMenu={isOpenButtonMenu}
              isAnswerVisible={isAnswerVisible}
              isUserComment={isUserComment}
            />
          )}
        </Stack>
        <Grow
          in={isEditInputVisible}
          mountOnEnter
          unmountOnExit
          exit={false}
          timeout={{ enter: 900 }}
        >
          <Stack spacing={2}>
            <TextField
              variant='outlined'
              value={editInput}
              onChange={(e) => setEditInput(e.target.value)}
              multiline
              maxRows={7}
            />
            <Button
              variant='contained'
              onClick={() => {
                updateEventComment(eventId, comment.id, editInput);
                setIsEditInputVisible(false);
              }}
            >
              Save
            </Button>
          </Stack>
        </Grow>
        <Grow
          in={!isEditInputVisible}
          mountOnEnter
          unmountOnExit
          appear={false}
          exit={false}
        >
          <ListItemText primary={comment.text} />
        </Grow>
      </Stack>
      <Answer isAnswerVisible={isAnswerVisible} />
      <ConfirmDeleteCommentModal eventId={eventId} commentId={comment.id} />
    </>
  );
};

export default UserComment;
