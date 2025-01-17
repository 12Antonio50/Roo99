import React from 'react';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import useCrearEspacio from "../../Utils/Function/EspacioFuncion";

const Acciones = () => {
    const {
        oficina,
        oficinaDeshabilitar,
        nombreInmuebleSeleccionadoOficina,
        manejarSeleccionInmuebleOficina,
        deshabilitarEspacio,
        habilitarEspacio
    } = useCrearEspacio();

    const renderOficinas = (oficinas, deshabilitadas = false) => {
        if (!Array.isArray(oficinas) || oficinas.length === 0) {
            return <ListGroup.Item>No hay oficinas disponibles</ListGroup.Item>;
        }

        return oficinas.map((oficina, index) => (
            <ListGroup.Item
                key={index}
                action
                onClick={() => manejarSeleccionInmuebleOficina({ target: { value: oficina.nombre } })}
                active={nombreInmuebleSeleccionadoOficina && nombreInmuebleSeleccionadoOficina === oficina.nombre}
                variant={deshabilitadas ? 'danger' : 'success'}
            >
                {oficina.nombre}
            </ListGroup.Item>
        ));
    };

    const filtrarOficinasHabilitadas = () => {
        return oficina.filter(oficina => !oficinaDeshabilitar.some(d => d.nombre === oficina.nombre));
    };

    return (
        <Container fluid>
            <Row>
                <Col xs={6} md={6}>
                    <Card>
                        <Card.Header>Espacios habilitados</Card.Header>
                        <Card.Body>
                            <ListGroup>
                                {renderOficinas(filtrarOficinasHabilitadas())}
                            </ListGroup>
                        </Card.Body>
                        <Card.Footer>
                            <Button
                                disabled={!nombreInmuebleSeleccionadoOficina}
                                onClick={() => {
                                    deshabilitarEspacio();
                                }}
                            >
                                Deshabilitar
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col xs={6} md={6}>
                    <Card>
                        <Card.Header>Espacios deshabilitados</Card.Header>
                        <Card.Body>
                            <ListGroup>
                                {renderOficinas(oficinaDeshabilitar, true)}
                            </ListGroup>
                        </Card.Body>
                        <Card.Footer>
                            <Button
                                disabled={!nombreInmuebleSeleccionadoOficina}
                                onClick={() => {
                                    habilitarEspacio();
                                }}
                            >
                                Habilitar
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Acciones;
