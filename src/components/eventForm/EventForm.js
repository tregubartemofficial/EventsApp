import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
  city: yup.string().required("City is required"),
  street: yup.string().required("Street is required"),
  date: yup.string().required("Date is required"),
});

const EventForm = ({ setShowForm }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      description: "",
      city: "",
      street: "",
      date: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values));
    },
    validationSchema: validationSchema
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <KeyboardArrowDownIcon onClick={() => setShowForm(false)} />
      <TextField
        id="title"
        name="title"
        label="Event title"
        margin="normal"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />
      <TextField
        id="category"
        name="category"
        label="Category"
        margin="normal"
        value={formik.values.category}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.category && Boolean(formik.errors.category)}
        helperText={formik.touched.category && formik.errors.category}
      />
      <TextField
        id="description"
        name="description"
        label="Description"
        margin="normal"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />
      <TextField
        id="city"
        name="city"
        label="City"
        margin="normal"
        value={formik.values.city}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.city && Boolean(formik.errors.city)}
        helperText={formik.touched.city && formik.errors.city}
      />
      <TextField
        id="street"
        name="street"
        label="Street"
        margin="normal"
        value={formik.values.street}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.street && Boolean(formik.errors.street)}
        helperText={formik.touched.street && formik.errors.street}
      />
      <TextField
        id="date"
        type="date"
        name="date"
        margin="normal"
        value={formik.values.date}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.date && Boolean(formik.errors.date)}
        helperText={formik.touched.date && formik.errors.date}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
};

export default EventForm;
