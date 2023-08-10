import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../app/features/modal/modalReducer";
import AuthModal from "../modal/AuthModal";
import { signOut } from "../../app/features/auth/authReducer";
import PhoneNav from "./PhoneNav";
import { Logout, Person, Settings } from "@mui/icons-material";

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
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { isAuth, currUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = () => {
    dispatch(toggleModal("auth"));
  };
  const handleSignOut = () => {
    dispatch(signOut());
    navigate("/");
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
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
          <PhoneNav
            isAuth={isAuth}
            handleSignOut={handleSignOut}
            handleSignIn={handleSignIn}
          />
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
          <Box
            justifyContent="space-between"
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            <Stack flexDirection="row">
              <StyledBtn component={Link} to="/events">
                EVENTS
              </StyledBtn>
              <StyledBtn component={Link} to="/createEvent">
                CREATE EVENT
              </StyledBtn>
            </Stack>
            {!isAuth && <StyledBtn onClick={handleSignIn}>Sign In</StyledBtn>}
          </Box>
          {/* USER */}
          {isAuth && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="User profile">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={currUser.displayName} src={currUser.photoURL} />
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
                <MenuItem
                  component={Link}
                  to={`/profile/${currUser.uid}`}
                  onClick={handleCloseUserMenu}
                >
                  <ListItemIcon>
                    <Person fontSize="small" />
                  </ListItemIcon>
                  <Typography textAlign="center">My profile</Typography>
                </MenuItem>
                <MenuItem
                  component={Link}
                  to={`/settings/${currUser.uid}`}
                  onClick={handleCloseUserMenu}
                >
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  <Typography textAlign="center">Settings</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    handleSignOut();
                  }}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <Typography textAlign="center">Sign Out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <AuthModal />
    </>
  );
};

export default NavBar;
