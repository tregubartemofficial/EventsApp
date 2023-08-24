import { Alert, AlertTitle, CircularProgress } from "@mui/material";
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
};

export default Settings;
