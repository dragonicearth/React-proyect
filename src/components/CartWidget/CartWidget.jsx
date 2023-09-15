import React, { useState, useEffect } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CartWidget() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    }, []);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCart);
    }, []);

    const updateCart = (itemId, newQuantity) => {
        if (newQuantity >= 0) {
            const updatedCart = cartItems.map((item) => {
                if (item.id === itemId) {
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
            const filteredCart = updatedCart.filter((item) => item.quantity > 0);
            localStorage.setItem("cart", JSON.stringify(filteredCart));
            setCartItems(filteredCart);
        }
    };

    return (
        <Container>
            <h2 className="text-center text-white my-3">Carrito de Compras</h2>
            <Card>
                <Row className="m-4">
                    {cartItems.length > 0 ? (
                        <>
                            {cartItems.map((item) => (
                                <Col key={item.id} xs={12} className="pb-3">
                                    <Row>
                                        <Col xs={6}>
                                            <h4>Producto: {item.title}</h4>
                                        </Col>
                                        <Col xs={6} className="text-end">
                                            <h4> Precio: ${item.price}</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={6}>
                                            <h4>Cantidad: {item.quantity}</h4>
                                        </Col>
                                        <Col xs={6} className="text-end">
                                            <Button
                                                variant="success"
                                                size="md"
                                                onClick={() => updateCart(item.id, item.quantity + 1)}
                                                disabled={item.quantity >= item.stock}
                                                className="me-2"
                                            >
                                                +
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="md"
                                                onClick={() => updateCart(item.id, item.quantity - 1)}
                                                disabled={item.quantity <= 0}
                                                className="me-2"
                                            >
                                                -
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            ))}
                            <Row className="d-flex justify-content-center text-center py-4">
                                <Link to="/order">
                                    <Button variant="warning" size="md">
                                        Finalizar Compra
                                    </Button>
                                </Link>
                            </Row>
                        </>
                    ) : (
                        <h2 className="text-center">El carrito está vacío</h2>
                    )}
                </Row>
            </Card>
        </Container>
    );
}
