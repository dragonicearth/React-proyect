import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import ItemList from "./ItemList";
import Spinner from "react-bootstrap/Spinner";

export default function ItemListContainer() {
    const { categoria } = useParams();
    const { products, updateProducts } = useProducts();
    const filteredProducts = categoria ? products.filter((product) => product.categoryId === categoria) : products;

    useEffect(() => {updateProducts()}, [updateProducts]);
    return (
        <>
            <h2 className="fs-5 m-2 text-center text-light">
                Cantidad total de productos: <mark>{products.length}</mark>
            </h2>
            <Container fluid className="mt-4">
                <Row className="d-flex justify-content-start text-center align-items-center">
                    {products.length === 0 ? (
                        <div>
                            <Spinner animation="border" className="loadingspinner" variant="light" />
                        </div>
                    ) : (
                        filteredProducts.map((product) => <ItemList key={product.id} product={product} />)
                    )}
                </Row>
            </Container>
        </>
    );
}
