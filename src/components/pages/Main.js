import { Stack } from "@mui/material";
import React from "react";
import ListItems from "../eventList/ListItems";
import EventForm from "../eventForm/EventForm";

const Main = ({ showForm, setShowForm }) => {
  return (
    <main>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-around"
        alignItems="center"
      >
        <ListItems />
        {showForm && <EventForm setShowForm={setShowForm} />}
      </Stack>
    </main>
  );
};

export default Main;
