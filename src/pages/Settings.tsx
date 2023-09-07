import { Alert, AlertTitle, CircularProgress, Grow } from "@mui/material";
import React from "react";
import { useParams } from "react-router";
import { useAppSelector } from "../hooks/useAppSelector";

const Settings = () => {
  const { id } = useParams();
  const { currUser } = useAppSelector((state) => state.auth);

  if (!currUser) {
    return <CircularProgress/>;
  }

  const isAuthUserProfile = currUser.uid === id;

  if (!isAuthUserProfile) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This profile doesn't exist
      </Alert>
    );
  }

  return (
    <Grow>
      <div>Settings</div>
    </Grow>
  );
};

export default Settings;
