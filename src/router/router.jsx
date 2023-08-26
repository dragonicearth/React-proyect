import NavBar from "../components/NavBar/NavBar";
import ItemListContainer from "../components/ItemListContainer/ItemListContainer";
import ItemListDetails from "../components/IteamDetail/ItemDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Router() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/productos/:categoria/:id" element={<ItemListDetails />} />
        <Route path="/productos/:categoria" element={<ItemListContainer />} />
        <Route path="/" element={<ItemListContainer />} />
      </Routes>
    </BrowserRouter>
  )
}