import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const StyledTitle = styled(Typography)({
  mr: 2,
  flexGrow: 1,
  fontFamily: "monospace",
  fontWeight: 700,
  flexWrap: "nowrap",
  letterSpacing: ".3rem",
  color: "inherit",
  textDecoration: "none",
});
const StyledBtn = styled(Button)({ my: 2, color: "white", display: "block" });

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate()

  const handleLoggingIn = () => setLoggedIn(true);
  const handleLoggingOut = () => {
    setLoggedIn(false);
    navigate('/')
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <StyledTitle
          variant="h6"
          component={Link}
          to="./events"
          sx={{
            display: { xs: "none", md: "flex" },
          }}
        >
          EVENTAPP
        </StyledTitle>
        {/* PHONE NAVIGATION */}
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
            <MenuItem
              component={Link}
              to="/events"
              onClick={handleCloseNavMenu}
            >
              Events
            </MenuItem>
            <MenuItem
              component={Link}
              to="/createEvent"
              onClick={handleCloseNavMenu}
            >
              Сreate Event
            </MenuItem>
            {!loggedIn && (
              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  handleLoggingIn();
                }}
              >
                Login
              </MenuItem>
            )}
            {!loggedIn && (
              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  handleLoggingOut();
                }}
              >
                Register
              </MenuItem>
            )}
          </Menu>
        </Box>
        <StyledTitle
          variant="h5"
          component={Link}
          to="./events"
          sx={{
            display: { xs: "flex", md: "none" },
          }}
        >
          EVENTAPP
        </StyledTitle>
        {/* PC NAVIGATION */}
        <Box justifyContent='space-between' sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <Stack flexDirection="row">
            <StyledBtn component={Link} to="/events">
              EVENTS
            </StyledBtn>
            <StyledBtn component={Link} to="/createEvent">
              CREATE EVENT
            </StyledBtn>
          </Stack>
          {!loggedIn && (
            <Stack flexDirection="row">
              <StyledBtn onClick={handleLoggingIn}>LOGIN</StyledBtn>
              <StyledBtn onClick={handleCloseNavMenu}>REGISTER</StyledBtn>
            </Stack>
          )}
        </Box>
        {loggedIn && (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="User profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Create Event</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">My profile</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  handleLoggingOut();
                }}
              >
                <Typography textAlign="center">Sign Out</Typography>
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
