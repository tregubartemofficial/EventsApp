import { Route, Routes } from "react-router";
import { Container as Con } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "./components/navigation/NavBar";
import Main from "./pages/Main";
import EventForm from "./components/eventForm/EventForm";
import Home from "./pages/Home";
import EventDetailed from "./pages/EventDetailed";
import RegisterForm from "./pages/RegisterForm";
import "react-toastify/dist/ReactToastify.css";
// import "react-calendar/dist/Calendar.css";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";


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
          element={
            <Con component="main">
              <Main />
            </Con>
          }
        />
        <Route
          path="/events/:id"
          element={
            <Con component="main">
              <EventDetailed />
            </Con>
          }
        />
        <Route
          path="/events/:id"
          element={
            <Con component="main">
              <EventDetailed />
            </Con>
          }
        />
        <Route
          path="/events/:id"
          element={
            <Con component="main">
              <EventDetailed />
            </Con>
          }
        />
        <Route
          path="/createEvent"
          element={
            <Con component="main">
              <EventForm />
            </Con>
          }
        />
        <Route
          path="/manage/:id"
          element={
            <Con component="main">
              <EventForm />
            </Con>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <Con component="main">
              <Profile />
            </Con>
          }
        />
        <Route
          path="/settings/:id"
          element={
            <Con component="main">
              <Settings />
            </Con>
          }
        />
        <Route
          path="/register"
          element={
            <Con component="main">
              <RegisterForm />
            </Con>
          }
        />
      </Routes>
    </ThemeProvider>
  );
  // prettier-ignore-end
}

export default App;
