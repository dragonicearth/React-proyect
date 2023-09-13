import NavBar from "../components/NavBar/NavBar";
import ItemListContainer from "../components/ItemListContainer/ItemListContainer";
import ItemListDetails from "../components/IteamDetail/ItemDetail";
import Checkout from "../components/checkout/Checkout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Router() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/productos/:categoria/:id" element={<ItemListDetails />} />
                <Route path="/productos/:categoria" element={<ItemListContainer />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/" element={<ItemListContainer />} />
            </Routes>
        </BrowserRouter>
    );
}
