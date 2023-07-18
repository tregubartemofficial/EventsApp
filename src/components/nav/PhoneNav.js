import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const PhoneNav = ({ isAuth, handleSignOut, handleSignIn }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  return (
    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
      <motion.div whileTap={{ scale: 0.85 }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
      </motion.div>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        <MenuItem component={Link} to="/" onClick={handleCloseNavMenu}>
          Home
        </MenuItem>
        <MenuItem component={Link} to="/events" onClick={handleCloseNavMenu}>
          Events
        </MenuItem>
        <MenuItem
          component={Link}
          to="/createEvent"
          onClick={handleCloseNavMenu}
        >
          Сreate Event
        </MenuItem>
        {!isAuth && (
          <MenuItem
            onClick={() => {
              handleCloseNavMenu();
              handleSignIn();
            }}
          >
            Sign In
          </MenuItem>
        )}
        {!isAuth && (
          <MenuItem
            onClick={() => {
              handleCloseNavMenu();
              handleSignOut();
              navigate("/register");
            }}
          >
            Register
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default PhoneNav;
