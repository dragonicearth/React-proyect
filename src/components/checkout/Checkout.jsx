import React from 'react'
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { db } from "../../firebase/cliente";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import "./checkout.css"


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
                                    <h2 className='fz16'>Current cart</h2>
                                    <div className='border'>
                                        <Row className='mb-3 mt-4'>
                                            <Col>
                                                <p className='text-dark text-start fw-bold fzt m-0 mx-2'><span className='text-dark-50'>Producto: </span>{product.nameProduct}</p>
                                                <Card.Text className='text-dark text-start fw-bold fzt mt-3 mx-2'><span className='text-dark-50'>Cantidad: </span>{product.quantity}</Card.Text>
                                            </Col>
                                            <Col>
                                                <Card.Text className='text-dark text-end fzp mx-2'>${product.price}</Card.Text>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Row>
                                        <h2 className='text-danger fz16 mt-3 mb-4'>Total: ${product.price}</h2>
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
