import React from 'react';
import ReplyIcon from '@mui/icons-material/Reply';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { toggleModal } from '../../app/features/modal/modalSlice';

type CommentActionsProps = {
  anchorEl: HTMLElement | null;
  handleCloseButtonMenu: () => void;
  handleClickButtonMenu: (event: React.MouseEvent<HTMLElement>) => void;
  setIsAnswerVisible: (value: boolean) => void;
  setIsEditInputVisible: (value: boolean) => void;
  isAnswerVisible: boolean;
  isEditInputVisible: boolean;
  isOpenButtonMenu: boolean;
  isUserComment: boolean;
};

const CommentActions = ({
  handleCloseButtonMenu,
  handleClickButtonMenu,
  setIsAnswerVisible,
  setIsEditInputVisible,
  anchorEl,
  isAnswerVisible,
  isEditInputVisible,
  isOpenButtonMenu,
  isUserComment,
}: CommentActionsProps) => {
  const dispatch = useAppDispatch();

  return (
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
          disabled={true}
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
        {isUserComment && (
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
        )}
        {isUserComment && (
          <MenuItem
            onClick={() => {
              dispatch(toggleModal('confirmDeleteComment'));
              handleCloseButtonMenu();
            }}
          >
            <ListItemIcon>
              <DeleteIcon color='error' />
            </ListItemIcon>
            Delete
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default CommentActions;
