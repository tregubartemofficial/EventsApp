import React, { useEffect } from "react";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileContent from "../components/profile/ProfileContent";
import { useParams } from "react-router";
import { getUserProfile } from "../app/firebase/firebaseService";
import {
  setNoProfile,
  setProfile,
} from "../app/features/profile/profileSlice";
import { Alert, AlertTitle } from "@mui/material";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { currUser } = useAppSelector((state) => state.auth);
  const profile = useAppSelector((state) => state.profile);
  
  useEffect(() => {
    const fetchUserProfileData = async () => {
      try {
        const profileUser = await getUserProfile(id);
        dispatch(setProfile(profileUser));
      } catch (error) {
        dispatch(setNoProfile());
      }
    };

    fetchUserProfileData();
  }, [id, dispatch]);

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