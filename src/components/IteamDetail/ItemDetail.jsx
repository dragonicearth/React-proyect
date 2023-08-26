import { Card, Row, Col, Container } from "react-bootstrap";
import productosData from "../../data/products.json";
import { useParams } from "react-router-dom";

const ItemDetail = () => {

    const { id } = useParams();
    const prodID = parseInt(id)

    const filteredID = prodID ? productosData.filter((producto) => producto.id === prodID) : productosData;

    return (
        <Container fluid className="mt-4">
            <Row>
                {filteredID.map((p) => (
                    <Col key={p.id} lg={4} className="mn-4">
                        <Card className="m-5">
                            <Card.Body >
                                <Card.Img variant="top" className="imgSize" src={p.imagen} />
                                <Card.Title className="textSize">{p.descripcion}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )


}

export default ItemDetail;