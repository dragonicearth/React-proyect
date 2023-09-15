import NavBar from "../components/NavBar/NavBar";
import ItemListContainer from "../components/ItemListContainer/ItemListContainer";
import ItemListDetails from "../components/IteamDetail/ItemDetail";
import { ProductProvider } from "../components/context/ProductContext";
import Checkout from "../components/Checkout/Checkout";
import CartWidget from "../components/CartWidget/CartWidget";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Router() {
    return (
        <BrowserRouter>
            <ProductProvider>
                <NavBar />
                <Routes>
                    <Route path="/cart" element={<CartWidget />} />
                    <Route path="/order" element={<Checkout />} />
                    <Route path="/:detail/:id" element={<ItemListDetails />} />
                    <Route path="/:categoria" element={<ItemListContainer />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/" element={<ItemListContainer />} />
                </Routes>
            </ProductProvider>
        </BrowserRouter>
    );
}
