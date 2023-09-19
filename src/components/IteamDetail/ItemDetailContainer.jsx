import { Container, Row, Col, Card, Button, Form, Image } from "react-bootstrap";
import React from "react";

export default function ItemDetailContainer() {
    return (
        <Container fluid className="mt-4 text-center">
            {product ? (
                <Row className="d-flex justify-content-center align-items-center">
                    <Col lg={4} className="m-4">
                        <Card className="m-5">
                            <div>
                                <Image thumbnail src={product.image} />
                            </div>
                            <Card.Body>
                                <Card.Title className="textSize">{product.title}</Card.Title>
                                <Card.Text>{product.description}</Card.Text>
                                <Card.Text>Precio: ${product.price}</Card.Text>
                                <Card.Text>Stock disponible: {stock} unidades</Card.Text>
                                {stock > 0 ? (
                                    <>
                                        <Form.Group controlId="quantity" className="mb-3">
                                            <Form.Label>Cantidad:</Form.Label>
                                            <Form.Control type="number" value={quantity} onChange={handleQuantityChange} max={stock} min={1} />
                                            <p className="text-danger">{errorMessage}</p>
                                        </Form.Group>
                                        <Button className="btn btn-warning text-decoration-none me-4" onClick={handleAddToCart}>
                                            Agregar al Carrito
                                        </Button>
                                    </>
                                ) : (
                                    <p>No hay stock suficiente</p>
                                )}

                                {cartCount > 0 && (
                                    <Link to="/cart" className="btn btn-info text-decoration-none">
                                        Ir al Carrito
                                    </Link>
                                )}

                                <Link to="/" className="btn btn-secondary text-decoration-none ms-3">
                                    Volver
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            ) : (
                <p className="text-white">No hay productos disponibles</p>
            )}
        </Container>
    )
}
