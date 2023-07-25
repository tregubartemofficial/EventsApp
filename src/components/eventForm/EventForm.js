import React from "react";
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
import { useDispatch, useSelector } from "react-redux";
import PlaceAutocompleteField from "./PlaceAutocompleteField";
import {
  addEventToFirestore,
  updateEventsInFirestore,
} from "../../app/firebase/firebaseService";
import { toggleModal } from "../../app/features/modal/modalReducer";

const apiKey = "GgFavlAqzd0k4TxkgANMCXD23Kc4lF9S";

const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
  venue: yup.string().required("Venue is required"),
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuth, currUser } = useSelector((state) => state.auth);
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
      title: event?.title || '',
      category: event?.category || null,
      description: event?.description || "",
      venue: event?.venue?.address || "",
      date: event ? new Date(event?.date).toISOString().slice(0, 10) : "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      console.log(44564);
      const data = {
        ...values,
        date: toTimestamp(values.date),
      };

      try {
        event
          ? await updateEventsInFirestore(data)
          : await addEventToFirestore(data, currUser);
        setSubmitting(false);
        navigate("/events");
      } catch (error) {
        console.log(error);
        setSubmitting(false);
      }
    },
    validationSchema: validationSchema,
  });

  return (
    <>
      {!isAuth && (
        <Alert severity="warning" sx={{ marginTop: 2 }}>
          <AlertTitle>Warning</AlertTitle>
          You should be authorized to create events!{" "}
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
          multiline
          maxRows={4}
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.description && Boolean(errors.description)}
          helperText={touched.description && errors.description}
        />
        <PlaceAutocompleteField
          id="venue"
          name="venue"
          label="Venue"
          value={values.venue}
          onBlur={handleBlur}
          setFieldValue={setFieldValue}
          error={touched.venue && Boolean(errors.venue)}
          helperText={touched.venue && errors.venue}
          apiKey={apiKey}
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
            to="/events"
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
