import React from 'react';
import { Container, Row, Col, Modal, Form, Card, Image, Table, Button, InputGroup, Alert } from 'react-bootstrap';
import VistaMenu from "../../Components/Acciones/MenuVista";
import { Calendar } from 'react-calendar';
import "../../styles/style.principal.css";
import useCrearRenta from '../../Utils/Function/RentasFunction';
import "../../styles/Style.calendario.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import BotonWA from '../../Components/Acciones/BotonWA';
import { FaCheck } from "react-icons/fa";
import ModalAlerta from "../../Components/Renderizado/ModalAlerta";
import FooterCliente from "../../Components/Acciones/FooterCliente";
import Reloj from '../../Components/Acciones/Reloj';

const VistaCompra = () => {
    const {
        manejarCambioInput,
        handleClick,
        handleEvent,
        valorFormulario,
        mensajeAlerta,
        modalAlerta,
        mostrarAlerta,
        codigoGenerado,
        handleClose,
        handleBasicoCambio,
        handleIntermedioCambio,
        handlePremiumCambio,
        calcularTotal,
        handleCambioFecha,
        manejarCambios,
        imagenAnterior,
        imagenSiguiente,
        imagenActual,
        opcionesIntegrantes,
        primeraImagen,
        seleccionarDias,
        basicoResultado,
        intermedioResultado,
        premiumResultado,
        mostrarDetalles,
        show,
        costoBasico,
        costoIntermedio,
        costoPremium,
        nombreEspacio,
        dimension,
        detalles,
        caracteristicas,
        servicios,
        ubicacion,
        tipoEspacio,
        numeroMaximoIntegrantes,
        imagenes,
        deshabilitarSabadosDomingos,
        combinarClases,
        rentaCodigoRef,
        obtenerHorasDisponibles
    } = useCrearRenta();

    const [showModal, setShowModal] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState(null);

    const openModal = (image) => {
        setSelectedImage(image);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedImage(null);
    };

    return (
        <>
            <div style={{ position: 'sticky', top: '0', zIndex: '1000', backgroundColor: '#FFFFFF' }}>
                <VistaMenu />
            </div>
            <Container>
                <Row className="my-4">
                    <Col xs={12} md={5}>
                        {primeraImagen ? (
                            <Image variant="top" src={primeraImagen} className="img-fluid" thumbnail />
                        ) : (
                            <div className="d-flex justify-content-center align-items-center h-100">
                                <h5>No se encontraron oficinas</h5>
                            </div>
                        )}
                    </Col>
                    <Col xs={12} md={7}>
                        <Card>
                            <Card.Body className="p-0">
                                <div className="container d-flex flex-column justify-content-between">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h1>{nombreEspacio}</h1>
                                    </div>
                                    <p>Tarifas diarias por persona en la {tipoEspacio}</p>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>INCLUYE</th>
                                                <th className={basicoResultado ? 'columna-resaltada' : ''}>BÁSICO</th>
                                                <th className={intermedioResultado ? 'columna-resaltada' : ''}>INTERMEDIO</th>
                                                <th className={premiumResultado ? 'columna-resaltada' : ''}>PREMIUM</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Atención al cliente de lunes a viernes, de 9:00 a. m. a 6:00 p. m.</td>
                                                <td><FaCheck className={basicoResultado ? 'table-icon' : ''} /></td>
                                                <td><FaCheck className={intermedioResultado ? 'table-icon' : ''} /></td>
                                                <td><FaCheck className={premiumResultado ? 'table-icon' : ''} /></td>
                                            </tr>
                                            <tr>
                                                <td>Atención al Cliente</td>
                                                <td><FaCheck className={basicoResultado ? 'table-icon' : ''} /></td>
                                                <td><FaCheck className={intermedioResultado ? 'table-icon' : ''} /></td>
                                                <td><FaCheck className={premiumResultado ? 'table-icon' : ''} /></td>
                                            </tr>
                                            <tr>
                                                <td>Uso de las Instalaciones, Microondas y Refrigerador</td>
                                                <td><FaCheck className={basicoResultado ? 'table-icon' : ''} /></td>
                                                <td><FaCheck className={intermedioResultado ? 'table-icon' : ''} /></td>
                                                <td><FaCheck className={premiumResultado ? 'table-icon' : ''} /></td>
                                            </tr>
                                            <tr>
                                                <td>Uso de Espacios para el Descanso</td>
                                                <td><FaCheck className={basicoResultado ? 'table-icon' : ''} /></td>
                                                <td><FaCheck className={intermedioResultado ? 'table-icon' : ''} /></td>
                                                <td><FaCheck className={premiumResultado ? 'table-icon' : ''} /></td>
                                            </tr>
                                            <tr>
                                                <td>Catering de Frutas y Verduras</td>
                                                <td></td>
                                                <td><FaCheck className={intermedioResultado ? 'table-icon' : ''} /></td>
                                                <td><FaCheck className={premiumResultado ? 'table-icon' : ''} /></td>
                                            </tr>
                                            <tr>
                                                <td>Bocadillos</td>
                                                <td></td>
                                                <td></td>
                                                <td><FaCheck className={premiumResultado ? 'table-icon' : ''} /></td>
                                            </tr>
                                            <tr>
                                                <td>Costos</td>
                                                <td>
                                                    <Form.Check
                                                        type="radio"
                                                        checked={basicoResultado}
                                                        onClick={handleBasicoCambio}
                                                        onChange={() => { }}
                                                        label={<span style={{ color: '#000' }}>${costoBasico.toFixed(2)}MXN</span>}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="radio"
                                                        checked={intermedioResultado}
                                                        onClick={handleIntermedioCambio}
                                                        onChange={() => { }}
                                                        label={<span style={{ color: '#000' }}>${costoIntermedio.toFixed(2)}MXN</span>}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="radio"
                                                        checked={premiumResultado}
                                                        onClick={handlePremiumCambio}
                                                        onChange={() => { }}
                                                        label={<span style={{ color: '#000' }}>${costoPremium.toFixed(2)}MXN</span>}
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="h-100 align-items-stretch">
                    <div className="container my-4">
                        <Card className="h-100">
                            <Card.Body className="p-0 h-100">
                                <div className="container my-3">
                                    <h2>Detalles de {nombreEspacio}</h2>
                                    <Row className="h-100">
                                        <Col xs={12} className="my-2 d-flex flex-column">
                                            <Row>
                                                <Col xs={12} md={6}>
                                                    {imagenes && imagenes.length > 0 ? (
                                                        <>
                                                            <Image
                                                                variant="top"
                                                                src={imagenes[imagenActual]}
                                                                alt={`Imagen ${imagenActual + 1} de la oficina`}
                                                                className="img-fluid"
                                                                thumbnail
                                                                style={{ width: '600px', height: '350px', objectFit: 'cover' }}
                                                                onClick={() => openModal(imagenes[imagenActual])}
                                                            />
                                                            {imagenes.length > 1 && (
                                                                <div className=" w-100 d-flex justify-content-between px-3">
                                                                    <button
                                                                        onClick={imagenAnterior}
                                                                    >
                                                                        <span className='box'>
                                                                            <FaChevronLeft />
                                                                        </span>
                                                                    </button>
                                                                    <button
                                                                        onClick={imagenSiguiente}
                                                                    >
                                                                        <span className='box'>
                                                                            <FaChevronRight />
                                                                        </span>
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <div className="d-flex justify-content-center align-items-center">
                                                            <h5>No se encontraron oficinas</h5>
                                                        </div>
                                                    )}
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <div className="container">
                                                        <p style={{ textAlign: 'justify' }}>{detalles}</p>
                                                    </div>
                                                    <div className='container'>
                                                        <h4>Características del Espacio:</h4>
                                                        <ul>
                                                            {caracteristicas.map((caracteristica, index) => (
                                                                <li key={index}>{caracteristica}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <h4>Servicios del Espacio:</h4>
                                            <ul>
                                                {servicios.map((servicio, index) => (
                                                    <li key={index}>{servicio}</li>
                                                ))}
                                            </ul>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <h4>Dimensiones de {nombreEspacio}</h4>
                                            <p>{dimension} metros cuadrados </p>
                                            <h4>Tipo de espacio:</h4>
                                            {tipoEspacio}
                                            <h4>Número personas dentro del espacio:</h4>
                                            <p>{numeroMaximoIntegrantes} personas</p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} md={6}>
                                            <h4>Ubicación:</h4>
                                            <p></p>
                                            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '100%' }}>
                                                <iframe
                                                    src={ubicacion}
                                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: '0' }}
                                                    allowFullScreen
                                                    loading="lazy"
                                                    referrerPolicy="no-referrer-when-downgrade"
                                                    title="Ubicación en Google Maps"
                                                >
                                                </iframe>
                                            </div>
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <h4>Instrucciones para rentar</h4>
                                            <p style={{ textAlign: 'justify' }}>
                                                Para iniciar el proceso de renta, se requiere generar un código de reserva que será utilizado para completar el pago en nuestras oficinas. <br />Una vez generado el código, le esperamos en nuestras instalaciones para finalizar el proceso de renta y garantizar su reserva.
                                            </p>
                                        </Col>
                                    </Row>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </Row>
                {mostrarDetalles && (
                    <Row>
                        <div className="container my-4" ref={rentaCodigoRef}>
                            <Card className='card-buy'>
                                <Card.Body>
                                    <div className="container">
                                        <Row>
                                            <Col xs={12} md={4} className='mt-3'>
                                                <Form>
                                                    <Form.Group className='mb-3'>
                                                        <Form.Label style={{ color: '#000' }}>
                                                            Total de participantes:
                                                        </Form.Label>
                                                        <Form.Control
                                                            as='select'
                                                            value={valorFormulario.NumeroIntegrantes !== undefined ? valorFormulario.NumeroIntegrantes : ''}
                                                            onChange={manejarCambios}
                                                            name='NumeroIntegrantes'
                                                            disabled={numeroMaximoIntegrantes === 1}
                                                        >
                                                            <option value=''>Selecciona el número de participantes</option>
                                                            {opcionesIntegrantes}
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Form>
                                            </Col>
                                            {seleccionarDias.length > 0 && (
                                                <Col xs={12} md={4}>
                                                    <Form.Group as={Col} controlId="horaInicio">
                                                        <Form.Label style={{ color: '#000' }}>Hora de inicio:</Form.Label>
                                                        <Reloj
                                                            value={valorFormulario.HoraInicio}
                                                            onSelectHours={(hora) => manejarCambioInput("HoraInicio", hora)}
                                                            availableHours={obtenerHorasDisponibles('HoraInicio')}
                                                            disabled={seleccionarDias.length === 0}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            )}

                                            {valorFormulario.HoraInicio && (
                                                <Col xs={12} md={4}>
                                                    <Form.Group as={Col} controlId="horaFin">
                                                        <Form.Label style={{ color: '#000' }}>Hora final del día:</Form.Label>
                                                        <Reloj
                                                            value={valorFormulario.HoraFin}
                                                            onSelectHours={(hora) => manejarCambioInput("HoraFin", hora)}
                                                            availableHours={obtenerHorasDisponibles('HoraFin', valorFormulario.HoraInicio)}
                                                            disabled={seleccionarDias.length === 0 || !valorFormulario.HoraInicio}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            )}

                                        </Row>
                                        <Row>
                                            <Col xs={12} md={11} lg={5}>
                                                <div className='mb-3'>
                                                    <div className="d-flex justify-content-between">
                                                        <Form.Label style={{ color: '#000' }}>Días de rentas</Form.Label>
                                                    </div>
                                                    <Calendar
                                                        onChange={handleCambioFecha}
                                                        value={seleccionarDias}
                                                        selectRange={true}
                                                        tileClassName={combinarClases}
                                                        tileDisabled={deshabilitarSabadosDomingos}
                                                    />
                                                </div>
                                            </Col>
                                            <Col className='my-3' xs={12} md={11} lg={7}>
                                                <Col>
                                                    <Form>
                                                        <Form.Group className='mb-3'>
                                                            <Form.Label style={{ color: '#000' }}>
                                                                Nombre de quien reserva
                                                            </Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Nombre completo"
                                                                name="NombreArrendatario"
                                                                value={valorFormulario.NombreArrendatario}
                                                                onChange={(e) => manejarCambioInput(e.target.name, e.target.value)}
                                                            />
                                                        </Form.Group>
                                                    </Form>
                                                </Col>
                                                <Form.Group as={Col} controlId="horaFin">
                                                    <div>
                                                        <Form.Label style={{ color: '#000' }}>Total a pagar:</Form.Label>
                                                    </div>
                                                    <div className='my-4'>
                                                        <p style={{ textAlign: 'justify' }}>
                                                            El total a pagar se obtiene multiplicando el
                                                            número de personas que asisten por el precio
                                                            de la reserva. Posteriormente, se aplica un
                                                            impuesto del 16%, conocido como Impuesto al
                                                            Valor Agregado (IVA), sobre este subtotal para
                                                            determinar el costo final.
                                                        </p>
                                                    </div>
                                                    <InputGroup className="mb-3">
                                                        <InputGroup.Text style={{ background: "green", border: "none", color: "#FFFFFF" }}>$</InputGroup.Text>
                                                        <Form.Control
                                                            type="text"
                                                            aria-label="Amount"
                                                            placeholder="Costo"
                                                            readOnly
                                                            value={`${calcularTotal()}`}
                                                            style={{ background: "#FFFFFF", border: "1px solid green" }}
                                                        />
                                                        <InputGroup.Text style={{ background: "green", border: "none", color: "#FFFFFF" }}>MXN</InputGroup.Text>
                                                    </InputGroup>
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="horaFin">
                                                    <button onClick={handleClick} className='btn-code w-100 my-4'>Generar código</button>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Alert variant="warning" style={{
                                            fontSize: '18px',
                                            backgroundColor: '#ffc107',
                                            borderColor: '#e0a800',
                                            color: '#212529'
                                        }}>
                                            <Alert.Heading style={{ color: 'white' }}>¡Advertencia importante!</Alert.Heading>
                                            <p>
                                                Le informamos que en ningún momento se le pedirá dinero ni se le solicitará hacer
                                                depósitos en cuentas de terceros. Únicamente se le pedirá su correo electrónico.
                                                No se deje engañar por personas o mensajes fraudulentos, ignórelo y repórtelo
                                                <span style={{ color: 'white' }}>¡Siempre mantenga su información personal segura!</span>
                                            </p>
                                        </Alert>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </Row>
                )}

            </Container >
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body className='modal-code'>
                    <Modal.Title className='title-code'>Código generado</Modal.Title>
                    <div className="my-2">
                        <span className='description'>Código generado exitosamente: <strong>{codigoGenerado}</strong></span>
                        <br />
                        <span className='description'>
                            Ingrese su correo electrónico para recibir las instrucciones para finalizar la reserva de espacio.
                        </span>
                    </div>
                    <div className="data-code d-flex justify-content-between align-items-center my-3">
                        <Form.Group className='w-75 h-100'>
                            <Form.Control
                                className='input-code'
                                type='email'
                                placeholder='Ingrese su correo eléctronico'
                                name='Correo'
                                value={valorFormulario.Correo}
                                onChange={(e) => manejarCambioInput(e.target.name, e.target.value)}
                            />
                        </Form.Group>
                        <Button className="button-code w-25 h-100" onClick={handleEvent}>
                            Enviar
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
            <ModalAlerta
                modalAlerta={modalAlerta}
                mensajeAlerta={mensajeAlerta}
                mostrarAlerta={mostrarAlerta}
            />
            {showModal && (
                <div
                    className="custom-modal-overlay modal-overlay"
                    onClick={closeModal}
                >
                    <div
                        className="custom-modal-content modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedImage}
                            alt="Imagen ampliada"
                            className="modal-image"
                        />
                    </div>
                </div>
            )}
            <FooterCliente />
            <BotonWA />
        </>
    );
}

export default VistaCompra;