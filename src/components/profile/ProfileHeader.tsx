import React, { useState } from "react";
import {
  Alert,
  Avatar,
  Button,
  Card,
  Grow,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import EditProfileModal from "../modal/EditProfileModal";
import { toggleModal } from "../../app/features/modal/modalSlice";
import copy from "clipboard-copy";
import { grey } from "@mui/material/colors";
import { ProfileState } from "../../app/features/profile/profileSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";

type ProfileHeaderProps = { profile: ProfileState; isAuthUserProfile: boolean };

const ProfileHeader = ({ profile, isAuthUserProfile }: ProfileHeaderProps) => {
  const dispatch = useAppDispatch();
  const [openMessage, setOpenMessage] = useState(false);

  const handleCopyURL = () => {
    setOpenMessage(true);
    copy(window.location.href);
  };

  return (
    <>
      <Grow in={true}>
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
              <Stack>
                <Typography variant="h5">{profile.followers}</Typography>
                <Typography variant="h6" color={grey[700]}>
                  Followers
                </Typography>
              </Stack>
              <Stack>
                <Typography variant="h5">{profile.followers}</Typography>
                <Typography variant="h6" color={grey[700]}>
                  Following
                </Typography>
              </Stack>
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
                onClick={() => handleCopyURL()}
              >
                Share profile
              </Button>
              <Snackbar
                open={openMessage}
                autoHideDuration={2500}
                onClose={() => setOpenMessage(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              >
                <Alert
                  color="success"
                  severity="success"
                  sx={{ bgcolor: grey[900] }}
                >
                  Profile URL copied
                </Alert>
              </Snackbar>
            </Stack>
          </Stack>
        </Card>
      </Grow>

      <EditProfileModal profile={profile} />
    </>
  );
};

export default ProfileHeader;
