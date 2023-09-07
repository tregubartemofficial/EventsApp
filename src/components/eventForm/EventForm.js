import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Alert,
  AlertTitle,
  Autocomplete,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import PlaceAutocompleteField from "./PlaceAutocompleteField";
import {
  addEventToFirestore,
  updateEventsInFirestore,
} from "../../app/firebase/firebaseService";
import { toggleModal } from "../../app/features/modal/modalSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";


const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
  venue: yup.string().required("Venue is required"),
  date: yup.date().required("Date is required"),
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuth, currUser } = useAppSelector((state) => state.auth);
  const [selectedVenue, setSelectedVenue] = useState({});
  const event = useAppSelector((state) => {
    if (Array.isArray(state.events?.events)) {
      return state.events?.events.find((e) => e.id === id);
    }
    if (!id) {
      return undefined;
    } else {
      return state.events?.events;
    }
  });

  const cancelButtonLink = id ? `/events/${id}` : "/events";

  const handleSelectedVenue = (data) => setSelectedVenue(data);

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
      title: event?.title || "",
      category: event?.category || null,
      description: event?.description || "",
      venue: event?.venue || "",
      date: event ? new Date(event?.date).toISOString().slice(0, 10) : "",
    },
    onSubmit: async (values) => {
      const data = {
        ...values,
        date: new Date(values.date).getTime(),
        venue: selectedVenue,
      };

      try {
        event
          ? await updateEventsInFirestore(data)
          : await addEventToFirestore(data, currUser);
        navigate("/events");
      } catch (error) {
        console.error(error);
      }
    },
    validationSchema: validationSchema,
  });

  return (
    <>
      {!isAuth && (
        <Alert severity="warning" sx={{ marginTop: 2 }}>
          <AlertTitle>Warning</AlertTitle>
          You should be authorized to create events!
          <strong
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(toggleModal("auth"))}
          >
            SIGN IN
          </strong>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          id="title"
          name="title"
          label="Event title"
          margin="normal"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(touched.title && errors.title)}
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
          multiline
          maxRows={4}
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(touched.description && errors.description)}
          helperText={touched.description && errors.description}
        />
        <PlaceAutocompleteField
          id="venue"
          name="venue"
          label="Venue"
          onBlur={handleBlur}
          setFieldValue={setFieldValue}
          error={Boolean(touched.venue && errors.venue)}
          helperText={touched.venue && errors.venue}
          handleSelectedVenue={handleSelectedVenue}
        />
        <TextField
          id="date"
          type="date"
          name="date"
          margin="normal"
          value={values.date}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(touched.date && errors.date)}
          helperText={touched.date && errors.date}
        />
        <Stack direction="row" justifyContent="space-evenly">
          <Button
            type="submit"
            disabled={!isAuth}
            variant="contained"
            sx={{ width: "40%" }}
          >
            Submit
          </Button>
          <Button
            component={Link}
            to={cancelButtonLink}
            variant="contained"
            color="error"
            sx={{ width: "40%" }}
          >
            Cancel
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default EventForm;
