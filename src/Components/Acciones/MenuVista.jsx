import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FaPhoneAlt } from 'react-icons/fa';
import { useLocation, Link } from 'react-router-dom';
import { BsTelephone } from "react-icons/bs";
import { MdOutlineMailOutline } from "react-icons/md";
import "../../styles/style.principal.css";

const VistaMenu = () => {
    const location = useLocation();
    return (
        <>
            <div className='custom-navbar d-flex justify-content-center align-items-center'>
                <Navbar expand="lg" className="bg-white h-100">
                    <Navbar.Brand href="https://rootworking.mx/">
                        <div className="imagen-logo-rentas"></div>
                    </Navbar.Brand>

                    <div className="d-flex d-lg-none justify-content-center mt-2">
                        <a
                            href="tel:+525549109289"
                            className="mx-2"
                            style={{
                                background: '#fafafa',
                                color: 'black',
                                width: '50px',
                                height: '50px',
                                borderRadius: '0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: '-15px',
                                padding: '0',
                                textDecoration: 'none'
                            }}
                        >
                            <BsTelephone style={{ fontSize: '25px' }} />
                        </a>
                        <a
                            href="mailto:contacto@rootworking.mx"
                            className="mx-2"
                            style={{
                                background: '#000',
                                color: 'black',
                                width: '50px',
                                height: '50px',
                                borderRadius: '0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: '-15px',
                                padding: '0',
                                textDecoration: 'none'
                            }}
                        >
                            <MdOutlineMailOutline style={{ fontSize: '30px', color: "#FFFF" }} />
                        </a>
                    </div>
                    <Navbar.Toggle aria-controls="navbarNav" className="menu-small mx-auto" />
                    <Navbar.Collapse id="navbarNav" className="justify-content-center">
                        <Nav>
                            <Nav.Link as={Link} to="/" className={location.pathname === "/" ? "nav-link active" : "nav-link"}>
                                Inicio
                            </Nav.Link>
                            <Nav.Link as={Link} to="/servicios" className={location.pathname === "/servicios" ? "nav-link active" : "nav-link"}>
                                Nuestro espacio
                            </Nav.Link>
                            <Nav.Link as={Link} to="/nuestra-historia" className={location.pathname === "/nuestra-historia" ? "nav-link active" : "nav-link"}>
                                Sobre Nosotros
                            </Nav.Link>
                            <Nav.Link as={Link} to="/contacto" className={location.pathname === "/contacto" ? "nav-link active" : "nav-link"}>
                                Contacto
                            </Nav.Link>
                            <Nav.Link as={Link} to="/espacios" className={location.pathname === "/espacios" ? "nav-link active" : "nav-link"}>
                                Reserva tu espacio
                            </Nav.Link>
                            <div className="d-none d-lg-flex contact-btn">
                                <a href="tel:+525549109289" className="btn-phone">
                                    <FaPhoneAlt className="phone-icon" /> Contáctanos
                                </a>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </>
    );
}

export default VistaMenu;
