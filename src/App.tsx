import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Home from "./pages/Home";
import Store from "./pages/Store";
import About from "./pages/About";
import Order from "./pages/Order";
import Navbar from "./components/Navbar";
import ShoppingCardProvider from "./context/ShoppingCardContext";

function App() {
  return (
    <ShoppingCardProvider>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </Container>
    </ShoppingCardProvider>
  );
}

export default App;
