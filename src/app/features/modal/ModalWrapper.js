import { Backdrop, Box, Button, Fade, Modal } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleModal } from './modalReducer';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '40vw',
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};


export const ModalWrapper = ({children, modalId}) => {
    const isOpen = useSelector(state => state.modals[modalId])
    const dispacth = useDispatch()


  return (
    <Modal
      open={isOpen}
      onClose={() => dispacth(toggleModal(modalId))}
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
          <Button onClick={() => dispacth(toggleModal(modalId))}>Close</Button>
        </Box>
      </Fade>
    </Modal>
  );
}
