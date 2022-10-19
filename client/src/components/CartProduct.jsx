import React from "react";
import { useCart } from "../context/CartContext";
import { getProductData } from "../data/productList";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const CartProduct = (props) => {
  const { deleteFromCart } = useCart();
  const id = props.id;
  const quantity = props.quantity;

  const productData = getProductData(id);

  const total = productData.price * quantity;

  return (
    <Row className="mb-2">
      <Col xs={2}>
        <img
          src={productData.image}
          alt={productData.name}
          className="img-fluid"
        />
      </Col>
      <Col xs={4}>
        <p>{productData.name}</p>
      </Col>

      <Col xs={4}>
        <p className="fw-bold">
          ${productData.price} * {quantity} = ${total.toFixed(2)}
        </p>
      </Col>

      <Col xs={2}>
        <Button size="sm" onClick={() => deleteFromCart(id)}>
          Remove
        </Button>
      </Col>
    </Row>
  );
};

export default CartProduct;
