import React from "react";
import { User } from "../../app/features/auth/authSlice";
import { Avatar, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { toggleModal } from "../../app/features/modal/modalSlice";

type ProfileListItemProps = { profile: User, type: "following" | "follower" };

const ProfileListItem = ({type, profile }: ProfileListItemProps) => {
  const dispatch = useAppDispatch();
  return (
    <ListItemButton component={Link} to={`/profile/${profile.uid}`} onClick={() => dispatch(toggleModal(type))}>
        <ListItemAvatar>
          <Avatar alt={profile.displayName} src={profile.photoURL!} />
        </ListItemAvatar>
        <ListItemText primary={profile.displayName} />
    </ListItemButton>
  );
};

export default ProfileListItem;
