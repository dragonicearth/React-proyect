import { Card, Container, Row, Col, Button, Form } from "react-bootstrap";
import { db } from "../../firebase/cliente";
import { getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ItemDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [errorMessage, setErrorMessage] = useState("");

    const productRef = doc(db, "products", id);

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        setQuantity(newQuantity);
    };

    const handleAddToCart = () => {
        if (quantity > 0 && quantity <= product.stock) {
            console.log(`agregando ${quantity} al carrito de ${product.title}`);
            setQuantity(1);
        } else {
            setErrorMessage("No hay stock suficiente");
        }
    };

    const getProduct = () => {
        getDoc(productRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const productData = { id: snapshot.id, ...snapshot.data() };
                    setProduct(productData);
                } else {
                    console.log("No existe el producto con ID:", id);
                }
            })
            .catch((error) => {
                console.error("Error obteniendo el producto:", error);
            });
    };

    useEffect(() => {
        getProduct();
    }, [id]);

    return (
        <Container fluid className="mt-4 text-center">
            {product ? (
                <Row className="justify-content-md-center">
                    <Col lg={4} className="mn-4">
                        <Card className="m-5">
                            <Card.Img variant="top" className="imgSize" src={product.image} />
                            <Card.Body>
                                <Card.Title className="textSize">{product.title}</Card.Title>
                                <Card.Text>{product.description}</Card.Text>
                                <Card.Text>Precio: ${product.price}</Card.Text>
                                <Card.Text>Stock disponible: {product.stock} unidades</Card.Text>
                                {product.stock > 0 ? (
                                    <>
                                        <Form.Group controleid="quantity" className="mb-3">
                                            <Form.Label>Cantidad:</Form.Label>
                                            <Form.Control
                                                type="number"
                                                value={quantity}
                                                onChange={handleQuantityChange}
                                                max={product.stock}
                                                min={1}
                                            ></Form.Control>
                                            <p className="text-danger">{errorMessage}</p>
                                        </Form.Group>
                                        <Button className="btn btn-warning text-decoration-none me-4" onClick={handleAddToCart}>
                                            Agregar
                                        </Button>
                                    </>
                                ) : (
                                    <p>No hay stock suficiente</p>
                                )}

                                <Link to="/" className="btn btn-info text-decoration-none">
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
    );
};

export default ItemDetail;
