import { Stack } from "@mui/material";
import React from "react";
import ListItems from "../eventList/ListItems";
import EventFilter from "../eventList/EventFilter";

const Main = () => {
  return (
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-around"
        alignItems="flex-start"
      >
        <ListItems />
        <EventFilter/>
      </Stack>
  );
};

export default Main;
