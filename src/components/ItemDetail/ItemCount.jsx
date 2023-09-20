import React, { useEffect } from "react";
import { Form } from "react-bootstrap";

export default function ItemCount({ quantity, errorMessage, setQuantity, stock }) {

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        if (newQuantity >= 1 && newQuantity <= stock) {
            setQuantity(newQuantity);
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
            <Form.Control type="number" value={quantity} onChange={handleQuantityChange} max={stock} min={1} />
            <p className="text-danger">{errorMessage}</p>
        </Form.Group>
    );
}
