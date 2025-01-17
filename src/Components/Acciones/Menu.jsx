import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Navbar, Offcanvas, Button, Image } from "react-bootstrap";
import Cookie from "js-cookie";
import { GiHamburgerMenu, GiExitDoor } from "react-icons/gi";
import { FaBarcode } from "react-icons/fa";
import { MdWorkspacePremium, MdDashboardCustomize } from "react-icons/md";
import { RiMoneyDollarBoxFill, RiPagesFill } from "react-icons/ri";
import { HiOfficeBuilding } from "react-icons/hi";
import { BsBuildingFillGear } from "react-icons/bs";
import { PiUserGearFill, PiDesktopTowerFill } from "react-icons/pi";
import Pluma from "../../assets/images/plumas.jpg";
import LogoWhite from "../../assets/images/rootWhite.png";
import "../../styles/style.otros.css";

const Menu = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [activeButton, setActiveButton] = useState(null);

    const nombre = Cookie.get("nombre");
    const apellido_paterno = Cookie.get("apellido_paterno");
    const rol = Cookie.get("rol");
    const nuevoRol = rol === "A" ? "Administrador" : "Administrador de apoyo";

    const handleToggleMenu = () => setShowMenu(!showMenu);
    const handleActiveButton = (buttonName) =>
        setActiveButton(buttonName === activeButton ? null : buttonName);
    const handleLogout = () => {
        Cookie.remove("token");
        Cookie.remove("rol");
        Cookie.remove("area");
        Cookie.remove("correo");
        Cookie.remove("nombre");
        Cookie.remove("apellido_paterno");
        window.location.href = "/ad/root-working/inicio-de-sesion";
    };

    const textoSobreImagen = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "white",
        textAlign: "center",
        textShadow: "0 0 5px rgba(0, 0, 0, 0.8)",
    };

    const contenedorImagen = {
        width: "100%",
        maxHeight: "100px",
        objectFit: "cover",
        display: "block"
    };

    const contenedorPerfil = {
        position: "relative",
        overflow: "hidden",
    };

    const adminPNo = () => {
        if (rol === 'A') {
            return { path: "/agregar-usuarios", label: "Gestionar usuarios", icon: <PiUserGearFill /> }
        }
        return null;
    }

    const buttons = [
        ...[adminPNo()].filter(Boolean),
        { path: "/codigos", label: "Códigos", icon: <FaBarcode /> },
        { path: "/home", label: "Dashboard", icon: <MdDashboardCustomize /> },
        { path: "/editar-espacios", label: "Editar espacios", icon: <MdWorkspacePremium /> },
        { path: "/ingresos", label: "Ingresos", icon: <RiMoneyDollarBoxFill /> },
        { path: "/inicio", label: "Recepción", icon: <PiDesktopTowerFill /> },
        { path: "/rentas", label: "Rentas", icon: <HiOfficeBuilding /> },
        { path: "/rentas-retroactivas", label: "Rentas retroactivas", icon: <BsBuildingFillGear /> },
        { path: "/vista-general", label: "Vista general", icon: <RiPagesFill /> },
    ];

    return (
        <>
            <Navbar expand="lg" className="custom-navBar px-3">
                <div className="d-flex align-items-center justify-content-between w-100">
                    <div className="d-flex align-items-center p-0">
                        <div className="img-log h-100">
                            <Navbar.Brand as={NavLink} to={`/home`}>
                                <div className="imagen-logo"></div>
                            </Navbar.Brand>
                        </div>
                        <Button
                            variant="outline-light"
                            className="btn-menu"
                            onClick={handleToggleMenu}
                        >
                            <GiHamburgerMenu />
                        </Button>
                    </div>
                    <Button
                        variant="outline-light"
                        className="btn-salir"
                        onClick={handleLogout}
                    >
                        <GiExitDoor className="icon-salir" />
                    </Button>
                </div>
            </Navbar>

            <Offcanvas show={showMenu} onHide={handleToggleMenu} placement="start">
                <Offcanvas.Header closeButton style={{ background: "#c68608" }}>
                    <Offcanvas.Title>
                        <Image
                            src={LogoWhite}
                            width={65}
                            height={49}
                            alt="logo"
                            className="img-logo"
                        />
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="p-0" style={{ background: "#fdf7c4" }}>
                    <div className="d-flex justify-content-center align-items-center" style={contenedorPerfil}>
                        <img src={Pluma} style={contenedorImagen} alt="" />
                        <Link to={`/configuracion`}>
                            <div className="text" style={textoSobreImagen}>
                                <h6>{nombre} {apellido_paterno}</h6>
                                <p>{nuevoRol}</p>
                            </div>
                        </Link>
                    </div>
                    <div className="btn-container">
                        {buttons.map(({ path, label, icon }) => (
                            <NavLink
                                key={path}
                                to={path}
                                className={`btn-opc ${activeButton === label ? "activo" : ""}`}
                                onClick={() => handleActiveButton(label)}
                            >
                                <div className="btn-opc-container">
                                    {icon}
                                    <span>{label}</span>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default Menu;