import { Container, Nav, Navbar } from "react-bootstrap";
import CartWidget from "../CartWidget/CartWidget";
import { Link } from "react-router-dom";
import productosData from "../../data/products.json";
import '../NavBar/NavBar.css'

export default function NavBar() {
    const categories = [...new Set(productosData.map((producto) => producto.categoria))];
    return (
        <Navbar expand="lg" className="colorNav">
            <Container fluid>
                <Link to="/" className="nav-link me-2 text-decoration-none text-light">
                    <Navbar.Brand href="#home" className="fs-2 font-weight-bold text-light">
                        <i className="bi bi-cup-hot" /> CoffeeSHOP
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto my-auto text-uppercase">

                        {categories.map((category, index) => (
                            <Link key={index} to={`/productos/${category}`} className="nav-link me-2 text-decoration-none text-light">{category}</Link>
                        ))}
                        <CartWidget />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
