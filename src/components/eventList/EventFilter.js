import React, { useState } from "react";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useDispatch } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ExpandLess, ExpandMore } from "@mui/icons-material";


const EventFilter = () => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch();

  return (
    <Stack>
      <List sx={{ border: "1px solid #2f2f2f", marginBottom: 2 }}>
        <ListItemButton onClick={() => setOpen(!open)}>
          <ListItemIcon>
            <FilterAltIcon />
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
      <Calendar />
    </Stack>
  );
};

export default EventFilter;
