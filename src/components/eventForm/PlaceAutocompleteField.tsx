import React, { useState } from "react";
import axios from "axios";
import { Autocomplete, TextField } from "@mui/material";

// type TomTomResult = {
// }

type Place = {
  id: string;
  name: string;
  address?: string;
  latLon: {
    lat: number;
    lon: number;
  }

}

type PlaceAutocompleteProps = {
  label: string;
  id: string;
  name: string;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error: boolean;
  helperText: string;
  setFieldValue: (field: string, value: any) => void;
  handleSelectedVenue: (place: Place) => void;
}

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
}: PlaceAutocompleteProps) => {
  const [suggestions, setSuggestions] = useState<Place[]>([]);

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;

    if (!inputValue) return;

    try {
      const response = await axios.get(
        `https://api.tomtom.com/search/2/search/${encodeURIComponent(
          inputValue
        )}.json?key=${apiKey}&idxSet=POI&typeahead=true`
      );

      const { results } = response.data;
      console.log(results);
      

      const placeSuggestions = results.map((result:any, index: number) => ({
        id: index.toString(),
        name: result.poi.name,
        address: result.address.freeformAddress,
        latLon: result.entryPoints[0].position,
      }));
      setSuggestions([{ id: "11", address: inputValue }, ...placeSuggestions]);
    } catch (error) {
      console.error("Error fetching place suggestions:", error);
    }
  };

  return (
    <Autocomplete
      freeSolo
      getOptionLabel={(option:any) => option.address || ""}
      onChange={(e, value: any) => {
        handleSelectedVenue(value);
        setFieldValue(name, value?.address);
      }}
      options={suggestions}
      renderOption={(props, option: Place) => {
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
