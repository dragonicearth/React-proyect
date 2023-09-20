import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useCart } from "../CartView/CartView";
import { db } from "../../firebase/cliente";
import { collection, getDocs } from "firebase/firestore";
import ItemDetail from "./ItemDetail";

export default function ItemDetailContainer() {
    const { id } = useParams();
    const { cart, addToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [errorMessage, setErrorMessage] = useState("");
    const [stock, setStock] = useState(0);

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

    useEffect(() => {
        const foundProduct = products.find((p) => p.id === id);
        if (foundProduct) {
            setProduct(foundProduct);
            const stockAvailable =
                foundProduct.stock -
                cart.reduce((total, cartItem) => {
                    if (cartItem.id === foundProduct.id) {
                        return total + cartItem.quantity;
                    }
                    return total;
                }, 0);
            setStock(stockAvailable);
        }
    }, [id, products, cart]);

    const handleAddToCart = () => {
        if (quantity > 0) {
            addToCart(product, quantity);
        } else {
            setErrorMessage("Cantidad inválida");
        }
    };

    return (
        <Container fluid className="mt-4 text-center">
            {product ? (
                <Row className="d-flex justify-content-center align-items-center">
                    <Col lg={6} className="m-4">
                        <ItemDetail
                            product={product}
                            stock={stock}
                            quantity={quantity}
                            setQuantity={setQuantity}
                            errorMessage={errorMessage}
                            handleAddToCart={handleAddToCart}
                            cart={cart}
                        />
                    </Col>
                </Row>
            ) : (
                <p className="text-white font-link">No hay productos disponibles</p>
            )}
        </Container>
    );
}
