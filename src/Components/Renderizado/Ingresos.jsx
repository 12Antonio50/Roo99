import React from "react";
import Menu from "../Acciones/Menu";
import { Container, Col, Row, Card } from "react-bootstrap";
import IngresosGrafica from "../Graficas/Ingresos";

const Ingresos = () => {
    return (
        <>
            <div style={{ position: 'sticky', top: '0', zIndex: '1000', backgroundColor: '#FFFFFF' }}>
                <Menu />
            </div>
            <Card>
                <Card.Body className="d-flex justify-content-center align-items-center" style={{ background: 'rgba(245, 198, 24, 0.1)', color: '#6F3E14' }}>
                    <h3>Informes mensuales generados sobre los Ingresos</h3>
                </Card.Body>
            </Card>
            <Container fluid>
                <Row className="my-3">
                    <Col xs={12}>
                        <div className="row">
                            <div className="col-md-12" >
                                <IngresosGrafica />
                            </div>
                        </div>  
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Ingresos;
