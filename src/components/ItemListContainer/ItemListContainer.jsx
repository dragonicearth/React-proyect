import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebase/cliente";
import { collection, getDocs } from "firebase/firestore";

export default function ItemListContainer() {
    const { categoria } = useParams();
    const [products, setProducts] = useState([]);
    console.log('products :>> ', products);

    useEffect(() => {
        const fetchProducts = async () => {
            const productCollection = collection(db, "products");
            const querySnapshot = await getDocs(productCollection);
            const filteredProducts = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (!categoria || data.categoryId === categoria) {
                    filteredProducts.push({ ...data, id: doc.id });
                }
            });

            setProducts(filteredProducts);
        };

        fetchProducts();
    }, [categoria]);

    return (
        <>
            <h2 className="fs-5 m-2 text-center text-light">
                Cantidad total de productos: <mark>{products.length}</mark>
            </h2>
            <Container fluid className="mt-4">
                <Row>
                    {products.map((product) => (
                        <Col key={product.id} lg={4} className="mn-4">
                            <Card className="m-3">
                                <Card.Body>
                                    <Card.Title className="textSize">{product.title}</Card.Title>
                                    <Card.Text>{product.description}</Card.Text>
                                    <Link className="btn btn-info text-decoration-none" to={`/productos/${product.categoryId}/${product.id}`}>
                                        Más Detalles +
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}
