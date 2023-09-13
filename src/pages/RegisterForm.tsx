import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  Button,
  Card,
  Divider,
  FormHelperText,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router";
import {
  registerWithEmailAndPassword,
  socialLogin,
} from "../app/firebase/firebaseService";
import { useAppDispatch } from "../hooks/useAppDispatch";

const validationSchema = yup.object({
  email: yup
    .string()
    .matches(
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email format"
    )
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password is too short - should be 6 chars minimum.")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Password can only contain Latin letters and numbers."
    ),
  name: yup.string().required("Name is required"),
});

const RegisterForm = () => {
  const [helperText, setHelperText] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        name: "",
      },
      onSubmit: ({ email, password, name }) => {
        registerWithEmailAndPassword(
          email,
          password,
          name,
          dispatch,
          setHelperText,
          navigate
        );
      },
      validationSchema: validationSchema,
    });
  return (
    <Stack
      flexDirection="column"
      component={Card}
      sx={{ margin: "auto", maxWidth: 900, py: 5, px: 3, mt: 5 }}
    >
      <Typography textAlign='center' variant="h6">CREATE ACCOUNT</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          type="email"
          id="email"
          name="email"
          label="Email"
          margin="normal"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(touched.email && errors.email)}
          helperText={touched.email && errors.email}
        />
        <TextField
          type="password"
          id="password"
          name="password"
          label="Password"
          margin="normal"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(touched.password && errors.password)}
          helperText={touched.password && errors.password}
        />
        <TextField
          id="name"
          name="name"
          label="Name"
          margin="normal"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(touched.name && errors.name)}
          helperText={touched.name && errors.name}
        />
        <FormHelperText error={true} sx={{ fontSize: "1rem" }}>
          {helperText}
        </FormHelperText>
        <Button type="submit" variant="contained">REGISTER</Button>
      </form>
      <Divider sx={{ my: 1 }}>Or</Divider>
      <IconButton
        sx={{ borderRadius: 0 }}
        onClick={() => {
          socialLogin(dispatch, navigate);
        }}
      >
        <GoogleIcon />
      </IconButton>
    </Stack>
  );
};

export default RegisterForm;
