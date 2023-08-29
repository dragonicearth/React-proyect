import { Button, Card, Row, Col, Container } from "react-bootstrap";
import productosData from "../../data/products.json";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ItemDetail = () => {


    const [count, setCount] = useState(0);
    const { id } = useParams();
    const prodID = parseInt(id)

    const filteredID = prodID ? productosData.filter((producto) => producto.id === prodID) : productosData;

    const add = () => {
        if (count >= 0) {
            setCount(count + 1);
        }
    };

    const rest = () => {
        if (count >= 1) {
            setCount(count - 1);
        }
    };

    const buy = () => {
        if (count >= 1) {
            alert(`Compraste: ${count} item/s `)
            setCount(0);
        }
    };

    return (
        <Container fluid className="mt-4 text-center">
            <Row className="justify-content-md-center">
                {filteredID.map((p) => (
                    <Col key={p.id} lg={4} className="mn-4">
                        <Card className="m-5">
                            <Card.Body >
                                <Card.Img variant="top" className="imgSize" src={p.imagen} />
                                <Card.Title className="textSize">{p.descripcion}</Card.Title>


                                <div className="row justify-content-md-center">
                                    <div className="justify-content-md-center">
                                        <Button variant="outline-warning m-3" className="d-inline-block" onClick={rest}> - </Button>

                                        <Card.Text className="d-inline-block">{count}</Card.Text>

                                        <Button variant="outline-warning m-3" className="d-inline-block" onClick={add}> + </Button>

                                        <Button variant="outline-warning m-3" className="d-inline-block" onClick={buy}>Comprar</Button>


                                    </div>
                                </div>


                            </Card.Body>
                        </Card>
                    </Col>
                ))
                }
            </Row >
        </Container >
    )


}

export default ItemDetail;