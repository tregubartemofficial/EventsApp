import React, { useState } from "react";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const EventFilter = () => {
  const [open, setOpen] = useState(false)

  return (
    <Stack sx={{width: { xs: '100%', md: 'auto' }}}>
      <List
        sx={{ border: "1px solid #2f2f2f", marginBottom: 2, marginTop: 2 }}
      >
        <ListItemButton onClick={() => setOpen(!open)}>
          <ListItemIcon>
            <SortIcon />
          </ListItemIcon>
          <ListItemText primary="Filters" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <ListItemButton divider={true}>
            <ListItemText primary="All events" />
          </ListItemButton>
          <ListItemButton divider={true}>
            <ListItemText primary="I`m going" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="I`m hosting" />
          </ListItemButton>
        </Collapse>
      </List>
    </Stack>
  );
};

export default EventFilter;
