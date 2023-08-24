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
  handleSelectedVenue,
}) => {
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (event) => {
    const inputValue = event.target.value;

    if (!inputValue) return;

    try {
      const response = await axios.get(
        `https://api.tomtom.com/search/2/search/${encodeURIComponent(
          inputValue
        )}.json?key=${apiKey}&idxSet=POI&typeahead=true`
      );

      const { results } = response.data;

      const placeSuggestions = results.map((result, index) => ({
        id: index.toString(),
        name: result.poi.name,
        address: result.address.freeformAddress,
        latLon: result.entryPoints[0].position,
      }));
      setSuggestions([{ id: 11, address: inputValue }, ...placeSuggestions]);
    } catch (error) {
      console.error("Error fetching place suggestions:", error);
    }
  };

  return (
    <Autocomplete
      freeSolo
      getOptionLabel={(option) => option.address || ""}
      onChange={(e, value) => {
        handleSelectedVenue(value);
        setFieldValue(name, value?.address);
      }}
      options={suggestions}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.id}>
            {option.address}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          id={id}
          name={name}
          label={label}
          onChange={handleInputChange}
          margin="normal"
          onBlur={onBlur}
          helperText={helperText}
          error={error}
        />
      )}
    />
  );
};

export default PlaceAutocomplete;
