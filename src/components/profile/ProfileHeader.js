import React from "react";
import { Avatar, Button, Card, Stack, Typography } from "@mui/material";
import EditProfileModal from "../modal/EditProfileModal";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../app/features/modal/modalReducer";

const ProfileHeader = ({ profile, isAuthUserProfile }) => {
  const dispatch = useDispatch();
  return (
    <>
      <Card sx={{ marginTop: 2, marginBottom: 2 }}>
        <Stack sx={{ marginTop: 2, marginBottom: 2 }}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-around"
            alignItems="center"
            sx={{ marginBottom: 2 }}
          >
            <Stack alignItems="center">
              <Avatar
                alt={profile?.displayName}
                src={profile?.photoURL}
                sx={{ height: 80, width: 80 }}
              />
              <Typography>{profile?.displayName}</Typography>
            </Stack>
            <Typography variant="h6">{profile.followers} Followers</Typography>
            <Typography variant="h6">{profile.following} Following</Typography>
          </Stack>
          <Stack flexDirection="row" justifyContent="space-around">
            {isAuthUserProfile && (
              <Button
                onClick={() => dispatch(toggleModal("editProfile"))}
                variant="contained"
                sx={{ width: "45%" }}
                disabled={profile.error}
              >
                Edit Profile
              </Button>
            )}
            {!isAuthUserProfile && (
              <Button
                variant="contained"
                sx={{ width: "45%" }}
                disabled={profile.error}
              >
                Follow
              </Button>
            )}

            <Button
              variant="contained"
              sx={{ width: "45%" }}
              disabled={profile.error}
            >
              Share profile
            </Button>
          </Stack>
        </Stack>
      </Card>
      <EditProfileModal profile={profile} />
    </>
  );
};

export default ProfileHeader;
