import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";

export default function ItemCount({ quantity, setQuantity, errorMessage, stock }) {
    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        if (newQuantity >= 1 && newQuantity <= stock) {
            setQuantity(newQuantity);
        }
    };

    const incrementQuantity = () => {
        if (quantity < stock) {
            setQuantity(quantity + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    useEffect(() => {
        if (quantity > stock) {
            setQuantity(1);
        }
    }, [stock, setQuantity]);

    return (
        <Form.Group controlId="quantity" className="mb-3">
            <Form.Label>Cantidad:</Form.Label>
            <div className="d-flex align-items-center justify-content-center">
                <Button variant="danger" onClick={decrementQuantity} className="me-3">
                    -
                </Button>
                <div >
                    <Form.Control value={quantity} onChange={handleQuantityChange} max={stock} min={1} disabled className="text-center" />
                </div>
                <Button variant="success" onClick={incrementQuantity} className="ms-3">
                    +
                </Button>
            </div>
            <p className="text-danger">{errorMessage}</p>
        </Form.Group>
    );
}