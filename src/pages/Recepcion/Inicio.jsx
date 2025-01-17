import React, { useEffect, useState } from "react";
import { Container, Form, Button, Table, Row, Card, Col, Toast } from "react-bootstrap";
import { MdEdit, MdDelete } from "react-icons/md";
import { PiCurrencyDollarBold } from "react-icons/pi";
import useRentasRetroactivas from "../../Utils/Function/RentasRetroactivasFunction";
import MenuResepcion from "../../Components/Acciones/MenuResepcion";
import "../../styles/style.principal.css";

const InicioRecepcion = () => {
    const {
        oficina,
        codigosTodos,
        unicoCodigo,
        eliminarCodigo,
        manejarCambioInput,
        valorFormulario,
        actualizarDatos,
        codigoSeleccionado,
        visibleToast,
        handleButtonClick,
        obtenerCodigos,
        setVisibleToast,
        mostrarAlerta,
        mensajeAlerta,
    } = useRentasRetroactivas();

    useEffect(() => {
        obtenerCodigos();
    }, [obtenerCodigos])

    const [filtroCodigo, setFiltroCodigo] = useState("");

    const estiloFormControl = {
        backgroundColor: "transparent",
        color: "#333",
        border: "none",
        outline: "none",
        fontSize: "16px",
        paddingLeft: "16px",
        width: "100%",
    };

    // Función para formatear las fechas
    const formatearFechas = (diasRenta) => {
        if (Array.isArray(diasRenta)) {
            return diasRenta.map(dia => {
                if (dia instanceof Date) {
                    return dia.toISOString().split('T')[0];
                }
                return dia.split('T')[0];
            }).join("\n");
        } else if (typeof diasRenta === 'string') {
            const fechas = diasRenta.match(/\d{4}-\d{2}-\d{2}/g);
            return fechas ? fechas.join("\n") : "";
        } else {
            return "";
        }
    }

    const toastData = [
        {
            variante: 'Success',
            titulo: `Pagar código ${codigoSeleccionado}`,
            cuerpo: (
                <div style={{
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    padding: '20px',
                    backgroundColor: '#f9f9f9',
                    maxWidth: '600px',
                    margin: '20px auto',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    fontFamily: 'Arial, sans-serif',
                    color: '#333'
                }}>
                    <h2 style={{
                        borderBottom: '2px solid #007bff',
                        paddingBottom: '10px',
                        marginBottom: '20px',
                        color: '#007bff'
                    }}>Detalles del Arrendamiento</h2>
                    <p><strong>Código:</strong> {unicoCodigo.codigo}</p>
                    <p><strong>Integrantes:</strong> {unicoCodigo.numeroIntegrantes}</p>
                    <p><strong>Paquete:</strong> {unicoCodigo.paquete}</p>
                    <p><strong>Hora de inicio:</strong> {unicoCodigo.horaInicio}</p>
                    <p><strong>Hora final:</strong> {unicoCodigo.horaFin}</p>
                    <p><strong>Días de renta:</strong></p>
                    <pre style={{
                        whiteSpace: 'pre-line',
                        backgroundColor: '#e0e0e0',
                        padding: '10px',
                        borderRadius: '4px',
                        marginBottom: '20px',
                        fontFamily: 'Courier New, monospace'
                    }}>
                        {formatearFechas(unicoCodigo.diasRenta)}
                    </pre>
                    <p><strong>Precio Total:</strong> <span style={{ color: '#007bff' }}>${unicoCodigo.precioTotal}</span> pesos</p>
                    <p><strong>Nombre del Arrendatario:</strong> {unicoCodigo.nombreArrendatario}</p>
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
                    <br />
                    <Button className="w-100" style={{ background: '#007bff', color: '#FFFFFF' }} onClick={() => actualizarDatos(codigoSeleccionado)}>Guardar cambios</Button>
                </div>
            ),
        },
        {
            variante: 'Danger',
            titulo: `Eliminar código ${codigoSeleccionado}`,
            cuerpo: unicoCodigo ? (
                <div style={{
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    padding: '20px',
                    backgroundColor: '#f9f9f9',
                    maxWidth: '600px',
                    margin: '20px auto',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    fontFamily: 'Arial, sans-serif',
                    color: '#333'
                }}>
                    <h2 style={{
                        borderBottom: '2px solid #007bff',
                        paddingBottom: '10px',
                        marginBottom: '20px',
                        color: '#007bff'
                    }}>Detalles del Arrendamiento</h2>
                    <p><strong>Código:</strong> {unicoCodigo.codigo}</p>
                    <p><strong>Integrantes:</strong> {unicoCodigo.numeroIntegrantes}</p>
                    <p><strong>Paquete:</strong> {unicoCodigo.paquete}</p>
                    <p><strong>Hora de inicio:</strong> {unicoCodigo.horaInicio}</p>
                    <p><strong>Hora final:</strong> {unicoCodigo.horaFin}</p>
                    <p><strong>Días de renta:</strong></p>
                    <pre style={{
                        whiteSpace: 'pre-line',
                        backgroundColor: '#e0e0e0',
                        padding: '10px',
                        borderRadius: '4px',
                        marginBottom: '20px',
                        fontFamily: 'Courier New, monospace'
                    }}>
                        {formatearFechas(unicoCodigo.diasRenta)}
                    </pre>
                    <p><strong>Precio Total:</strong> <span style={{ color: '#007bff' }}>${unicoCodigo.precioTotal}</span> pesos</p>
                    <p><strong>Nombre del Arrendatario:</strong> {unicoCodigo.nombreArrendatario}</p>
                    <br />
                    <Button className="w-100" style={{ background: '#007bff', color: '#FFFFFF' }} onClick={() => eliminarCodigo(codigoSeleccionado)}>Eliminar código</Button>
                </div>
            ) : 'Se produjo un error al intentar eliminar.',
        },

        {
            variante: 'Warning',
            titulo: `Editar código ${codigoSeleccionado}`,
            cuerpo: (
                <div style={{
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    padding: '20px',
                    backgroundColor: '#f9f9f9',
                    maxWidth: '600px',
                    margin: '20px auto',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    fontFamily: 'Arial, sans-serif',
                    color: '#333'
                }}>
                    <h2 style={{
                        borderBottom: '2px solid #007bff',
                        paddingBottom: '10px',
                        marginBottom: '20px',
                        color: '#007bff'
                    }}>Detalles del Arrendamiento</h2>

                    <p><strong>Código:</strong> {unicoCodigo.codigo}</p>
                    <p><strong>Integrantes:</strong> {unicoCodigo.numeroIntegrantes}</p>
                    <p><strong>Paquete:</strong> {unicoCodigo.paquete}</p>
                    <p><strong>Hora de inicio:</strong> {unicoCodigo.horaInicio}</p>
                    <p><strong>Hora final:</strong> {unicoCodigo.horaFin}</p>
                    <p><strong>Días de renta:</strong></p>
                    <pre style={{
                        whiteSpace: 'pre-line',
                        backgroundColor: '#e0e0e0',
                        padding: '10px',
                        borderRadius: '4px',
                        marginBottom: '20px',
                        fontFamily: 'Courier New, monospace'
                    }}>
                        {formatearFechas(unicoCodigo.diasRenta)}
                    </pre>
                    <p><strong>Precio Total:</strong> <span style={{ color: '#007bff' }}>${unicoCodigo.precioTotal}</span> pesos</p>
                    <p><strong>Nombre del Arrendatario:</strong> {unicoCodigo.nombreArrendatario}</p>
                    <br />
                    <h5 style={{
                        borderBottom: '2px solid #007bff',
                        paddingBottom: '10px',
                        marginBottom: '20px',
                        color: '#007bff'
                    }}>Editar campos</h5>
                    <p style={{ color: "#333", marginTop: "10px" }}>
                        Si cambias el paquete o el número de integrantes, asegúrate de actualizar también el precio total siguiendo estos pasos:
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
                        Precio Final = (Precio Total * 1.16)
                        <br /><br />
                        4. <strong>Actualiza el campo de "Precio Total" en el formulario:</strong> Ingresa el precio final calculado en el campo correspondiente del formulario.
                    </p>
                    <Form>
                        <Form.Group controlId="formNumeroIntegrantes">
                            <Form.Label style={{ color: "black" }}>Numero de integrantes</Form.Label>
                            <Form.Control
                                type="Number"
                                placeholder="Número de integrantes"
                                name="numeroIntegrantes"
                                value={valorFormulario.numeroIntegrantes}
                                onChange={manejarCambioInput}
                                min={1}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPaquete">
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
                        </Form.Group>
                        <Form.Group controlId="formNombreArrendatario">
                            <Form.Label style={{ color: "black" }}>Nombre del arrendatario</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nombre del arrendatario"
                                name="nombreArrendatario"
                                value={valorFormulario.nombreArrendatario}
                                onChange={manejarCambioInput}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPrecioTotal">
                            <Form.Label style={{ color: "black" }}>Precio total</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Total"
                                name="precioTotal"
                                value={valorFormulario.precioTotal}
                                onChange={manejarCambioInput}
                            />
                        </Form.Group>
                    </Form>
                    <br />
                    <Button className="w-100" style={{ background: '#007bff', color: '#FFFFFF' }} onClick={() => actualizarDatos(codigoSeleccionado)}>Actualizar datos</Button>
                </div>
            ),
        }
    ];

    const filteredCodigos = oficina.flatMap((oficinaItem) =>
        oficinaItem.codigos.filter((codigoItem) =>
            codigosTodos.some(codigo => codigo.codigo === codigoItem) &&
            codigoItem.toLowerCase().includes(filtroCodigo.toLowerCase())
        ).map((codigoItem) => ({
            ...oficinaItem,
            codigo: codigoItem
        }))
    );

    return (
        <>
            <div style={{ position: 'sticky', top: '0', zIndex: '1000', backgroundColor: '#FFFFFF' }}>
                <MenuResepcion />
            </div>
            <Container>
                <Container>
                    <Row className="mb-4">
                        <Col xs={12} md={9} lg={10}>
                            <Card className="my-3" style={{ border: 'none' }}>
                                <Card.Body>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>Espacio</th>
                                                <th>Código</th>
                                                <th>Estado</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredCodigos.map((codigoItem, index) => {
                                                const codigoData = codigosTodos.find(codigo => codigo.codigo === codigoItem.codigo);

                                                return (
                                                    <tr key={index}>
                                                        <td>{codigoItem.nombre}</td>
                                                        <td>{codigoItem.codigo}</td>
                                                        <td>{codigoData ? (codigoData.estado ? 'Pagado' : 'Pendiente') : 'Desconocido'}</td>
                                                        <td>
                                                            <Button
                                                                style={{ background: "green", color: "#FFFFFF", fontSize: "18px", marginRight: "5px" }}
                                                                size="sm"
                                                                onClick={() => handleButtonClick('Success', codigoItem.codigo)}
                                                            >
                                                                <PiCurrencyDollarBold />
                                                            </Button>
                                                            <Button
                                                                style={{ background: "red", color: "#FFFFFF", fontSize: "18px", marginRight: "5px" }}
                                                                size="sm"
                                                                onClick={() => handleButtonClick('Danger', codigoItem.codigo)}
                                                            >
                                                                <MdDelete />
                                                            </Button>
                                                            <Button
                                                                style={{ background: "#ecff41", color: "#FFFFFF", fontSize: "18px" }}
                                                                size="sm"
                                                                onClick={() => handleButtonClick('Warning', codigoItem.codigo)}
                                                            >
                                                                <MdEdit />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} md={3} lg={2}>
                            <Card className="my-3" style={{ background: "none", border: "none" }}>
                                <Card.Body style={{ padding: 0, display: 'flex', borderRadius: '15px', overflow: 'hidden' }}>
                                    <div className="search-container">
                                        <div className="icon">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                id="Isolation_Mode"
                                                data-name="Isolation Mode"
                                                viewBox="0 0 24 24"
                                                width="22"
                                                height="22"
                                            >
                                                <path
                                                    d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"
                                                ></path>
                                            </svg>
                                        </div>
                                        <Form.Control
                                            type="text"
                                            style={estiloFormControl}
                                            value={filtroCodigo}
                                            onChange={(e) => setFiltroCodigo(e.target.value)}
                                        />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Container>
                {toastData.map((toast, index) => (
                    <Toast
                        className="d-inline-block m-1 w-100"
                        bg={toast.variante.toLowerCase()}
                        key={index}
                        show={visibleToast === toast.variante}
                        onClose={() => setVisibleToast('')}
                    >
                        <Toast.Header>
                            <strong className="me-auto">{toast.titulo}</strong>
                        </Toast.Header>
                        <Toast.Body className={toast.variante === 'Success' || toast.variante === 'Danger' ? 'text-white' : ''}>
                            {toast.icono} {toast.cuerpo}
                            {toast.accion && (
                                <Button variant="primary" size="sm" onClick={toast.accion}>Confirmar</Button>
                            )}
                        </Toast.Body>
                    </Toast>
                ))}
                {mostrarAlerta && (
                    <div className="contenedor-alerta">
                        <div className="mensaje-alerta">{mensajeAlerta}</div>
                    </div>
                )}
            </Container>
            <Container fluid>
                <Container className="my-4">
                    <br />
                    <div style={{
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        padding: '20px',
                        backgroundColor: '#f9f9f9',
                        maxWidth: '1200px',
                        margin: '20px auto',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        fontFamily: 'Arial, sans-serif',
                        color: '#333',
                    }}>
                        <h2 style={{
                            borderBottom: '2px solid #007bff',
                            paddingBottom: '10px',
                            marginBottom: '20px',
                            color: '#007bff'
                        }}>Contrato del Arrendamiento</h2>
                        <br />
                        <Button className="w-100" style={{ background: '#007bff', color: '#FFFFFF' }} onClick={() => eliminarCodigo(codigoSeleccionado)}>Firmar contrato</Button>
                    </div>
                    <br />
                </Container>
            </Container>
        </>
    );
};

export default InicioRecepcion;