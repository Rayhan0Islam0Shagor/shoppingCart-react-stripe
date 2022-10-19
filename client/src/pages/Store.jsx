import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductCard from "../components/ProductCard";
import { products } from "../data/productList";

const Store = () => {
  return (
    <>
      <h1 className="text-center">Welcome to store</h1>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4 my-3">
        {products.map((product) => (
          <Col
            key={product.id}
            className="d-flex align-items-center justify-content-center"
          >
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Store;
