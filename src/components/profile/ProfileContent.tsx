import React, { useState } from "react";
import { List, ListItemButton, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { ProfileState } from "../../app/features/profile/profileSlice";

type ProfileContentProps = { profile: ProfileState };

const ProfileContent = ({profile}: ProfileContentProps) => {
  const [showEvents, setShowEvents] = useState(true);

  const handleItemClick = () => {
    setShowEvents(!showEvents);
  };

  return (
    <List>
      <ListItemButton
        component="li"
        onClick={handleItemClick}
        sx={{ bgcolor: grey[900], justifyContent: "space-between" }}
      >
        {showEvents ? "Hide events" : "Show events"}
        {showEvents ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse component="li" in={showEvents} timeout="auto" unmountOnExit>
        <ListItemButton>map of events</ListItemButton>
      </Collapse>
    </List>
  );
};

export default ProfileContent;
