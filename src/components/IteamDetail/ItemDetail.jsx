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
        <ItemDetailContainer />
    );
}
