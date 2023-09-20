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
                <Card.Title className="textSize font-link fw-bold">{product.title}</Card.Title>
                <Card.Text className="font-link ms-5 me-5"><p className="ms-5 me-5">{product.description}</p></Card.Text>

                <Card.Text className="font-link">Precio: <span className="font-link fw-bold text-danger">${product.price}</span></Card.Text>
                <Card.Text className="font-link">Stock disponible: <span className="font-link fw-bold text-danger">{stock} unidades</span></Card.Text>
                {stock > 0 ? (
                    <>
                        <ItemCount
                            quantity={quantity}
                            setQuantity={setQuantity}
                            stock={stock}
                            errorMessage={errorMessage}
                        />
                        <Button className="btn btn-warning text-decoration-none text-center font-link" onClick={handleAddToCart}>
                            Agregar al Carrito
                        </Button>
                    </>
                ) : (
                    <p className="font-link fw-bold alert alert-danger">No hay stock</p>
                )}
                <Row>
                    {cart.length > 0 && (
                        <Col className="mt-3">
                            <Link to="/cart" className="btn btn-info text-decoration-none font-link">
                                Ir al Carrito
                            </Link>
                        </Col>
                    )}
                    <Col xs={12} className="mt-3">
                        <Link to="/" className="btn btn-secondary text-decoration-none font-link">
                            Volver
                        </Link>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}
