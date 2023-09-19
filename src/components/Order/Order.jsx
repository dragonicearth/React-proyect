import React, { useContext } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../CartView/CartView";
import { doc, writeBatch } from "firebase/firestore";
import { db } from "../../firebase/cliente";

export default function Order() {
    const { cart, calculateTotal, clearCart } = useCart();

    const handleBuyClick = async () => {
        const batch = writeBatch(db);
        cart.forEach(async (item) => {
            const productRef = doc(db, "products", item.id);
            const newStock = item.stock - item.quantity; 
            batch.update(productRef, { stock: newStock });
        });
        try {
            await batch.commit();
            clearCart();
            console.log("Compra exitosa, el stock se actualizó correctamente.");
        } catch (error) {
            console.error("Error al realizar la compra:", error);
        }
    };

    return (
        <Container fluid className="mt-4 text-center">
            <Row className="justify-content-md-center">
                <Card className="m-3">
                    <Card.Body>
                        <h2 className="fz16 pb-4">Carrito Actual</h2>
                        {cart.length > 0 ? (
                            cart.map((item) => (
                                <Col key={item.id} xs={12} className="mn-4">
                                    <div className="border">
                                        <Row className="mb-3 mt-4">
                                            <Col>
                                                <p className="text-dark text-start fw-bold fzt m-0 mx-2">
                                                    <span className="text-dark-50">Producto: </span>
                                                    {item.title}
                                                </p>
                                                <Card.Text className="text-dark text-start fw-bold fzt mt-3 mx-2">
                                                    <span className="text-dark-50">Cantidad: </span>
                                                    {item.quantity}
                                                </Card.Text>
                                            </Col>
                                            <Col>
                                                <Card.Text className="text-dark text-end fzp mx-2">${item.price * item.quantity}</Card.Text>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            ))
                        ) : (
                            <Col xs={12}>
                                <div className="pb-4">
                                    <Row className="mb-3 mt-4">
                                        <Col>
                                            <h2 className="text-dark text-center fw-bold fzt m-0 mx-2">Carrito Vacío</h2>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        )}
                        {cart.length > 0 && (
                            <Col xs={12} className="mn-4">
                                <div className="border">
                                    <Row className="mb-3 mt-4">
                                        <Col>
                                            <h2 className="text-dark text-start fw-bold fzt m-0 mx-2">Total:</h2>
                                        </Col>
                                        <Col>
                                            <h2 className="text-dark text-end fzp mx-2">${calculateTotal()}</h2>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="mt-3">
                                    <Button className="btn btn-warning" onClick={handleBuyClick}>
                                        Comprar
                                    </Button>
                                    <Link to="/" className="btn btn-secondary ms-3">
                                        Atrás
                                    </Link>
                                </div>
                            </Col>
                        )}
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    );
}
