import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { ItemDetailContainer } from "./ItemDetailContainer"


export default function ItemDetail() {
    const { id } = useParams();
    const { products } = useProducts();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [errorMessage, setErrorMessage] = useState("");
    const [cart, setCart] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [stock, setStock] = useState(0);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart"));
        if (storedCart && storedCart.length > 0) {
            setCart(storedCart);
            const totalCount = storedCart.reduce((total, item) => total + item.quantity, 0);
            setCartCount(totalCount);
        }
    }, []);

    useEffect(() => {
        const foundProduct = products.find((p) => p.id === id);
        if (foundProduct) {
            setProduct(foundProduct);
            const stockAvailable =
                foundProduct.stock -
                cart.reduce((total, cartItem) => {
                    if (cartItem.id === foundProduct.id) {
                        return total + cartItem.quantity;
                    }
                    return total;
                }, 0);
            setStock(stockAvailable);
        }
    }, [id, products, cart]);

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        setQuantity(newQuantity);
    };

    const handleAddToCart = () => {
        if (quantity > 0) {
            const updatedCart = [...cart];
            const existingItemIndex = updatedCart.findIndex((cartItem) => cartItem.id === product.id);

            if (existingItemIndex !== -1) {
                const updatedQuantity = updatedCart[existingItemIndex].quantity + quantity;
                if (updatedQuantity <= product.stock) {
                    updatedCart[existingItemIndex].quantity = updatedQuantity;
                } else {
                    setErrorMessage("Has superado el stock disponible");
                    return;
                }
            } else {
                if (quantity <= product.stock) {
                    updatedCart.push({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        quantity: quantity,
                        stock: stock,
                    });
                } else {
                    setErrorMessage("Has superado el stock disponible");
                    return;
                }
            }
            setCart(updatedCart);
            const updatedStock = product.stock - quantity;
            setStock(updatedStock);
            const totalCount = updatedCart.reduce((total, cartItem) => total + cartItem.quantity, 0);
            setCartCount(totalCount);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            setErrorMessage("");
        } else {
            setErrorMessage("Cantidad inválida");
        }
    };

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
    );
}
