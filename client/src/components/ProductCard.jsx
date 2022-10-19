import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Form, Row, Col } from "react-bootstrap";

const ProductCard = ({ product }) => {
  const [open, setOpen] = useState(false);
  const { addToCart, getProductQuantity, removeFromCart, deleteFromCart } =
    useCart();
  const quantity = getProductQuantity(product.id);

  console.log("quantity", quantity);

  return (
    <Card style={{ maxWidth: "18rem" }}>
      <Card.Img variant="top" src={product.image} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
          variant="outline-info"
          className="mb-2"
        >
          description
        </Button>
        <Collapse in={open}>
          <div id="example-collapse-text" className="mb-2">
            <Card.Text>{product.description}</Card.Text>
          </div>
        </Collapse>

        <Card.Text>${product.price}</Card.Text>

        {quantity > 0 ? (
          <>
            <Form as={Row}>
              <Form.Label column="true" sm="6">
                In Cart: {quantity}
              </Form.Label>
              <Col sm="6">
                <Button
                  sm="6"
                  onClick={() => addToCart(product.id)}
                  className="mx-2"
                >
                  +
                </Button>
                <Button
                  sm="6"
                  onClick={() => removeFromCart(product.id)}
                  className="mx-2"
                >
                  -
                </Button>
              </Col>
            </Form>
            <Button
              variant="danger"
              onClick={() => deleteFromCart(product.id)}
              className="my-4"
            >
              Remove from cart
            </Button>
          </>
        ) : (
          <Button variant="primary" onClick={() => addToCart(product.id)}>
            Add To Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
