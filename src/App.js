import { Route, Routes } from "react-router";
import { Container as Con } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "./components/nav/NavBar";
import Main from "./components/pages/Main";
import EventForm from "./components/eventForm/EventForm";
import Home from "./components/pages/Home";
import EventDetailed from "./components/pages/EventDetailed";
import RegisterForm from "./components/pages/RegisterForm";
import "react-toastify/dist/ReactToastify.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
// const lightTheme = createTheme({
//   palette: {
//     mode: "light",
//   },
// });

function App() {
  // prettier-ignore
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/events"
          element={<Con><Main /></Con>}
        />
        <Route
          path="/events/:id"
          element={<Con><EventDetailed /></Con>}
        />
        <Route
          path="/createEvent"
          element={<Con><EventForm /></Con>}
        />
        <Route
          path="/manage/:id"
          element={<Con><EventForm /></Con>}
        />
        <Route
          path="/register"
          element={<Con><RegisterForm /></Con>}
        />
      </Routes>
    </ThemeProvider>
  );
  // prettier-ignore-end
}

export default App;
