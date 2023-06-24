import { Stack } from "@mui/material";
import React from "react";
import ListItems from "../eventList/ListItems";
import EventFilter from "../eventList/EventFilter";

const Main = () => {
  return (
    <main>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-around"
        alignItems="center"
      >
        <ListItems />
        <EventFilter/>
      </Stack>
    </main>
  );
};

export default Main;
