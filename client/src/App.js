import React from "react";
import Container from "react-bootstrap/Container";
import Header from "./components/Header";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Store from "./pages/Store";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import CartProvider from "./context/CartContext";

function App() {
  return (
    <Router>
      <Container>
        <CartProvider>
          <Header />

          <Routes>
            <Route index element={<Store />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          </Routes>
        </CartProvider>
      </Container>
    </Router>
  );
}

export default App;
