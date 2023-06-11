import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const EventForm = ({setShowForm}) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      description: "",
      city: "",
      street: "",
      data: "",
    },
  });

  return (
    <form>
      <KeyboardArrowDownIcon onClick={() => setShowForm(false)} />
      <TextField id="title" name="title" label="Event title" margin="normal" />
      <TextField
        id="category"
        name="category"
        label="Category"
        margin="normal"
      />
      <TextField
        id="description"
        name="description"
        label="Description"
        margin="normal"
      />
      <TextField id="city" name="city" label="City" margin="normal" />
      <TextField id="street" name="street" label="Street" margin="normal" />
      <TextField id="data" type="date" name="data" margin="normal" />
      <Button variant="contained">Submit</Button>
    </form>
  );
};

export default EventForm;
