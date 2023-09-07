import React, { useState } from "react";
import { ModalWrapper } from "../../app/features/modal/ModalWrapper";
import {
  Button,
  Divider,
  FormHelperText,
  IconButton,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { toggleModal } from "../../app/features/modal/modalSlice";
import {
  logInWithEmailAndPassword,
  socialLogin,
} from "../../app/firebase/firebaseService";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const StyledTitle = styled(Typography)({
  mr: 2,
  flexGrow: 1,
  fontFamily: "monospace",
  fontWeight: 700,
  flexWrap: "nowrap",
  letterSpacing: ".3rem",
  color: "inherit",
  textDecoration: "none",
  textAlign: "center",
});

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
});

const AuthModal = () => {
  const [helperText, setHelperText] = useState("");
  const dispatch = useAppDispatch();
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: ({ email, password }) => {
        logInWithEmailAndPassword(email, password, dispatch, setHelperText);
      },

      validationSchema: validationSchema,
    });
  return (
    <ModalWrapper modalId="auth">
      <Stack flexDirection="column">
        <StyledTitle variant="h6">EVENTAPP</StyledTitle>
        <form onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            margin="normal"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
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
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          <FormHelperText error={true} sx={{ fontSize: "1rem" }}>
            {helperText}
          </FormHelperText>
          <Button type="submit" variant="contained">
            Sign In
          </Button>
        </form>
        <Typography sx={{ textAlign: "center", mt: 1 }}>
          Don't have an account?
          <Button
            component={Link}
            to="/register"
            onClick={() => dispatch(toggleModal("auth"))}
            size="small"
          >
            Log In
          </Button>
        </Typography>
        <Divider sx={{ my: 1 }}>Or</Divider>
        <IconButton
          sx={{ borderRadius: 0 }}
          onClick={() => {
            socialLogin(dispatch);
            dispatch(toggleModal("auth"));
          }}
        >
          <GoogleIcon />
        </IconButton>
      </Stack>
    </ModalWrapper>
  );
};

export default AuthModal;
