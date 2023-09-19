import NavBar from "../components/NavBar/NavBar";
import ItemListContainer from "../components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "../components/ItemDetail/ItemDetailContainer";
import Order from "../components/Order/Order";
import CartWidget from "../components/CartWidget/CartWidget";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "../components/CartView/CartView";

export default function Router() {
    return (
        <BrowserRouter>
            <CartProvider>
                <NavBar />
                <Routes>
                    <Route path="/cart" element={<CartWidget />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/:detail/:id" element={<ItemDetailContainer />} />
                    <Route path="/:categoria" element={<ItemListContainer />} />
                    <Route path="/" element={<ItemListContainer />} />
                </Routes>
            </CartProvider>
        </BrowserRouter>
    );
}
