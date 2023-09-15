import React from "react";
import { Col, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ItemList({ product }) {
    return (
        <Col sm={12} lg={4} className="mn-4">
            <Card className="m-3">
                <Card.Body>
                    {product.image ? <Image src={product.image}  thumbnail className="text-center imgitems" /> : null}
                    <Card.Title className="textSize">{product.title}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Link className="btn btn-info text-decoration-none" to={`/${product.categoryId}/${product.id}`}>
                        Más Detalles +
                    </Link>
                </Card.Body>
            </Card>
        </Col>
    );
}
