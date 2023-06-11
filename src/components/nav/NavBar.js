import { AppBar, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";

const NavBar = ({ setShowForm }) => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h2">EventApp</Typography>
        <Tabs>
          <Tab label="Event" />
          <Tab label="Create Event" onClick={() => setShowForm(true)} />
          <Tab label="Login" />
          <Tab label="Register" />
          {/* <Tab icon={<MenuIcon />} /> */}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
