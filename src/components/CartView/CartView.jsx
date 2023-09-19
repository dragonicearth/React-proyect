import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    
    const addToCart = (product, quantity) => {
        const existingItemIndex = cart.findIndex((item) => item.id === product.id);

        if (existingItemIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart[existingItemIndex].quantity += quantity;
            setCart(updatedCart);
        } else {
            const newItem = { ...product, quantity };
            setCart([...cart, newItem]);
        }
    };

    const updateCartItem = (itemId, newQuantity) => {
        const updatedCart = cart.map((item) => {
            if (item.id === itemId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCart(updatedCart);
    };

    const removeCartItem = (itemId) => {
        const updatedCart = cart.filter((item) => item.id !== itemId);
        setCart(updatedCart);
    };

    const clearCart = () => {
        setCart([]);
    };

    const calculateTotal = () => {
        const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        return total;
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateCartItem, removeCartItem, clearCart, calculateTotal }}>{children}</CartContext.Provider>
    );
}
