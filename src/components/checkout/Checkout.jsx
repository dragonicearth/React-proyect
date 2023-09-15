import React, { useEffect, useState } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { db } from "../../firebase/cliente";
import { doc, writeBatch } from "firebase/firestore";

export default function Checkout() {
    const [checkoutData, setCheckoutData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart"));
        if (storedCart && storedCart.length > 0) {
            setCheckoutData(storedCart);
            const total = storedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
            setTotalPrice(total);
        } else {
            console.log("El carrito está vacío");
        }
    }, []);

    const handleBuyClick = async () => {
        const batch = writeBatch(db);

        checkoutData.forEach((product) => {
            const productRef = doc(db, "products", product.id);
            const newStock = product.stock - product.quantity;
            batch.update(productRef, { stock: newStock });
        });

        try {
            await batch.commit();
            console.log("Compra exitosa, el stock se actualizó correctamente.");
            localStorage.removeItem("cart");
            setCheckoutData([]);
        } catch (error) {
            console.error("Error al actualizar el stock:", error);
        }
    };

    return (
        <Container fluid className="mt-4 text-center">
            <Row className="justify-content-md-center">
                <Card className="m-3">
                    <Card.Body>
                        <h2 className="fz16 pb-4">Carrito Actual</h2>
                        {checkoutData.map((product) => (
                            <Col key={product.id} xs={12} className="mn-4">
                                <div className="border">
                                    <Row className="mb-3 mt-4">
                                        <Col>
                                            <p className="text-dark text-start fw-bold fzt m-0 mx-2">
                                                <span className="text-dark-50">Producto: </span>
                                                {product.title}
                                            </p>
                                            <Card.Text className="text-dark text-start fw-bold fzt mt-3 mx-2">
                                                <span className="text-dark-50">Cantidad: </span>
                                                {product.quantity}
                                            </Card.Text>
                                        </Col>
                                        <Col>
                                            <Card.Text className="text-dark text-end fzp mx-2">${product.price * product.quantity}</Card.Text>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        ))}
                        {checkoutData.length > 0 ? (
                            <Col xs={12} className="mn-4">
                                <div className="border">
                                    <Row className="mb-3 mt-4">
                                        <Col>
                                            <h2 className="text-dark text-start fw-bold fzt m-0 mx-2">Total:</h2>
                                        </Col>
                                        <Col>
                                            <h2 className="text-dark text-end fzp mx-2">${totalPrice}</h2>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="mt-3">
                                    <Button className="btn btn-warning" onClick={handleBuyClick}>
                                        Comprar
                                    </Button>
                                    <Link to="/" className="btn btn-info ms-3">
                                        Atrás
                                    </Link>
                                </div>
                            </Col>
                        ) : (
                            <Col xs={12}>
                                <div className="pb-4">
                                    <Row className="mb-3 mt-4">
                                        <Col>
                                            <h2 className="text-dark text-center fw-bold fzt m-0 mx-2">Carrito Vacío</h2>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="mt-3">
                                    <Link to="/" className="btn btn-info">
                                        Volver al inicio
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
