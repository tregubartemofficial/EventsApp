import {
  Avatar,
  Button,
  Grow,
  ListItem,
  ListItemAvatar,
  Stack,
  TextField,
} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import React, { useState } from "react";

const Answer = ({ isAnswerVisible }: { isAnswerVisible : boolean}) => {
  const [commentInput, setCommentInput] = useState("");

  const handleSubmit = () => {};

  return (
    <Grow in={isAnswerVisible} mountOnEnter unmountOnExit>
      <Stack
        spacing={2}
        direction="row"
        justifyContent='space-evenly'
        component={ListItem}
        sx={{ pl: 5 }}
      >
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/" />
        </ListItemAvatar>
        <TextField
          variant="outlined"
          placeholder="Add a comment"
          multiline
          maxRows={5}
          value={commentInput}
          sx={{flex: 65}}
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <Button
          startIcon={<ReplyIcon />}
          variant="contained"
          onClick={handleSubmit}
        >
          Reply
        </Button>
      </Stack>
    </Grow>
  );
};

export default Answer;
