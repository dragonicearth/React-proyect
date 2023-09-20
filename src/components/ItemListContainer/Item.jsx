import React, { useState, useEffect } from "react";
import { Col, Card, Image, Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function Item({ product }) {

    return (
        <Col sm={12} lg={4} className="mn-4">
            <Card className="m-3">
                <Card.Body>
                    {product.image ? (
                        <Image src={product.image} thumbnail className="text-center imgitems border-0" />
                    ) : (
                        <SyncLoader color="#36d7b7" />
                    )}
                    <Card.Title className="textSize font-link fw-bold">{product.title}</Card.Title>
                    <Card.Text className="font-link">{product.description}</Card.Text>
                    <Link className="btn btn-warning text-decoration-none font-link" to={`/${product.categoryId}/${product.id}`}>
                        Más Detalles +
                    </Link>
                </Card.Body>
            </Card>
        </Col>
    );
}
