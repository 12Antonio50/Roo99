import React, { useState } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Carousel
} from 'react-bootstrap';
import VistaMenu from "../../Components/Acciones/MenuVista";
import {
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";
import { Link } from 'react-router-dom';
import useCrearEspacio from '../../Utils/Function/EspacioFuncion';
import useCrearInmueble from '../../Utils/Function/InmuebleFuncion';
import Oficina102 from "../../assets/images/Tiber102.png";
import Oficina103 from "../../assets/images/Tiber103.png";
import "../../styles/style.principal.css";
import AvisoPrivacidad from '../../Components/Acciones/AvisoPrivacidad';
import FooterCliente from '../../Components/Acciones/FooterCliente';

const VistaGeneral = () => {
    const { oficinaabilitar, isLoading = [] } = useCrearEspacio();
    const { inmuebles = [] } = useCrearInmueble();
    const [seleccionarOficina, setseleccionarOficina] = useState(null);
    const [seleccionarInmueble, setseleccionarInmueble] = useState("");
    const [imagenActualIndices, setImagenActualIndices] = useState({});

    const inmuebleSeleccionado = (inmuebleName) => {
        setseleccionarInmueble(inmuebleName);
    };

    const limpiarFiltros = () => {
        setseleccionarInmueble("")
        setseleccionarOficina("")
    };

    const cambiarImagen = (direccion, index) => {
        const oficinaSeleccionada = filteredOffices[index];
        if (!oficinaSeleccionada) {
            console.error("Oficina no encontrada en el índice especificado");
            return;
        }

        const imagenes = oficinaSeleccionada.imagenes || [];
        let nuevoIndex = imagenActualIndices[oficinaSeleccionada.nombre] || 0;

        if (direccion === 'left') {
            nuevoIndex = (nuevoIndex > 0) ? nuevoIndex - 1 : imagenes.length - 1;
        } else if (direccion === 'right') {
            nuevoIndex = (nuevoIndex < imagenes.length - 1) ? nuevoIndex + 1 : 0;
        }

        setImagenActualIndices(prev => ({ ...prev, [oficinaSeleccionada.nombre]: nuevoIndex }));
    };

    const filteredOffices = seleccionarInmueble
        ? oficinaabilitar.filter(oficina => {
            const inmueble = inmuebles.find(inm => inm.nombre === seleccionarInmueble);
            return inmueble && (inmueble.oficina || []).includes(oficina.nombre);
        })
        : seleccionarOficina ? [seleccionarOficina] : oficinaabilitar;

    return (
        <>
            <div style={{ position: 'sticky', top: '0', zIndex: '1000', backgroundColor: '#FFFFFF' }}>
                <VistaMenu />
            </div>
            <AvisoPrivacidad />
            <Container fluid>
                <Row>
                    <Col xs={12} md={3} style={{ background: '#DFE4DE' }}>
                        <Carousel data-bs-theme="dark">
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={Oficina102}
                                    alt="Primera imagen"
                                    style={{ height: '350px', width: 'auto' }}
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={Oficina103}
                                    alt="Segunda imagen"
                                    style={{ height: '350px', width: 'auto' }}
                                />
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                    <Col xs={12} md={9} className='p-0'>
                        <Card.Body className='d-flex align-items-center justify-content-center' style={{ height: '100%', background: '#F5C618' }}>
                            <h1 style={{ color: '#FFFFFF' }}>
                                Espacios de Coworking en CDMX a Precios Justos
                            </h1>
                        </Card.Body>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <div className='collection-grid'>
                    <div className="container">
                        <div className="w-100 d-flex justify-content-end my-4">
                            <Col xs={12} md={4} className="d-flex mt-3">
                                <Form.Select
                                    onChange={(e) => inmuebleSeleccionado(e.target.value)}
                                    className="select-without-border"
                                    value={seleccionarInmueble}
                                >
                                    <option value="">Inmuebles</option>
                                    {inmuebles.map((inmueble) => (
                                        <option key={inmueble._id} value={inmueble.nombre}>
                                            {inmueble.nombre}
                                        </option>
                                    ))}
                                </Form.Select>
                                <button
                                    onClick={limpiarFiltros}
                                    className="button-clean"
                                >
                                    Limpiar filtros
                                </button>
                            </Col>
                        </div>
                        <Row className='my-3'>
                            {filteredOffices.length > 0 ? (
                                filteredOffices.map((oficinaabilitar, index) => (
                                    <Col xs={12} md={4} lg={3} key={index} className="mb-4">
                                        <Card>
                                            <Card.Body className="p-0 position-relative" style={{ height: '400px', overflow: 'hidden' }}>
                                                {oficinaabilitar.imagenes?.length > 0 ? (
                                                    <>
                                                        <img
                                                            className="d-block w-100"
                                                            src={oficinaabilitar.imagenes[imagenActualIndices[oficinaabilitar.nombre] || 0]}
                                                            alt={`Imagen ${index + 1}`}
                                                            style={{ height: '100%', objectFit: 'cover' }}
                                                        />
                                                        {oficinaabilitar.imagenes.length > 1 && (
                                                            <div className="position-absolute top-0 start-0 d-flex justify-content-between align-items-center w-100 h-100">
                                                                <button className="btn-control" onClick={() => cambiarImagen('left', index)}><FaChevronLeft /></button>
                                                                <button className="btn-control" onClick={() => cambiarImagen('right', index)}><FaChevronRight /></button>
                                                            </div>
                                                        )}
                                                    </>
                                                ) : (
                                                    <div className="d-flex justify-content-center align-items-center h-100">
                                                        <h5>No hay imágenes disponibles</h5>
                                                    </div>
                                                )}
                                            </Card.Body>
                                            <Card.Footer style={{ background: '#FFFFFF', border: 'none' }}>
                                                <div className='d-flex flex-column justify-content-center align-items-center'>
                                                    <h4>{oficinaabilitar.nombre}</h4>
                                                    <Link
                                                        style={{
                                                            textDecoration: 'none',
                                                            color: '#000'
                                                        }}
                                                        to={`/espacio/${encodeURIComponent(oficinaabilitar.nombre.replace(/\s+/g, '_'))}`}>
                                                        Rentar espacio
                                                    </Link>
                                                </div>
                                            </Card.Footer>
                                        </Card>
                                    </Col>
                                ))
                            ) : (
                                <Col xs={12}>
                                    <div className="text-center">
                                        <h5>No se encontraron oficinas</h5>
                                        <br />
                                        <p>Esta página está en construcción. Por favor, comuníquese con nosotros para más información.</p>
                                    </div>
                                </Col>
                            )}
                        </Row>
                    </div>
                </div>
            </Container>
            <FooterCliente/>
            { isLoading && <div>Cargando...</div> }
        </>
    );
};

export default VistaGeneral;