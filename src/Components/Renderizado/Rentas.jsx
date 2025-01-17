import React from "react";
import Menu from "../Acciones/Menu";
import { Container, Col, Row, Card } from "react-bootstrap";
import RentasOficinasChart from "../Graficas/Rentas";

const Rentas = () => {
    return (
        <>
            <div style={{ position: 'sticky', top: '0', zIndex: '1000', backgroundColor: '#FFFFFF' }}>
                <Menu />
            </div>
            <Card>
                <Card.Body className="d-flex justify-content-center align-items-center" style={{ background: 'rgba(245, 198, 24, 0.1)', color: '#6F3E14' }}>
                    <h3>Informes mensuales generados sobre las Rentas</h3>
                </Card.Body>
            </Card>
            <Container fluid>
                <Row className="my-3">
                    <Col md={12}>
                        <RentasOficinasChart />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Rentas;
