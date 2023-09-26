import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Grow,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { toggleModal } from '../../app/features/modal/modalSlice';

import { Comment } from '../../app/features/event/eventSlice';

import ConfirmDeleteCommentModal from '../../components/modal/ConfirmDeleteCommentModal';
import Answer from './Answer';
import { useAppSelector } from '../../hooks/useAppSelector';

type UserCommentProps = { comment: Comment };

const showTime = (time: number) => {
  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor(time / (1000 * 60 * 60));
  const minutes = Math.floor(time / (1000 * 60));

  if (minutes > 60) return `${hours} hourse ago`;
  if (hours > 24) return `${days} days ago`;
  return `${minutes} minutes ago`;
};

const UserComment = ({ comment }: UserCommentProps) => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [isEditInputVisible, setIsEditInputVisible] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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
            <>
              <IconButton
                aria-label='more'
                id='long-button'
                aria-controls={isOpenButtonMenu ? 'long-menu' : undefined}
                aria-expanded={isOpenButtonMenu ? 'true' : undefined}
                aria-haspopup='true'
                onClick={handleClickButtonMenu}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id='long-menu'
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={isOpenButtonMenu}
                onClose={handleCloseButtonMenu}
              >
                <MenuItem
                  onClick={() => {
                    setIsAnswerVisible(!isAnswerVisible);
                    setIsEditInputVisible(false);
                    handleCloseButtonMenu();
                  }}
                >
                  <ListItemIcon>
                    <ReplyIcon color='primary' />
                  </ListItemIcon>
                  Reply
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setIsEditInputVisible(!isEditInputVisible);
                    setIsAnswerVisible(false);
                    handleCloseButtonMenu();
                  }}
                >
                  <ListItemIcon>
                    <EditIcon color='info' />
                  </ListItemIcon>
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(toggleModal('confirmDelete'));
                    handleCloseButtonMenu();
                  }}
                >
                  <ListItemIcon>
                    <DeleteIcon color='error' />
                  </ListItemIcon>
                  Delete
                </MenuItem>
              </Menu>
            </>
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
