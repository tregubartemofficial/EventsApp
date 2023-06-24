import {
  Avatar,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import React from "react";

const EventDetailedSideBar = () => {
  return (
    <Card>
      <List
        subheader={
          <ListSubheader component="h6" id="subheader">
            Number People going
          </ListSubheader>
        }
        sx={{ maxWidth: 360, bgcolor: "background.paper" }}
      >
        {[0, 1, 2, 3].map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <ListItem key={value} disableGutters divider>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar n°${value + 1}`}
                    src={`/static/images/avatar/${value + 1}.jpg`}
                  />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`Name`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};

export default EventDetailedSideBar;
