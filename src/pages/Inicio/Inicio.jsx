import React from "react";
import Menu from "../../Components/Acciones/Menu";
import { Card, Container, Row, Col } from "react-bootstrap";
import { PiCurrencyDollarSimpleThin } from "react-icons/pi";
import { CiBarcode } from "react-icons/ci";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import CodigosInicio from "../../Components/Graficas/CodigosInicio";
import IngresosRentaInicioChart from "../../Components/Graficas/IngresosInicio";
import RentasOficinasHeatmapChart from "../../Components/Graficas/RentasInicio";
import RentasOficinasLineChart from "../../Components/Graficas/RentasInmueblesInicio";
import useRentasRetroactivas from "../../Utils/Function/RentasRetroactivasFunction";

const Inicio = () => {
    const {
        ingresosMesActual,
        ingresosMesPasado,
        totalIngresosAnioPresente,
        codigosGeneradosMesActual,
        codigosGeneradosMesPasado,
        totalCodigosGeneradosAnioPresente,
        codigosGeneradosFalseMesActual,
        codigosGeneradosFalseMesPasado,
        totalCodigosGeneradosFalseAnioPresente
    } = useRentasRetroactivas();

    return (
        <>
            <div style={{ position: 'sticky', top: '0', zIndex: '1000', backgroundColor: '#FFFFFF' }}>
                <Menu />
            </div>
            <Card>
                <Card.Body className="d-flex justify-content-center align-items-center" style={{ background: '#fced8c', color: '#6F3E14' }}>
                    <h3>Informes mensuales generados</h3>
                </Card.Body>
            </Card>

            <div style={{ marginTop: '20px' }}>
                <Container fluid>
                    <Row>
                        <Col md={4}>
                            <Card style={{ marginBottom: '20px', background: '#006400', color: 'white' }}>
                                <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
                                    <PiCurrencyDollarSimpleThin style={{ fontSize: '70px' }} />
                                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                                        <div style={{ marginBottom: '10px', whiteSpace: 'nowrap' }}>Ingresos mensuales</div>
                                        <h5 style={{ marginBottom: '20px' }}>${ingresosMesActual.toFixed(2)}</h5>
                                    </div>
                                </Card.Body>
                                <Card.Body style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '15px' }}>
                                        <p className="card-text" style={{ marginBottom: '-10px', whiteSpace: 'nowrap' }}>Mes pasado</p>
                                        <p className="card-text">${ingresosMesPasado.toFixed(2)}</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginRight: '15px' }}>
                                        <p className="card-text" style={{ marginBottom: '-10px', whiteSpace: 'nowrap' }}>Máximo ingreso</p>
                                        <p className="card-text">${totalIngresosAnioPresente.toFixed(2)}</p>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={4}>
                            <Card style={{ marginBottom: '20px', background: '#000080', color: 'white' }}>
                                <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
                                    <CiBarcode style={{ fontSize: '70px' }} />
                                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                                        <div style={{ marginBottom: '10px' }}>Códigos generados</div>
                                        <h5 style={{ marginBottom: '20px' }}>{codigosGeneradosMesActual}</h5>
                                    </div>
                                </Card.Body>
                                <Card.Body style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '15px' }}>
                                        <p className="card-text" style={{ marginBottom: '-10px', whiteSpace: 'nowrap' }}>Mes pasado</p>
                                        <p className="card-text">{codigosGeneradosMesPasado}</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginRight: '15px' }}>
                                        <p className="card-text" style={{ marginBottom: '-10px', whiteSpace: 'nowrap' }}>Máximo generado</p>
                                        <p className="card-text">{totalCodigosGeneradosAnioPresente}</p>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={4}>
                            <Card style={{ marginBottom: '20px', background: '#FF4500', color: 'white' }}>
                                <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
                                    <HiOutlineBuildingOffice2 style={{ fontSize: '70px' }} />
                                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                                        <div style={{ marginBottom: '10px' }}>Códigos pendientes</div>
                                        <h5 style={{ marginBottom: '20px' }}>{codigosGeneradosFalseMesActual}</h5>
                                    </div>
                                </Card.Body>
                                <Card.Body style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '15px' }}>
                                        <p className="card-text" style={{ marginBottom: '-10px', whiteSpace: 'nowrap' }}>Mes pasado</p>
                                        <p className="card-text">{codigosGeneradosFalseMesPasado}</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginRight: '15px' }}>
                                        <p className="card-text" style={{ marginBottom: '-10px', whiteSpace: 'nowrap' }}>Máximo pendiente</p>
                                        <p className="card-text">{totalCodigosGeneradosFalseAnioPresente}</p>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container fluid>
                <Row className="g-4">
                    {/* Fila 1 */}
                    <Col xs={12} md={6} lg={6}>
                        <Card className="text-center h-100" style={{ border: 'none' }}>
                            <Card.Body>
                                <IngresosRentaInicioChart />
                            </Card.Body>
                            <Card.Footer style={{ background: '#FFFFFF' }}>
                                <Card.Title style={{ color: '#656565' }}>Ingresos mensuales</Card.Title>
                            </Card.Footer>
                        </Card>
                    </Col>

                    <Col xs={12} md={6} lg={6}>
                        <Card className="text-center h-100" style={{ border: 'none' }}>
                            <Card.Body>
                                <CodigosInicio />
                            </Card.Body>
                            <Card.Footer style={{ background: '#FFFFFF' }}>
                                <Card.Title style={{ color: '#656565' }}>Generación de códigos mensuales</Card.Title>
                            </Card.Footer>
                        </Card>
                    </Col>

                    {/* Fila 2 */}
                    <Col xs={12} md={6} lg={6}>
                        <Card className="text-center h-100" style={{ border: 'none' }}>
                            <Card.Body>
                                <RentasOficinasLineChart />
                            </Card.Body>
                            <Card.Footer style={{ background: '#FFFFFF' }}>
                                <Card.Title style={{ color: '#656565' }}>Rentas de inmuebles</Card.Title>
                            </Card.Footer>
                        </Card>
                    </Col>

                    <Col xs={12} md={6} lg={6}>
                        <Card className="text-center h-100" style={{ border: 'none', background: '#FFFFFF' }}>
                            <Card.Body style={{ padding: '1rem' }}>
                                <div style={{ width: '100%', height: '100%' }}>
                                    <RentasOficinasHeatmapChart />
                                </div>
                            </Card.Body>
                            <Card.Footer style={{ background: '#FFFFFF' }}>
                                <Card.Title style={{ color: '#656565' }}>Rentas de espacios</Card.Title>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Inicio;