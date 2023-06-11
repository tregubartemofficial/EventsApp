import { Container } from "@mui/material";
import NavBar from "./components/nav/NavBar";
import Main from "./components/pages/Main";
import { useState } from "react";

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <NavBar setShowForm={setShowForm} />
      <Container>
        <Main showForm={showForm} setShowForm={setShowForm} />
      </Container>
    </>
  );
}

export default App;
