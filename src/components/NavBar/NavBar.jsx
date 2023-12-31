import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase/cliente";
import { collection, getDocs } from "firebase/firestore";
import { Container, Nav, Navbar, Badge } from "react-bootstrap";
import { useCart } from "../CartView/CartView";
import "../NavBar/NavBar.css";

export default function NavBar() {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const categories = [...new Set(products.map((product) => product.categoryId))];
    const { cart } = useCart();
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productCollection = collection(db, "products");
                const querySnapshot = await getDocs(productCollection);
                const productsData = [];

                querySnapshot.forEach((doc) => {
                    productsData.push({ id: doc.id, ...doc.data() });
                });

                setProducts(productsData);
            } catch (error) {
                console.error("Error obteniendo productos:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <Navbar expand="lg" className="colorNav">
            <Container fluid>
                <Link to="/" className="nav-link me-2 text-decoration-none fs-2 font-weight-bold text-light">
                    <i className="bi bi-cup-hot" /> <span className="font-link">CoffeeSHOP</span>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto my-auto text-uppercase">
                        <Link
                            to="/"
                            className={`nav-link text-white font-link ${selectedCategory === null ? "active" : ""}`}
                            onClick={() => setSelectedCategory(null)}
                        >
                            Todos
                        </Link>
                        {categories.map((category, index) => (
                            <Link
                                key={index}
                                to={`/${category}`}
                                className={`nav-link text-white font-link ${selectedCategory === category ? "active" : ""}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </Link>
                        ))}
                        <Link to="/cart" variant="link" className="text-none-decoration m-0 p-1 text-light ">
                            <i className="bi bi-cart3 me-3 ms-3 fs-5 shake"><Badge bg="warning" className="ms-1">{cartItemCount > 0 ? <span >{cartItemCount}</span> : <span className="font-link">vacio</span>}</Badge></i>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
