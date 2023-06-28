import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Stack, TextField } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addEvent, updateEvent } from "../../app/features/event/eventReducer";

const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
  city: yup.string().required("City is required"),
  street: yup.string().required("Street is required"),
  date: yup.string().required("Date is required"),
});

const EventForm = () => {
  const dispacth = useDispatch
  const { id } = useParams();
  const event = useSelector((state) =>
    state.events?.events.find((e) => e.id === id)
  );

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
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
        } 
        else {
          dispacth(addEvent({...values, id: Math.random(), hostedBy: 'Bob', attendees: [],  hostPhotoURL: '' }))
        }
      },
      validationSchema: validationSchema,
    });

// Reseting Fields 
  useEffect(() => {
    handleChange({
      target: {
        name: "title",
        value: event?.title || "",
      },
    });
    handleChange({
      target: {
        name: "category",
        value: event?.category || "",
      },
    });
    handleChange({
      target: {
        name: "description",
        value: event?.description || "",
      },
    });
    handleChange({
      target: {
        name: "city",
        value: event?.city || "",
      },
    });
    handleChange({
      target: {
        name: "street",
        value: event?.city?.address || "",
      },
    });
    handleChange({
      target: {
        name: "date",
        value: event?.date?.toISOString().slice(0, 10) || "",
      },
    });
  }, [handleChange, event]);

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
      <TextField
        id="category"
        name="category"
        label="Category"
        margin="normal"
        value={values.category}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.category && Boolean(errors.category)}
        helperText={touched.category && errors.category}
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
      <TextField
        id="city"
        name="city"
        label="City"
        margin="normal"
        value={values.city}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.city && Boolean(errors.city)}
        helperText={touched.city && errors.city}
      />
      <TextField
        id="street"
        name="street"
        label="Street"
        margin="normal"
        value={values.street}
        onChange={handleChange}
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
