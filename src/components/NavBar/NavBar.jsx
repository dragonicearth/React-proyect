import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useProducts } from "../context/ProductContext";
import "../NavBar/NavBar.css";

export default function NavBar() {
    const { products } = useProducts();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const categories = [...new Set(products.map((product) => product.categoryId))];

    return (
        <Navbar expand="lg" className="colorNav">
            <Container fluid>
                <Link to="/" className="nav-link me-2 text-decoration-none fs-2 font-weight-bold text-light">
                    <i className="bi bi-cup-hot" /> CoffeeSHOP
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto my-auto text-uppercase">
                        <Link to="/" className={`nav-link ${selectedCategory === null ? "active" : ""}`} onClick={() => setSelectedCategory(null)}>
                            Todos
                        </Link>
                        {categories.map((category, index) => (
                            <Link
                                key={index}
                                to={`/${category}`}
                                className={`nav-link ${selectedCategory === category ? "active" : ""}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </Link>
                        ))}
                        <Link to="/cart" variant="link" className="text-none-decoration m-0 p-0 text-light">
                            <i className="bi bi-cart4 me-2 fs-5 text-light" />
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
