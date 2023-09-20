import React, { useState, useEffect } from "react";
import { Col, Card, Image, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Item({ product }) {
    return (
        <Col sm={12} md={6} lg={3}>
            <Card className="my-3 cardStyle">
                <Card.Body>
                    {product.image ? <Image src={product.image} className="text-center border-0 imgCardSize" /> : <SyncLoader color="#36d7b7" />}
                </Card.Body>
                <Row className="d-flex justify-content-center align-items-end">
                    <Col xs={12}>
                        <Card.Title className="textSize font-link fw-bold">{product.title}</Card.Title>
                    </Col>
                    <Col xs={12}>
                        <Card.Text className="font-link descCard">{product.description}</Card.Text>
                    </Col>
                    <Col xs={12} className="my-4">
                        <Link className="btn btn-warning text-decoration-none font-link" to={`/${product.categoryId}/${product.id}`}>
                            Más Detalles +
                        </Link>
                    </Col>
                </Row>
            </Card>
        </Col>
    );
}
