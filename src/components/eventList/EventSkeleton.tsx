import React from "react";
import { ListItemText, Skeleton, Stack } from "@mui/material";

const EventSkeleton = ({detailed = false}) => {
  return (
    <Stack
      spacing={1}
      sx={{ width: { xs: "100%", sm: "30%" }, mt: 2 }}
      component="section"
    >
      <Stack direction="row" alignItems="center" spacing={3}>
        <Skeleton variant="circular" width={40} height={40} />
        <ListItemText primary={<Skeleton />} />
      </Stack>
      <Skeleton variant="rectangular" height={170} />
      {detailed && <Skeleton variant="rectangular" height={170} /> }
    </Stack>
  );
};

export default EventSkeleton;