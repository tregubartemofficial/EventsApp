import { Box, Button, styled } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// const gradientAnimation = `@keyframes gradient {
//   0% {
//     background-position: 0% 50%;
//   }
//   50% {
//     background-position: 100% 50%;
//   }
//   100% {
//     background-position: 0% 50%;
//   }
// }`;

const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: `linear-gradient(0deg, #c8ee52d1, #ffd100, #23a6d5, #1976d2);`,
});

const Home = () => {
  // Animation doesnt work
  return (
    <StyledBox
      sx={{
        minHeight: { sm: "91vh", xs: "92vh" },
      }}
    >
      <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
        <Button component={Link} to="./events" variant="outlined" size="large">
          Get started!
        </Button>
      </motion.div>
    </StyledBox>
  );
};

export default Home;
