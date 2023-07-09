import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PlaceAutocompleteField from "./PlaceAutocompleteField";
import {
  addEventToFirestore,
  updateEventsInFirestore,
} from "../../app/firebase/firebaseService";

const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
  city: yup.string().required("City is required"),
  street: yup.string().required("Street is required"),
  date: yup.string().required("Date is required"),
});

const categoryList = [
  "Music",
  "Visual Arts",
  "Performing Arts",
  "Film",
  "Lectures & Books",
  "Food & Drink",
  "Festivals & Fairs",
  "Charities",
  "Sports & Active Life",
  "Nightlife",
  "Kids & Family",
];

const toTimestamp = (strDate) => Date.parse(strDate) / 1000;

const EventForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const event = useSelector((state) => {
    if (Array.isArray(state.events?.events)) {
      return state.events?.events.find((e) => e.id === id);
    }
    if (!id) {
      return undefined;
    } else {
      return state.events?.events;
    } 
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = useFormik({
    initialValues: {
      title: "" || event?.title,
      category: event?.category || "",
      description: event?.description || "",
      city: event?.city?.address || "",
      street: event?.city?.address || "",
      date: event ? new Date(event?.date).toISOString().slice(0, 10) : "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      const data = {
        ...values,
        date: toTimestamp(values.date),
      };
      try {
        event
          ? await updateEventsInFirestore(data)
          : await addEventToFirestore(data);
        setSubmitting(false);
        navigate("/events");
      } catch (error) {
        // need to load toast
        console.log(error);
        setSubmitting(false);
      }
    },
    validationSchema: validationSchema,
  });
  
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="title"
        name="title"
        label="Event title"
        margin="normal"
        value={values.title}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.title && Boolean(errors.title)}
        helperText={touched.title && errors.title}
      />
      <Autocomplete
        autoSelect
        autoComplete
        options={categoryList}
        value={values.category}
        onChange={(e, value) => {
          setFieldValue("category", value);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            id="category"
            name="category"
            label="Category"
            margin="normal"
            value={values.category}
            onBlur={handleBlur}
            error={Boolean(touched.category && errors.category)}
            helperText={touched.category && errors.category}
          />
        )}
      />
      <TextField
        id="description"
        name="description"
        label="Description"
        margin="normal"
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.description && Boolean(errors.description)}
        helperText={touched.description && errors.description}
      />
      <PlaceAutocompleteField
        id="city"
        name="city"
        label="City"
        onBlur={handleBlur}
        setFieldValue={setFieldValue}
        error={touched.city && Boolean(errors.city)}
        helperText={touched.city && errors.city}
      />
      <PlaceAutocompleteField
        id="street"
        name="street"
        label="Street"
        setFieldValue={setFieldValue}
        onBlur={handleBlur}
        error={touched.street && Boolean(errors.street)}
        helperText={touched.street && errors.street}
      />
      <TextField
        id="date"
        type="date"
        name="date"
        margin="normal"
        value={values.date}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.date && Boolean(errors.date)}
        helperText={touched.date && errors.date}
      />
      <Stack direction="row" justifyContent="space-evenly">
        <Button type="submit" variant="contained" sx={{ width: "40%" }}>
          Submit
        </Button>
        <Button
          component={Link}
          to="/events"
          variant="contained"
          color="error"
          sx={{ width: "40%" }}
        >
          Cancel
        </Button>
      </Stack>
    </form>
  );
};

export default EventForm;
