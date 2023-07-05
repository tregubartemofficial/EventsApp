import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addEvent, updateEvent } from "../../app/features/event/eventReducer";
import PlaceAutocompleteField from "./PlaceAutocompleteField";

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

const EventForm = () => {
  const dispacth = useDispatch;
  const { id } = useParams();
  const event = useSelector((state) =>
    state.events?.events.find((e) => e.id === id)
  );

  const { values, errors, touched, handleBlur, setFieldValue, handleSubmit } =
    useFormik({
      initialValues: {
        title: event?.title || "",
        category: event?.category || "",
        description: event?.description || "",
        city: event?.city || "",
        street: event?.city?.address || "",
        date: event?.date?.toISOString().slice(0, 10) || "",
      },
      onSubmit: (values) => {
        if (event) {
          dispacth(updateEvent({ ...event, ...values }));
        } else {
          dispacth(
            addEvent({
              ...values,
              id: Math.random(),
              hostedBy: "Bob",
              attendees: [],
              hostPhotoURL: "",
            })
          );
        }
      },
      validationSchema: validationSchema,
    });

  // Reseting Fields
  useEffect(() => {
    setFieldValue("title", event?.title || "");
    setFieldValue("category", event?.category || "");
    setFieldValue("description", event?.description || "");
    setFieldValue("city", event?.city || "");
    setFieldValue("street", event?.city?.address || "");
    setFieldValue("date", event?.date?.toISOString().slice(0, 10) || "");
  }, [setFieldValue, event]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFieldValue(name, value);
  };

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
