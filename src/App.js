import { Container } from "@mui/material";
import NavBar from "./components/nav/NavBar";
import Main from "./components/pages/Main";
import { useState } from "react";
import { Route, Routes } from "react-router";
import EventForm from "./components/eventForm/EventForm";
import Home from "./components/pages/Home";

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <NavBar setShowForm={setShowForm} />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Container>
        <Routes>
          <Route
            path="/events"
            element={<Main showForm={showForm} setShowForm={setShowForm} />}
          />
          <Route path="/events/:id" element={<Home />} />
          <Route path="/createEvent" element={EventForm} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
