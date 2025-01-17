import React from "react";
import { Form, Button, Row, Col, Container, Card, Alert } from 'react-bootstrap';
import "../../styles/Style.clientes.css";
import useNotificaciones from "../../Utils/Function/Clientes";

const Formulario = () => {
    const {
        mostrarAlerta,
        errorCorreo,
        isLoading,
        mensajeAlerta,
        valorFormulario,
        enviarFormularioExp,
        manejarCambioInput
    } = useNotificaciones();

    return (
        <Container fluid className="pb-4 pt-1" style={{ background: "#f8f8f8" }}>
            <Container>
                <div className="text-center my-5">
                    <h2 className="footer-title">Contáctanos.</h2>
                    <h6 className="footer-sub-title">
                        Déjanos tu información y en breve nos comunicaremos contigo.
                    </h6>
                    <Container>
                        <Row className="d-flex justify-content-center align-items-center">
                            <Col md={8}>
                                <Card className="card-body rounded-0">
                                    <Form onSubmit={enviarFormularioExp}>
                                        <Form.Group controlId="nameInput">
                                            <Form.Control
                                                type="text"
                                                placeholder="Nombre"
                                                className="mb-4"
                                                required
                                                name="Nombre"
                                                value={valorFormulario.Nombre}
                                                onChange={manejarCambioInput}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="lastNameInput">
                                            <Form.Control
                                                type="text"
                                                placeholder="Apellido"
                                                className="mb-4"
                                                required
                                                name="Apellido"
                                                value={valorFormulario.Apellido}
                                                onChange={manejarCambioInput}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                type="email"
                                                className={errorCorreo ? "is-invalid" : ""}
                                                placeholder="Correo electrónico"
                                                required
                                                name="Correo"
                                                value={valorFormulario.Correo}
                                                onChange={manejarCambioInput}
                                            />
                                            {errorCorreo && <div className="invalid-feedback">{errorCorreo}</div>}
                                        </Form.Group>

                                        <Form.Group controlId="phoneInput">
                                            <Form.Control
                                                type="Number"
                                                placeholder="Teléfono"
                                                className="mb-4"
                                                required
                                                name="Telefono"
                                                value={valorFormulario.Telefono}
                                                onChange={manejarCambioInput}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="companyInput">
                                            <Form.Control
                                                type="text"
                                                placeholder="Empresa"
                                                className="mb-4"
                                                name="Empresa"
                                                value={valorFormulario.Empresa}
                                                onChange={manejarCambioInput}
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="peopleInput">
                                            <Form.Control
                                                type="number"
                                                placeholder="Cantidad de personas"
                                                className="mb-4"
                                                min="1"
                                                name="CantidadPersonas"
                                                value={valorFormulario.CantidadPersonas}
                                                onChange={manejarCambioInput}
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="additionalInfoInput">
                                            <Form.Control
                                                as="textarea"
                                                placeholder="Información adicional"
                                                className="mb-4"
                                                rows={2}
                                                name="InformacionAdicional"
                                                value={valorFormulario.InformacionAdicional}
                                                onChange={manejarCambioInput}
                                                required
                                            />
                                        </Form.Group>

                                        <Button type="submit" className="btn btn-card" disabled={isLoading}>
                                            {isLoading ? "Solicitando Información..." : "Solicita Información Ahora"}
                                        </Button>
                                    </Form>
                                    {mostrarAlerta && (
                                        <Alert variant="success" className="mt-3">
                                            {mensajeAlerta}
                                        </Alert>
                                    )}
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Container>
        </Container>
    );
}

export default Formulario;
