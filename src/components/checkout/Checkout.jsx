import React from 'react'
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { db } from "../../firebase/cliente";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";


export default function Checkout() {

    const [checkoutData, setCheckoutData] = useState([]);
    console.log(checkoutData);

  

    useEffect(() => {
        const fethCheckout = async () => {
            try {
                const checkoutRef = collection(db, "checkout");
                const querySnapshot = await getDocs(checkoutRef);
                const checkoutItems = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setCheckoutData(checkoutItems);
            } catch (error) {
                console.log("error falta agregar productos");
            }
        };

        fethCheckout();
    }, []);

    const handleBuyClick = async () => {
        console.log("comprando....");
    };


    return (
        <>
            <Container fluid className="mt-4 text-center">
                <Row className="justify-content-md-center">
                    {checkoutData.map((product) => (
                        <Col key={product.id} lg={4} className="mn-4">
                            <Card className="m-3">
                                <Card.Body>
                                    <h2>Current cart</h2>
                                    <Row>
                                        <Col>
                                            <Card.Text>{product.nameProduct}</Card.Text>
                                            <Card.Text>Cantidad: {product.quantity}</Card.Text>
                                        </Col>
                                        <Col>
                                            <Card.Text>${product.price}</Card.Text>
                                        </Col>
                                    </Row>

                                    <Button className="btn btn-warning" onClick={handleBuyClick}>Comprar</Button>
                                    <Link to="/" className='btn btn-info ms-3'>Atras</Link>

                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )



}
