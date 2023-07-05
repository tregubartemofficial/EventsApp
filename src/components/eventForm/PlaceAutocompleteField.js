import React, { useState } from "react";
import axios from "axios";
import { Autocomplete, TextField } from "@mui/material";

const apiKey = "GgFavlAqzd0k4TxkgANMCXD23Kc4lF9S";

const PlaceAutocomplete = ({
  label,
  id,
  name,
  onBlur,
  error,
  helperText,
  setFieldValue,
}) => {
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (event) => {
    const inputValue = event.target.value;

    try {
      const response = await axios.get(
        `https://api.tomtom.com/search/2/search/${encodeURIComponent(
          inputValue
        )}.json?key=${apiKey}&countrySet=UA`
      );

      const { results } = response.data;
      const placeSuggestions = results.map((result, index) => ({
        id: index.toString(),
        label: result.address.freeformAddress,
      }));
      setSuggestions(placeSuggestions);
    } catch (error) {
      console.error("Error fetching place suggestions:", error);
    }
  };

  return (
    <Autocomplete
      freeSolo
      getOptionLabel={(option) => option.label || ''}
      options={suggestions}
      onChange={(e, value) => setFieldValue(name, value?.label)}
      renderInput={(params) => (
        <TextField
          sx={{ minWidth: 300 }}
          {...params}
          key={`${Math.random}`}
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
    //   renderOption={(option) => <div key={option.id}>{option.label}</div>}
    />
  );
};

export default PlaceAutocomplete;
