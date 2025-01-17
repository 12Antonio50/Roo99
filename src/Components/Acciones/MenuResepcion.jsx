import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import Logo from "../../assets/images/LogoRoot.png";
import { IoLogOutSharp } from "react-icons/io5";
import Cookie from "js-cookie";
import "../../styles/style.principal.css";
import { FaUserEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const MenuResepcion = () => {
    const handleSalir = () => {
        Cookie.remove('token');
        Cookie.remove('rol');
        Cookie.remove('area');
        Cookie.remove('correo');
        Cookie.remove('nombre');
        Cookie.remove('apellido_paterno');
        localStorage.removeItem('idUnico');
        window.location.href = '/ad/root-working/inicio-de-sesion';
    };

    const handleEditar = () => {
        window.location.href = '/configuracion'
    }

    return (
        <div className="custom-navbar d-flex align-items-center px-4">
            <Navbar expand="lg" className="navbar-light bg-white w-100 h-100">
                <Navbar.Brand href="http://localhost:3000/inicio" className="me-3">
                    <img
                        src={Logo}
                        width="70"
                        height="60"
                        className="d-inline-block align-top"
                        alt="Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarNav" className="menu-small" />
                <Navbar.Collapse id="navbarNav">
                    <Nav className="text-center">
                        <Nav.Link href="https://espacios.rootworking.mx/vista-general" className="nav-link">
                            Reservar espacio a cliente
                        </Nav.Link>
                        <div className="d-lg-none">
                            <Nav.Link onClick={handleEditar} className="nav-link">
                                Editar Usuario
                            </Nav.Link>
                            <Nav.Link onClick={handleSalir} className="nav-link">
                                Cerrar Sesión
                            </Nav.Link>
                        </div>
                    </Nav>
                    <div className="d-none d-lg-flex ms-auto">
                        <Link to={"/configuracion"} className="tooltip-container me-2">
                            <FaUserEdit className="ed-icon" />
                            <span className="tooltip-ed">Editar Usuario</span>
                        </Link>
                        <button onClick={handleSalir} className="tooltip-container">
                            <IoLogOutSharp className="lo-icon" />
                            <span className="tooltip-lo">Cerrar Sesión</span>
                        </button>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default MenuResepcion;