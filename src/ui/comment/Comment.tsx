import {
  Avatar,
  Button,
  Grow,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import Answer from "./Answer";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { toggleModal } from "../../app/features/modal/modalSlice";
import ConfirmDeleteCommentModal from "../../components/modal/ConfirmDeleteCommentModal";

const Comment = () => {
  const dispatch = useAppDispatch();
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [isEditInputVisible, setIsEditInputVisible] = useState(false);

  return (
    <>
      <Stack spacing={2} alignItems="stretch" component={ListItem}>
        <Stack alignItems="center" direction="row" spacing={1}>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/" />
          </ListItemAvatar>
          <ListItemText primary="User name" />
          <ListItemText secondary="Time ago" />
          <Button
            onClick={() => setIsAnswerVisible(!isAnswerVisible)}
            startIcon={<ReplyIcon />}
          >
            Reply
          </Button>
          <Button
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => dispatch(toggleModal("confirmDelete"))}
          >
            Delte
          </Button>
          <Button
            onClick={() => setIsEditInputVisible(!isEditInputVisible)}
            startIcon={<EditIcon />}
          >
            Edit
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
              variant="outlined"
              value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto voluptas temporibus libero deserunt eligendi quod voluptate maxime ipsa cupiditate iusto, modi, aliquid eveniet ad voluptatem repudiandae ullam voluptatum facilis ex.
      Perferendis cum "
              multiline
              maxRows={7}
            />
            <Button variant="contained">Save</Button>
          </Stack>
        </Grow>
        <Grow
          in={!isEditInputVisible}
          mountOnEnter
          unmountOnExit
          appear={false}
          exit={false}
        >
          <ListItemText
            primary="Lorem deserunt eligeatem repudiandae ullam voluptatum facilis ex.
      Perferendis cum doloribus eveniet ipsa autem consectetur sapiente, excepturi sint ullam! Cum ipsa alias amet! Minima dolorum vero doloribus dolorem aliquam nisi voluptatibus, suscipit consectetur voluptatem id libero eum eos.
 Labore natus nulla vie."
          />
        </Grow>
      </Stack>
      <Answer isAnswerVisible={isAnswerVisible} />
      <ConfirmDeleteCommentModal />
    </>
  );
};

export default Comment;
