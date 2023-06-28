import { Backdrop, Box, Fade, Modal } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux'
import { closeModal } from '../../app/features/modal/modalReducer';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};


export const ModalWrapper = ({children}) => {
    const dispacth = useDispatch()

  return (
    <Modal
      open={true}
      onClose={() => dispacth(closeModal())}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={true}>
        <Box sx={style}>
            {children}
        </Box>
      </Fade>
    </Modal>
  );
}
