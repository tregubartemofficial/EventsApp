import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, FormHelperText, Stack, TextField } from "@mui/material";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { signIn } from "../../app/features/auth/authReducer";

const validationSchema = yup.object({
  email: yup.string().email("Not a proper email").required("Email is required"),
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

const registerWithEmailAndPassword = async (
  email,
  password,
  name,
  dispatch,
  setSubmitting,
  setHelperText,
  navigate
) => {
  const auth = getAuth();
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(user);
    dispatch(
      signIn({
        email: user.email,
        photoURL: null,
        uid: user.uid,
        displayName: name,
      })
    );
    setSubmitting(false);
    navigate("/events");
  } catch (error) {
    setHelperText(`Problem with username or password`);
    setSubmitting(false);
  }
};

const RegisterForm = () => {
  const [helperText, setHelperText] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        name: "",
      },
      onSubmit: ({ email, password, name }, { setSubmitting }) => {
        registerWithEmailAndPassword(
          email,
          password,
          name,
          dispatch,
          setSubmitting,
          setHelperText,
          navigate
        );
      },
      validationSchema: validationSchema,
    });
  return (
    <Stack flexDirection="column">
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
        <FormHelperText error={true} sx={{fontSize:'1rem'}}>{helperText}</FormHelperText>
        <Button type="submit">Log In</Button>
      </form>
    </Stack>
  );
};

export default RegisterForm;
