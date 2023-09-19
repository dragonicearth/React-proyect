import React from "react";
import { Form } from "react-bootstrap";

export default function ItemCount({ quantity, errorMessage, handleQuantityChange, stock }) {
    return (
        <Form.Group controlId="quantity" className="mb-3">
            <Form.Label>Cantidad:</Form.Label>
            <Form.Control type="number" value={quantity} onChange={handleQuantityChange} max={stock} min={1} />
            <p className="text-danger">{errorMessage}</p>
        </Form.Group>
    );
}
