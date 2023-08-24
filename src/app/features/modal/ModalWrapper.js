import { Backdrop, Box, Fade, Modal } from '@mui/material';
import React from 'react'
import { toggleModal } from './modalSlice';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {xs: '90vw', md: '45vw' },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};


export const ModalWrapper = ({children, modalId}) => {
    const isOpen = useAppSelector(state => state.modals[modalId])
    const dispatch = useAppDispatch()
  return (
    <Modal
      open={isOpen}
      onClose={() => dispatch(toggleModal(modalId))}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpen}>
        <Box sx={style}>
          {children}
        </Box>
      </Fade>
    </Modal>
  );
}
