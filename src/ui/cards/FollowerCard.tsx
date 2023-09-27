import React from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { toggleModal } from "../../app/features/modal/modalSlice";
import { grey } from "@mui/material/colors";
import { Stack, Typography } from "@mui/material";
import { User } from "../../app/features/auth/authSlice";

type FollowerCardProps = { profile: User; type: "follower" | "following" };

const FollowerCard = ({ profile, type }: FollowerCardProps) => {
  const dispatch = useAppDispatch();
  return (
    <Stack
      alignItems="center"
      sx={{ cursor: "pointer" }}
      onClick={() => dispatch(toggleModal(type))}
    >
      <Typography variant="h5" color={grey[700]}>
        {type === "follower"
          ? profile.followerUIDs?.length
          : profile.followingUIDs?.length}
      </Typography>
      <Typography variant="h6" color={grey[700]}>
        {type === "follower" ? "Followers" : "Following"}
      </Typography>
    </Stack>
  );
};

export default FollowerCard;
