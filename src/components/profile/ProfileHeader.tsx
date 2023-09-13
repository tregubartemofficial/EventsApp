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
import { updateFollowers } from "../../app/firebase/firebaseService";

type ProfileHeaderProps = {
  currUserUid: string;
  profile: ProfileState;
  isAuth: boolean;
  isFollowing: boolean;
  isAuthUserProfile: boolean;
};

const ProfileHeader = ({
  profile,
  currUserUid,
  isAuth,
  isFollowing,
  isAuthUserProfile,
}: ProfileHeaderProps) => {
  const dispatch = useAppDispatch();
  const [openMessage, setOpenMessage] = useState(false);

  const handleCopyURL = () => {
    setOpenMessage(true);
    copy(window.location.href);
  };

  return (
    <>
      <Grow in={true}>
        <Card sx={{ my: 2 }}>
          <Stack sx={{ my: 2 }}>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-around"
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Stack alignItems="center">
                <Avatar
                  alt={profile?.displayName}
                  src={profile?.photoURL}
                  sx={{ height: 80, width: 80 }}
                />
                <Typography>{profile?.displayName}</Typography>
              </Stack>
              <Stack alignItems="center">
                <Typography variant="h5" color={grey[700]}>
                  {profile.followerUIDs?.length}
                </Typography>
                <Typography variant="h6" color={grey[700]}>
                  Followers
                </Typography>
              </Stack>
              <Stack alignItems="center">
                <Typography variant="h5" color={grey[700]}>
                  {profile.followingUIDs?.length}
                </Typography>
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
              {!isAuthUserProfile && isAuth && !isFollowing && (
                <Button
                  variant="contained"
                  sx={{ width: "45%" }}
                  disabled={profile.error}
                  onClick={() =>
                    updateFollowers(currUserUid, profile.uid, "FOLLOW", dispatch)
                  }
                >
                  Follow
                </Button>
              )}
              {!isAuthUserProfile && isAuth && isFollowing && (
                <Button
                  variant="contained"
                  sx={{ width: "45%" }}
                  disabled={profile.error}
                  onClick={() =>
                    updateFollowers(currUserUid, profile.uid, "UNFOLLOW", dispatch)
                  }
                >
                  Unfollow
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
