import React, { useState } from "react";
import {
  List,
  ListItemButton,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";


const ProfileContent = () => {
  const [showEvents, setShowEvents] = useState(true);

  const handleItemClick = () => {
    setShowEvents(!showEvents);
  };

  return (
    <>
      <List>
        <ListItemButton onClick={handleItemClick}>
          {showEvents ? "Hide events" : "Show events"}
          {showEvents ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={showEvents} timeout="auto" unmountOnExit>
          event content
        </Collapse>
      </List>
    </>
  );
};

export default ProfileContent;
