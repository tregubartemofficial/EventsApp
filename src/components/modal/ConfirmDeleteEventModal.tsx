import React from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { ModalWrapper } from '../../ui/modal/ModalWrapper';
import { Button, Stack, Typography } from '@mui/material';
import { toggleModal } from '../../app/features/modal/modalSlice';
import { deleteEventFromFirestore } from '../../app/firebase/firebaseService';
import { useNavigate } from 'react-router';

type ConfirmDeleteEventModalProps = { eventId: string };

const ConfirmDeleteEventModal = ({ eventId }: ConfirmDeleteEventModalProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <ModalWrapper modalId='confirmDeleteEvent'>
      <Stack spacing={2}>
        <Typography variant='h5'>Delete event</Typography>
        <Typography variant='h6'>
          Are you sure you want to delete this event?
        </Typography>
        <Stack direction='row' justifyContent='flex-end' spacing={2}>
          <Button onClick={() => dispatch(toggleModal('confirmDeleteEvent'))}>
            Cancel
          </Button>
          <Button
            variant='contained'
            color='error'
            onClick={ () => {
              dispatch(toggleModal('confirmDeleteEvent'));
              deleteEventFromFirestore(eventId);
              navigate('/events');
            }}
          >
            Delete
          </Button>
        </Stack>
      </Stack>
    </ModalWrapper>
  );
};

export default ConfirmDeleteEventModal;
