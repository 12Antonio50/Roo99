import React from "react";
import {
    FaFacebookSquare,
    FaWhatsappSquare,
    FaInstagramSquare,
    FaPhoneAlt,
    FaEnvelope
} from "react-icons/fa";
import { Col, Container, Row } from "react-bootstrap";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import Logo from "../../assets/images/LogoRoot.png";
import "../../styles/style.principal.css";
import BotonWA from '../../Components/Acciones/BotonWA';

const FooterCliente = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    return (
        <>
            <button
                style={{
                    width: '100%',
                    background: '#ededed',
                    border: 'none',
                    height: '5rem',
                    fontSize: '18px',
                    color: '#333'
                }}
                onClick={scrollToTop}
            ><BsFillArrowUpCircleFill /> Regresar al principio</button>
            <footer className="footer mt-4">
                <Container className='my-3'>
                    <Row className="footer-content d-flex justify-content-center">
                        <Col md={3} className="footer-logo">
                            <img src={Logo} alt="Rootworking Logo" style={{ width: '68px', height: 'auto', marginTop: '-15px' }} />
                            <p>Desbloquea tu creatividad en nuestro espacio de coworking colaborativo y moderno. Únete hoy mismo.</p>
                        </Col>
                        <Col md={3} className="footer-address">
                            <h5 className='fw-bold' style={{ fontSize: '25px' }}>Visítanos</h5>
                            <p>
                                Calle Río Tíber #103 Int. 201 y 202<br />
                                Colonia Cuauhtémoc,<br />
                                Alcaldía Cuauhtémoc,<br />
                                CDMX, México, C.P. 06500 <br />
                                Calle Tomas Alva Edison #149 Int. 201 y 202 <br />
                                Colonia San Rafael, <br />
                                Alcaldía Cuauhtémoc, <br />
                                CDMX, México, C.P. 06470
                            </p>
                        </Col>
                        <Col md={3} className="footer-contact">
                            <div className="btn-contact">
                                <FaPhoneAlt className="icon-footer" />
                                <a
                                    style={{ fontSize: '18px' }}
                                    href="tel:+525549109289"
                                >
                                    +52 55 4910 9289
                                </a>
                            </div>
                            <div className='btn-contact my-3'>
                                <FaEnvelope className="icon-footer" />
                                <a
                                    style={{ fontSize: '18px' }}
                                    href="mailto:contacto@rootworking.mx"
                                >
                                    contacto@rootworking.mx
                                </a>
                            </div>
                        </Col>
                        <Col md={3}>
                            <a
                                className="btn-facebook mb-2"
                                href="https://www.facebook.com/share/1BiLMEGNSG/?mibextid=wwXlfr"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaFacebookSquare className="icon-redes" />
                                <span className="a-redes">Facebook</span>
                            </a>

                            <a
                                className="btn-whatsapp mb-2"
                                href="https://wa.me/525549109289"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaWhatsappSquare className="icon-redes" />
                                <span className="a-redes">WhatsApp</span>
                            </a>

                            <a
                                className="btn-instagram"
                                href="https://www.instagram.com/root_working1712/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaInstagramSquare className="icon-redes" />
                                <span className="a-redes">Instagram</span>
                            </a>
                        </Col>
                    </Row>
                </Container>
                <div
                    style={{
                        background: '#333333',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <h6 style={{ color: '#E5E5DD', fontSize: '16px' }}>
                        Todos los derechos reservados. &copy; 2025 Rootworking
                    </h6>
                </div>
                <BotonWA />
            </footer>
        </>
    );
}

export default FooterCliente;