import React from "react";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileContent from "../components/profile/ProfileContent";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getUserProfile } from "../app/firebase/firebaseService";
import {
  setNoProfile,
  setProfile,
} from "../app/features/profile/profileReducer";
import { Alert, AlertTitle } from "@mui/material";

const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currUser } = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);
  (async () => {
    try {
      const profileUser = await getUserProfile(id);
      dispatch(setProfile(profileUser));
    } catch (error) {
      dispatch(setNoProfile());
    }
  })();
  
  const isAuthUserProfile = currUser?.uid === id;

  return (
    <>
      <ProfileHeader profile={profile} isAuthUserProfile={isAuthUserProfile} />
      <ProfileContent profile={profile} />
      {profile.error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          This profile doesn`t exist
        </Alert>
      )}
    </>
  );
};

export default Profile;