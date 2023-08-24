import { Stack } from "@mui/material";
import React from "react";
import ListItems from "../components/eventList/ListItems";
import EventFilter from "../components/eventList/EventFilter";

const Main = () => {
  return (
      <Stack
        direction={{ xs: "column-reverse", sm: "row" }}
        justifyContent="space-around"
        alignItems="flex-start"
      >
        <ListItems />
        <EventFilter/>
      </Stack>
  );
};

export default Main;
