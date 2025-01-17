import React from "react";
import Menu from "../Acciones/Menu";
import { Container, Row, Col, Card, Button, Pagination, Modal, Form, Table, Image } from 'react-bootstrap';
import useRentasRetroactivas from "../../Utils/Function/RentasRetroactivasFunction";

const RentasRetroactivas = () => {
    const {
        valorFormulario,
        paginaPagados,
        paginaPendientes,
        modalVisible,
        elementosPorPagina,
        codigoSeleccionado,
        unicoCodigo,
        mostrarAlerta,
        mensajeAlerta,
        mostrarAdvertencia,
        buscarEspacio,
        estiloBoton,
        oficinasFiltradas,
        calcularIndicesPaginacion,
        formatearFechas,
        setBuscarEspacio,
        filtrarCodigosPorEstado,
        actualizarDatos,
        cerrarModal,
        obtenerUnicoCodigo,
        abrirModal,
        handlePaginaChange,
        manejarCambioInput,
        eliminarCodigo,
    } = useRentasRetroactivas();

    return (
        <>
            <Menu />
            <Container fluid>
                <Row className='my-5 d-flex flex-column justify-content-center align-items-center'>
                    <Col md={9}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Buscar oficina "
                                value={buscarEspacio}
                                onChange={(e) => setBuscarEspacio(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    {oficinasFiltradas.map((oficinaItem, index) => {
                        const codigosArray = Array.isArray(oficinaItem.codigos) ? oficinaItem.codigos : [];
                        const codigosPagados = filtrarCodigosPorEstado(codigosArray, true);
                        const codigosPendientes = filtrarCodigosPorEstado(codigosArray, false);

                        const codigosPagadosActuales = calcularIndicesPaginacion(codigosPagados, paginaPagados);
                        const codigosPendientesActuales = calcularIndicesPaginacion(codigosPendientes, paginaPendientes);

                        const totalPaginasPagados = Math.ceil(codigosPagados.length / elementosPorPagina);
                        const totalPaginasPendientes = Math.ceil(codigosPendientes.length / elementosPorPagina);

                        const imagenOficina = (oficinaItem.imagenes && oficinaItem.imagenes.length > 0) ? oficinaItem.imagenes[0] : null;

                        return (
                            <Col md={9} key={index} className="mb-4">
                                <Card>
                                    <Row>
                                        <Col xs={12} md={4} lg={3}>
                                            {imagenOficina ? (
                                                <Image variant="top" src={imagenOficina} className="img-fluid h-100" thumbnail />
                                            ) : (
                                                <div className="d-flex justify-content-center align-items-center h-100">
                                                    <h5>No se encontraron oficinas</h5>
                                                </div>
                                            )}
                                        </Col>
                                        <Col xs={12} md={8} lg={9}>
                                            <Card.Body>
                                                <div className="text-center">
                                                    <h3 className="text-primary">{oficinaItem.nombre}</h3>
                                                    <div className="d-flex justify-content-between align-items-center my-3">
                                                        <p className="text-muted mb-0 flex-fill mx-2">Costo Básico: {oficinaItem.costoBasico}</p>
                                                        <p className="text-muted mb-0 flex-fill mx-2">Costo Intermedio: {oficinaItem.costoIntermedio}</p>
                                                        <p className="text-muted mb-0 flex-fill mx-2">Costo Premium: {oficinaItem.costoPremium}</p>
                                                    </div>
                                                </div>

                                                <Row className='my-3'>
                                                    <Col xs={12} md={6}>
                                                        {codigosPagadosActuales.length > 0 ? (
                                                            <Table responsive bordered hover className="text-center">
                                                                <thead className="bg-light">
                                                                    <tr>
                                                                        <th className="text-center">Códigos Pagados</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {codigosPagadosActuales.map((codigoNombre, idx) => (
                                                                        <tr key={idx}>
                                                                            <td>
                                                                                <Button
                                                                                    style={estiloBoton}
                                                                                    variant="link"
                                                                                    onClick={() => {
                                                                                        abrirModal(codigoNombre, oficinaItem.nombre);
                                                                                        obtenerUnicoCodigo(codigoNombre);
                                                                                    }}
                                                                                >
                                                                                    {codigoNombre}
                                                                                </Button>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </Table>
                                                        ) : (
                                                            <p className="text-center">No hay códigos pagados.</p>
                                                        )}
                                                        <div className="d-flex justify-content-center align-items-center">
                                                            <Pagination size="sm">
                                                                {[...Array(totalPaginasPagados)].map((_, number) => (
                                                                    <Pagination.Item
                                                                        key={number}
                                                                        active={number + 1 === paginaPagados}
                                                                        onClick={() => handlePaginaChange('pagados', number + 1)}
                                                                    >
                                                                        {number + 1}
                                                                    </Pagination.Item>
                                                                ))}
                                                            </Pagination>
                                                        </div>
                                                    </Col>

                                                    <Col xs={12} md={6}>
                                                        {codigosPendientesActuales.length > 0 ? (
                                                            <Table responsive bordered hover className="text-center">
                                                                <thead className="bg-light">
                                                                    <tr>
                                                                        <th className="text-center">Códigos Pendientes</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {codigosPendientesActuales.map((codigoNombre, idx) => (
                                                                        <tr key={idx}>
                                                                            <td>
                                                                                <Button
                                                                                    style={estiloBoton}
                                                                                    variant="link"
                                                                                    onClick={() => {
                                                                                        abrirModal(codigoNombre, oficinaItem.nombre);
                                                                                        obtenerUnicoCodigo(codigoNombre);
                                                                                    }}
                                                                                >
                                                                                    {codigoNombre}
                                                                                </Button>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </Table>
                                                        ) : (
                                                            <p className="text-center">No hay códigos pendientes.</p>
                                                        )}
                                                        <div className="d-flex justify-content-center align-items-center">
                                                            <Pagination size="sm">
                                                                {[...Array(totalPaginasPendientes)].map((_, number) => (
                                                                    <Pagination.Item
                                                                        key={number}
                                                                        active={number + 1 === paginaPendientes}
                                                                        onClick={() => handlePaginaChange('pendientes', number + 1)}
                                                                    >
                                                                        {number + 1}
                                                                    </Pagination.Item>
                                                                ))}
                                                            </Pagination>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>

            {codigoSeleccionado && (
                <Modal show={modalVisible} fullscreen={true} onHide={cerrarModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Actualizar datos del código: {codigoSeleccionado}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col md={6}>
                                <Card>
                                    <Card.Body style={{ background: "#F5C618" }}>
                                        <Row>
                                            <div className="text-center">
                                                <h5>Detalles del Código</h5>
                                            </div>
                                            <Col md={6}>
                                                <p><strong>Número de Integrantes:</strong></p>
                                                <p><strong>Paquete:</strong></p>
                                                <p><strong>Nombre del Arrendatario:</strong></p>
                                                <p><strong>Precio Total:</strong></p>
                                                <p><strong>Hora de inicio:</strong></p>
                                                <p><strong>Hora de salida:</strong></p>
                                                <p><strong>Días de rentas:</strong></p>
                                            </Col>
                                            <Col md={6}>
                                                <p>{unicoCodigo.numeroIntegrantes}</p>
                                                <p>{unicoCodigo.paquete}</p>
                                                <p>{unicoCodigo.nombreArrendatario}</p>
                                                <p>{unicoCodigo.precioTotal}</p>
                                                <p>{unicoCodigo.horaInicio}</p>
                                                <p>{unicoCodigo.horaFin}</p>
                                                <pre style={{ whiteSpace: 'pre-line' }}>
                                                    {formatearFechas(unicoCodigo.diasRenta)}
                                                </pre>
                                            </Col>
                                            <Button onClick={() => {
                                                eliminarCodigo();
                                                cerrarModal();
                                            }
                                            } style={{ background: 'red', color: 'white' }}>Eliminar código</Button>
                                        </Row>
                                        {mostrarAlerta && (
                                            <div className="contenedor-alerta">
                                                <div className="mensaje-alerta">{mensajeAlerta}</div>
                                            </div>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col md={6}>
                                <Form>
                                    <Form.Group controlId={`form${codigoSeleccionado}`}>
                                        <Card>
                                            <Card.Body style={{ background: 'green', borderRadius: '5px' }}>
                                                <Form.Label>Estado</Form.Label>
                                                <Form.Select
                                                    aria-label="Seleccionar Acción"
                                                    className="config-select"
                                                    name="estado"
                                                    value={valorFormulario.estado}
                                                    onChange={manejarCambioInput}
                                                >
                                                    <option value="">Selecciona una opción</option>
                                                    <option value="true">Pagado</option>
                                                    <option value="false">Pendiente</option>
                                                </Form.Select>
                                            </Card.Body>
                                        </Card>
                                        <Form.Label style={{ color: "black" }}>Numero de integrantes</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Número de integrantes"
                                            name="NumeroIntegrantes"
                                            value={valorFormulario.numeroIntegrantes}
                                            onChange={manejarCambioInput}
                                        />
                                        <Form.Label style={{ color: "black" }}>Paquete</Form.Label>
                                        <Form.Select
                                            aria-label="Seleccionar Acción"
                                            className="config-select"
                                            placeholder="Paquete"
                                            name="paquete"
                                            value={valorFormulario.paquete}
                                            onChange={manejarCambioInput}
                                        >
                                            <option value="">Selecciona una opción</option>
                                            <option value="Básico">BÁSICO</option>
                                            <option value="Intermedio">INTERMEDIO</option>
                                            <option value="Premium">PREMIUM</option>
                                        </Form.Select>
                                        {mostrarAdvertencia && (
                                            <p style={{ color: "red", marginTop: "10px" }}>
                                                Si cambias el paquete, asegúrate de actualizar también el precio total siguiendo estos pasos:
                                                <br /><br />
                                                1. <strong>Consulta el precio del paquete seleccionado:</strong> Cada paquete tiene un precio específico (BÁSICO, INTERMEDIO, PREMIUM). Asegúrate de conocer el precio del paquete que has seleccionado.
                                                <br /><br />
                                                2. <strong>Multiplica el precio del paquete por el número de participantes y los días de renta:</strong> Calcula el total multiplicando el precio del paquete por el número de personas y luego por la cantidad de días que durará la renta. <br />
                                                Por ejemplo:
                                                <br />
                                                Precio Total = Precio del Paquete * Número de Participantes * Días de Renta
                                                <br /><br />
                                                3. <strong>Añade el 16% de impuestos al precio total:</strong> Después de obtener el precio total básico, multiplica este total por 1.16 y súmalo al precio total.
                                                <br />
                                                Por ejemplo:
                                                <br />
                                                Precio Final = Precio Total + (Precio Total * 1.16)
                                                <br /><br />
                                                4. <strong>Actualiza el campo de "Precio Total" en el formulario:</strong> Ingresa el precio final calculado en el campo correspondiente del formulario.
                                            </p>
                                        )}
                                        <Form.Label style={{ color: "black" }}>Nombre del arrendatario</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Nombre del arrendatario"
                                            name="nombreArrendatario"
                                            value={valorFormulario.nombreArrendatario}
                                            onChange={manejarCambioInput}
                                        />
                                        <Form.Label style={{ color: "black" }}>Precio total</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Total"
                                            name="precioTotal"
                                            value={valorFormulario.precioTotal}
                                            onChange={manejarCambioInput}
                                        />
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-between">
                        <Button variant="secondary" onClick={cerrarModal}>
                            Cerrar
                        </Button>
                        <Button variant="primary" onClick={actualizarDatos}>
                            Guardar Cambios
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};

export default RentasRetroactivas;