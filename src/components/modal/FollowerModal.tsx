import React, { useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { ModalWrapper } from "../../ui/modal/ModalWrapper";
import { Divider, IconButton, List, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toggleModal } from "../../app/features/modal/modalSlice";
import { getUserProfile } from "../../app/firebase/firebaseService";
import { setFollowingProfiles } from "../../app/features/profile/profileSlice";
import { User } from "../../app/features/auth/authSlice";
import ProfileListItem from "../../ui/listItems/ProfileListItem";

type FollowingModalProps = {
  profile: User;
  type: "following" | "follower";
};

const FollowerModal = ({ profile, type }: FollowingModalProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUserProfileData = async () => {
      try {
        const profileUser = await getUserProfile(
          type === "following" ? profile.followingUIDs! : profile.followerUIDs!
        );
        dispatch(setFollowingProfiles(profileUser as User[]));
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfileData();
  }, [profile.followingUIDs, profile.followerUIDs, type, dispatch]);

  return (
    <ModalWrapper modalId={type}>
      <Stack spacing={2}>
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction="row"
        >
          <Typography variant="h5">
            {type === "follower" ? "Followers" : "Following"}
          </Typography>
          <IconButton onClick={() => dispatch(toggleModal(type))}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Divider />
        <List>
          {profile.followingProfiles?.map((profile) => (
            <ProfileListItem key={profile.uid} profile={profile} type={type} />
          ))}
        </List>
      </Stack>
    </ModalWrapper>
  );
};

export default FollowerModal;
