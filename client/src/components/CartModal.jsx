import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useCart } from "../context/CartContext";
import CartProduct from "./CartProduct";

const CartModal = ({ show, handleClose }) => {
  const { items, getTotalCost } = useCart();

  if (items.length === 0) {
    handleClose();
  }

  const checkout = async () => {
    await fetch("https://shopping-cart-sable-nine.vercel.app/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.url) {
          window.location.assign(data.url);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className="bg-dark text-white">
        <Modal.Title className="fst-normal">
          You have <span className="text-info fw-bold">{items.length}</span>{" "}
          Items in cart
        </Modal.Title>

        <Modal.Title>
          Total:{" "}
          <span className="text-info fw-bold">
            ${getTotalCost().toFixed(2)}
          </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {items.map((item) => (
          <CartProduct key={item.id} id={item.id} quantity={item.quantity} />
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {items.length > 0 && (
          <Button variant="primary" onClick={checkout}>
            Checkout
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CartModal;
