import { Alert, AlertTitle } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const Settings = () => {
  const { id } = useParams();
  const { currUser } = useSelector((state) => state.auth);
  const isAuthUserProfile = currUser.uid === id;  

  return (
    !isAuthUserProfile && (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This profile doesn`t exist
      </Alert>
    )
  );
};

export default Settings;
