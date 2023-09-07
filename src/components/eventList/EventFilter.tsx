import React, { useState } from "react";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setFilter } from "../../app/features/event/eventSlice";

const EventFilter = () => {
  const dispatch = useAppDispatch()
  const uid = useAppSelector((state) => state.auth.currUser?.uid)
  const [open, setOpen] = useState(false)

  return (
    <Stack sx={{ width: { xs: "100%", sm: "35%" } }}>
      <List sx={{ border: "1px solid #2f2f2f", marginBottom: 2, marginTop: 2 }}>
        <ListItemButton onClick={() => setOpen(!open)}>
          <ListItemIcon>
            <SortIcon />
          </ListItemIcon>
          <ListItemText primary="Filters" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto">
          <ListItemButton
            divider={true}
            onClick={() => dispatch(setFilter("ALL"))}
          >
            <ListItemText primary="All events" />
          </ListItemButton>
          <ListItemButton
            divider={true}
            disabled={!uid}
            onClick={() => dispatch(setFilter("GOING"))}
          >
            <ListItemText primary="I`m going" />
          </ListItemButton>
          <ListItemButton
            disabled={!uid}
            onClick={() => dispatch(setFilter("HOSTING"))}
          >
            <ListItemText primary="I`m hosting" />
          </ListItemButton>
        </Collapse>
      </List>
    </Stack>
  );
};

export default EventFilter;
