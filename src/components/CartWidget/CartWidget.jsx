import { Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CartWidget = () => {
  return (
    <Link to="/Checkout" variant="link" className="text-none-decoration m-0 p-0 text-light">
      <i className="bi bi-cart4  me-2 fs-5 text-light" /><Badge bg="secondary"> 9  </Badge>
      <span className="visually-hidden"></span>
    </Link>
  );
};

export default CartWidget;
