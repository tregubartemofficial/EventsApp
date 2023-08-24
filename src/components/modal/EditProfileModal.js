import React from "react";
import { ModalWrapper } from "../../app/features/modal/ModalWrapper";
import {
  Avatar,
  Button,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../app/features/modal/modalSlice";
import { updateUserAvatar, updateUserProfile } from "../../app/firebase/firebaseService";

const StyledTitle = styled(Typography)({
  mr: 2,
  flexGrow: 1,
  fontWeight: 700,
  flexWrap: "nowrap",
  letterSpacing: ".3rem",
  color: "inherit",
  textDecoration: "none",
  textAlign: "center",
});

const validationSchema = yup.object({
  name: yup.string(),
  bio: yup.string(),
});

const EditProfileModal = ({ profile }) => {
  const dispatch = useDispatch();
  const handleAvatar = (event) => {
    updateUserAvatar(event.target.files["0"], profile, dispatch);
  }
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, } =
    useFormik({
      initialValues: {
        name: "",
        bio: "",
      },
      onSubmit: ({name, bio}) => {
        updateUserProfile({displayName: name, bio: bio});
        dispatch(toggleModal('editProfile'))
      },
      validationSchema: validationSchema,
    });

  return (
    <ModalWrapper modalId="editProfile">
      <Stack flexDirection="column">
        <StyledTitle variant="h5">EDIT PROFILE</StyledTitle>
        <Avatar
          alt={profile?.displayName}
          src={profile?.photoURL}
          sx={{
            height: 80,
            width: 80,
            margin: 2,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="button-file"
          type="file"
          onChange={handleAvatar}
        />
        <label htmlFor="button-file" style={{ textAlign: "center" }}>
          <Button component="span">Edit picture of avatar</Button>
        </label>
        <form onSubmit={handleSubmit}>
          <TextField
            id="name"
            name="name"
            type="name"
            label="Name"
            margin="normal"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />
          <TextField
            type="bio"
            id="bio"
            name="bio"
            label="Bio"
            multiline
            maxRows={4}
            margin="normal"
            value={values.bio}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.bio && errors.bio)}
            helperText={touched.bio && errors.bio}
          />
          <Button variant="contained" type="submit">
            Save changes
          </Button>
        </form>
      </Stack>
    </ModalWrapper>
  );
};

export default EditProfileModal;
