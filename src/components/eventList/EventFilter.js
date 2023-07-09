import React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../app/features/modal/modalReducer";
import TestModal from '../modal/TestModal'
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";


const EventFilter = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <Button onClick={() => dispatch(toggleModal("modal1"))}>
        Open modal
      </Button>
      <Calendar/>
      <TestModal />
    </div>
  );
};

export default EventFilter;
