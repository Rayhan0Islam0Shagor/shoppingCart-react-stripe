import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import CartModal from "./CartModal";
import { useCart } from "../context/CartContext";

function Header() {
  const { items } = useCart();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Navbar.Brand>Shopping mart</Navbar.Brand>
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button variant="outline-primary" onClick={handleShow}>
            Cart {items.length} Items
          </Button>
        </Navbar.Collapse>
      </Navbar>

      <CartModal show={show} handleClose={handleClose} />
    </>
  );
}

export default Header;
