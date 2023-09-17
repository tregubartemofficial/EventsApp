import React from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { ModalWrapper } from '../../ui/modal/ModalWrapper';
import { Button, Stack, Typography } from '@mui/material';
import { toggleModal } from '../../app/features/modal/modalSlice';

const ConfirmDeleteCommentModal = () => {
  const dispatch = useAppDispatch();

  return (
    <ModalWrapper modalId='confirmDelete'>
        <Stack spacing={2}>
            <Typography variant='h5'>Delete comment</Typography>
            <Typography variant='h6'>Are you sure you want to delete this comment?</Typography>
            <Stack direction='row' justifyContent='flex-end' spacing={2}>
                <Button onClick={ () => dispatch(toggleModal('confirmDelete'))}>Cancel</Button>
                <Button color='error'>Delete</Button>
            </Stack>
        </Stack>
    </ModalWrapper>
  )
}

export default ConfirmDeleteCommentModal