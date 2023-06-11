import { AppBar, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from 'react'

const NavBar = ({ setShowForm }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h2">EventApp</Typography>
        <Tabs value={value} onChange={handleChange} >
          <Tab label="Event" value={0} />
          <Tab label="Create Event" value={1} onClick={() => setShowForm(true)} />
          <Tab label="Login" value={2} />
          <Tab label="Register" value={3} />
          {/* <Tab icon={<MenuIcon />} /> */}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar