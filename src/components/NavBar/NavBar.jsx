import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import CartWidget from "../CartWidget/CartWidget";
import { db } from "../../firebase/cliente";
import { collection, getDocs } from "firebase/firestore";
import "../NavBar/NavBar.css";

export default function NavBar() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            const productCollection = collection(db, "products");
            const querySnapshot = await getDocs(productCollection);
            const categories = new Set();
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                categories.add(data.categoryId);
            });
            setCategories([...categories]);
        };
        fetchCategories();
    }, []);

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
                                to={`/productos/${category}`}
                                className={`nav-link ${selectedCategory === category ? "active" : ""}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </Link>
                        ))}
                        <CartWidget />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
