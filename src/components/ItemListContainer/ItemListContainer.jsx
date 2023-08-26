import { Card, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import productosData from "../../data/products.json";
import { useParams } from "react-router-dom";

export default function ItemListContainer() {
    const { categoria } = useParams();

    const filteredProducts = categoria ? productosData.filter((producto) => producto.categoria === categoria) : productosData;

    return (
        <>

            <h2 className="fs-5 m-2 text-center text-light">Cantidad total de productos: <mark>{filteredProducts.length}</mark></h2>

            <Container fluid className="mt-4 ">
                <Row>
                    {filteredProducts.map((p) => (
                        <Col key={p.id} lg={4} className="mn-4">
                            <Card className="m-3">
                                <Card.Body >
                                    <Card.Title className="textSize">{p.nombre}</Card.Title>
                                    <Card.Text>{p.categoria}</Card.Text>
                                    <Link className="btn btn-info text-decoration-none" to={`/productos/${p.categoria}/${p.id}`}>Más Detalles +</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

        </>
    );
}