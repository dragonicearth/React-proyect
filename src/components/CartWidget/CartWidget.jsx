// CartWidget.js

import React from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../CartView/CartView";

export default function CartWidget() {
    const { cart, updateCartItem, removeCartItem, clearCart } = useCart();

    const handleUpdateCart = (itemId, newQuantity) => {
        if (newQuantity === 0) {
            removeCartItem(itemId);
        } else {
            updateCartItem(itemId, newQuantity);
        }
    };

    return (
        <Container>
            <h2 className="text-center text-white my-3">Carrito de Compras</h2>
            <Card>
                <Row className="m-4">
                    {cart.length > 0 ? (
                        <>
                            {cart.map((item) => (
                                <Col key={item.id} xs={12} className="pb-3">
                                    <Row>
                                        <Col xs={6}>
                                            <h4>Producto: {item.title}</h4>
                                        </Col>
                                        <Col xs={6} className="text-end">
                                            <h4> Precio por unidad: ${item.price}</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={6}>
                                            <h4>Cantidad: {item.quantity}</h4>
                                            <Button
                                                variant="success"
                                                size="md"
                                                onClick={() => handleUpdateCart(item.id, item.quantity + 1)}
                                                disabled={item.quantity >= item.stock}
                                                className="me-2"
                                            >
                                                +
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="md"
                                                onClick={() => handleUpdateCart(item.id, item.quantity - 1)}
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
                                <Col xs={8}>
                                    <Link to="/order">
                                        <Button variant="warning" size="md">
                                            Finalizar Compra
                                        </Button>
                                    </Link>
                                </Col>
                                <Col xs={12} className="text-end">
                                    <div>
                                        <Button variant="danger" size="md" onClick={clearCart} className="ms-3">
                                            Vaciar Carrito
                                        </Button>
                                    </div>
                                </Col>
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
