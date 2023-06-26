import { Container } from "@mui/material";
import NavBar from "./components/nav/NavBar";
import Main from "./components/pages/Main";
import { Route, Routes } from "react-router";
import EventForm from "./components/eventForm/EventForm";
import Home from "./components/pages/Home";
import EventDetailed from './components/pages/EventDetailed'

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route index element={<Home />} />
      </Routes>
      <Container>
        <Routes>
          <Route path="/events" element={<Main />} />
          <Route path="/events/:id" element={<EventDetailed />} />
          <Route path="/createEvent" element={<EventForm />} />
          <Route path="/manage/:id" element={<EventForm />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
