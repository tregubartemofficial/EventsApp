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
import ReplyIcon from '@mui/icons-material/Reply';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';
import Answer from './Answer';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { toggleModal } from '../../app/features/modal/modalSlice';
import ConfirmDeleteCommentModal from '../../components/modal/ConfirmDeleteCommentModal';
import { Comment } from '../../app/features/event/eventSlice';

type UserCommentProps = { comment: Comment };

const showTime = (time: number) => {
  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time / (1000 * 60 * 60)));
  const minutes = Math.floor((time / (1000 * 60)));

  if (minutes > 60) return  `${hours} hourse ago` 
  if (hours > 24) return `${days} days ago`
  return `${minutes} minutes ago`;
};

const UserComment = ({ comment }: UserCommentProps) => {
  const dispatch = useAppDispatch();
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [isEditInputVisible, setIsEditInputVisible] = useState(false);
  const timeAgo = showTime(new Date().getTime() - Number(comment.date));
  

  return (
    <>
      <Stack spacing={2} alignItems='stretch' component={ListItem}>
        <Stack alignItems='center' direction='row' spacing={1}>
          <ListItemAvatar>
            <Avatar alt={comment.displayName} src={comment.photoURL} />
          </ListItemAvatar>
          <ListItemText primary={comment.displayName} />
          <ListItemText secondary={timeAgo} />
          <Button
            onClick={() => {
              setIsAnswerVisible(!isAnswerVisible);
              setIsEditInputVisible(false);
            }}
            startIcon={<ReplyIcon />}
          >
            Reply
          </Button>
          <Button
            onClick={() => {
              setIsEditInputVisible(!isEditInputVisible);
              setIsAnswerVisible(false);
            }}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
          <Button
            color='error'
            startIcon={<DeleteIcon />}
            onClick={() => dispatch(toggleModal('confirmDelete'))}
          >
            Delete
          </Button>
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
              value={comment.text}
              multiline
              maxRows={7}
            />
            <Button variant='contained'>Save</Button>
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
      <ConfirmDeleteCommentModal />
    </>
  );
};

export default UserComment;
