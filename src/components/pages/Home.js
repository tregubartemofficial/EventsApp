import { Box, Button, styled } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const gradientAnimation = `@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}`;

const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: `linear-gradient(0deg, #a852ee, #00f6ff, #23a6d5, #1976d2)`,
  animation: `${gradientAnimation} 1s ease infinite`,
});



const Home = () => {
  // Animation doesnt work
  return (
    <StyledBox
      sx={{
        minHeight: { sm: "91vh", xs: "92vh" },
        animation: `${gradientAnimation} 1s ease infinite`
      }}
    >
      <Button component={Link} to="./events" variant="outlined" size="large">
        Get started!
      </Button>
    </StyledBox>
  );
};

export default Home;
