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
            <Row className="d-flex justify-content-md-center">
                <Col xs={12} md={4}>
                    <Card className="m-3 px-3">
                        <Card.Body>
                            <h2 className="fz16 pb-4 font-link">Carrito Actual</h2>
                            {cart.length > 0 ? (
                                cart.map((item) => (
                                    <Col key={item.id} xs={12} className="mn-4">
                                        <div className="border">
                                            <Row className="mb-3 mt-4">
                                                <Col>
                                                    <p className="text-dark text-start fw-bold fzt m-0 mx-2">
                                                        <span className="text-dark-50 font-link">Producto: </span>
                                                        <span className="font-link fw-bold text-danger">{item.title}</span>
                                                    </p>
                                                    <Card.Text className="text-dark text-start fw-bold fzt mt-3 mx-2">
                                                        <span className="text-dark-50 font-link">Cantidad: </span>
                                                        <span className="font-link fw-bold text-danger">{item.quantity}</span>
                                                    </Card.Text>
                                                </Col>
                                                <Col>
                                                    <Card.Text className="text-dark text-end fzp mx-2 font-link">Costo del producto por cantidad: <span className="font-link fw-bold text-danger">${item.price * item.quantity}</span></Card.Text>
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
                                                <h2 className="text-dark text-center fw-bold fzt m-0 mx-2 font-link">Carrito Vacío</h2>
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
                                                <h2 className="text-dark text-start fw-bold fzt m-0 mx-2 font-link">Total:</h2>
                                            </Col>
                                            <Col>
                                                <h2 className="text-dark text-end fzp mx-2 font-link">
                                                    <span className="font-link fw-bold text-danger">${calculateTotal()}</span>
                                                </h2>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="mt-3">
                                        <Button className="btn btn-warning font-link" onClick={handleBuyClick}>
                                            Comprar
                                        </Button>
                                        <Link to="/" className="btn btn-secondary ms-3 font-link">
                                            Atrás
                                        </Link>
                                    </div>
                                </Col>
                            )}
                        </Card.Body>
                    </Card>

                </Col>

            </Row>
        </Container>
    );
}
