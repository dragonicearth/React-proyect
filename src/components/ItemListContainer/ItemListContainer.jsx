import { useState, useEffect } from "react";
import { Container, Row, Alert, Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/cliente";
import { collection, getDocs } from "firebase/firestore";
import ItemList from "./ItemList";
import Spinner from "react-bootstrap/Spinner";

export default function ItemListContainer() {
    const { categoria } = useParams();
    const [products, setProducts] = useState([]);
    const filteredProducts = categoria ? products.filter((product) => product.categoryId === categoria) : products;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productCollection = collection(db, "products");
                const querySnapshot = await getDocs(productCollection);
                const productsData = [];

                querySnapshot.forEach((doc) => {
                    productsData.push({ id: doc.id, ...doc.data() });
                });

                setProducts(productsData);
            } catch (error) {
                console.error("Error obteniendo productos:", error);
            }
        };

        fetchProducts();
    }, []);
    return (
        <>
            <h2 className="fs-5 m-2 text-center text-light">
                <Alert variant="warning">Cantidad total de productos: <Badge bg="warning" text="dark">{products.length}</Badge></Alert>
            </h2>
            <Container fluid className="mt-4">
                <Row className="d-flex justify-content-start text-center align-items-center">
                    {products.length === 0 ? (
                        <div>
                            <Spinner className="spinner-grow text-danger" role="status" />
                        </div>
                    ) : (
                        <ItemList products={filteredProducts} />
                    )}
                </Row>
            </Container>
        </>
    );
}
