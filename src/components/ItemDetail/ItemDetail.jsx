import React from "react";
import { Card, Button, Image, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ItemCount from "./ItemCount";

export default function ItemDetail({ product, stock, quantity, errorMessage, setQuantity, handleAddToCart, cart }) {
    return (
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
                        <ItemCount
                            quantity={quantity}
                            setQuantity={setQuantity}
                            stock={stock}
                            errorMessage={errorMessage}
                        />
                        <Button className="btn btn-warning text-decoration-none text-center" onClick={handleAddToCart}>
                            Agregar al Carrito
                        </Button>
                    </>
                ) : (
                    <p>No hay stock suficiente</p>
                )}
                <Row>
                    {cart.length > 0 && (
                        <Col className="mt-3">
                            <Link to="/cart" className="btn btn-info text-decoration-none">
                                Ir al Carrito
                            </Link>
                        </Col>
                    )}
                    <Col xs={12} className="mt-3">
                        <Link to="/" className="btn btn-secondary text-decoration-none">
                            Volver
                        </Link>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}
