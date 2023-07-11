import React, { useState } from "react";
import axios from "axios";
import { Autocomplete, TextField } from "@mui/material";

const PlaceAutocomplete = ({
  label,
  id,
  name,
  onBlur,
  error,
  helperText,
  setFieldValue,
  apiKey,
}) => {
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (event) => {
    const inputValue = event.target.value;
    axios
      .get(
        `https://api.tomtom.com/search/2/search/${encodeURIComponent(
          inputValue
        )}.json?key=${apiKey}&countrySet=UA`
      )
      .then((response) => {
        const { results } = response.data;
        const placeSuggestions = results.map((result, index) => ({
          id: index.toString(),
          label: result.address.freeformAddress,
        }));
        setSuggestions(placeSuggestions);
      })
      .catch((error) => {
        console.error("Error fetching place suggestions:", error);
      });
  };

  return (
    <Autocomplete
      freeSolo
      getOptionLabel={(option) => option.label || ""}
      options={suggestions}
      onChange={(e, value) => setFieldValue(name, value?.label)}
      renderInput={(params) => (
        <TextField
          sx={{ minWidth: 300 }}
          {...params}
          id={id}
          name={name}
          label={label}
          onChange={handleInputChange}
          margin="normal"
          onBlur={onBlur}
          helperText={helperText}
          error={error}
          fullWidth
        />
      )}
    />
  );
};

export default PlaceAutocomplete;
