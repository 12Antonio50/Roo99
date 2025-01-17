import React, { useRef } from "react";
import ButtonCard from "../../Components/Acciones/ButtonCard";
import VistaMenu from "../../Components/Acciones/MenuVista";
import FooterCliente from "../../Components/Acciones/FooterCliente";
import "../../styles/Style.clientes.css";
import img_10 from "../../assets/images/img_welcome.jpeg";
import { Link } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import ImageCarousel from "../../Components/Renderizado/ImageCarousel";
import Formulario from "./Formulario";
import useNotificaciones from "../../Utils/Function/Clientes";

const InicioPublico = () => {
    const formularioRef = useRef(null);

    const scrollToFormulario = () => {
        formularioRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    const {
        isLoading,
        errorCorreo,
        mostrarAlerta,
        mensajeAlerta,
        valorFormulario,
        enviarFormulario,
        manejarCambioInput
    } = useNotificaciones();

    return (
        <>
            <div style={{ position: 'sticky', top: '0', zIndex: '1000', backgroundColor: '#FFFFFF' }}>
                <VistaMenu />
            </div>
            <div className="front-page">
                <div className="background-overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 card-front">
                            <div className="card card-body p-4">
                                <h3 className="card-front-text">Tú tienes la pasión, nosotros el lugar perfecto para ti.</h3>
                                <h6 className="card-front-second-text my-2">
                                    Únete a nuestra comunidad de espacios de coworking y haz realidad tus sueños empresariales.
                                </h6>
                                <Form className="my-2" onSubmit={enviarFormulario}>
                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            type="text"
                                            placeholder="Nombre"
                                            required
                                            name="Nombre"
                                            value={valorFormulario.Nombre}
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

                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            type="Number"
                                            placeholder="Teléfono"
                                            required
                                            name="Telefono"
                                            value={valorFormulario.Telefono}
                                            onChange={manejarCambioInput}
                                        />
                                    </Form.Group>

                                    <Button type="submit" className="btn btn-card" disabled={isLoading}>
                                        {isLoading ? "Enviando..." : "Enviar"}
                                    </Button>
                                </Form>

                                {mostrarAlerta && (
                                    <Alert variant="success" className="mt-3">
                                        {mensajeAlerta}
                                    </Alert>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <ImageCarousel />
            </div>
            <div className="container-fluid pb-4" style={{ background: "#F0F0F0" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 mt-3">
                            <div className="card card-second rounded-0 h-100">
                                <div className="card-body p-4">
                                    <h5 className="card-second-title my-3">Espacios de Trabajo y Coworking</h5>
                                    <h6 className="card-second-p my-3">Ciudad de México</h6>
                                    <ul className="list-unstyled my-3">
                                        <li className="d-flex align-items-center mb-3">
                                            <i className="fas fa-check me-3"></i>
                                            <span>Espacios coworking a excelentes precios</span>
                                        </li>
                                        <li className="d-flex align-items-center mb-3">
                                            <i className="fas fa-check me-3"></i>
                                            <span>Ubicación perfecta para tu negocio</span>
                                        </li>
                                        <li className="d-flex align-items-center mb-3">
                                            <i className="fas fa-check me-3"></i>
                                            <span>Limpieza y Cafetería incluidos</span>
                                        </li>
                                    </ul>
                                    <p className="card-p my-3">
                                        ¿Necesitas un espacio de trabajo flexible y asequible? Rootworking ofrece renta de
                                        espacios
                                        de coworking con todas las comodidades que necesitas para crecer y conectarte.
                                    </p>
                                </div>
                                <div className="card-footer p-0">
                                    <ButtonCard onClick={scrollToFormulario}>Información</ButtonCard>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mt-3">
                            <div className="card card-second rounded-0 h-100">
                                <div className="card-body p-4">
                                    <h5 className="card-second-title my-3">Salas Privadas y Espacios de Coworking</h5>
                                    <h6 className="card-second-p my-3">Ciudad de México</h6>
                                    <ul className="list-unstyled my-3">
                                        <li className="d-flex align-items-center mb-3">
                                            <i className="fas fa-check me-3"></i>
                                            <span>Espacios coworking a excelentes precios</span>
                                        </li>
                                        <li className="d-flex align-items-center mb-3">
                                            <i className="fas fa-check me-3"></i>
                                            <span>Ubicación perfecta para tu negocio</span>
                                        </li>
                                        <li className="d-flex align-items-center mb-3">
                                            <i className="fas fa-check me-3"></i>
                                            <span>Limpieza y Cafetería incluidos</span>
                                        </li>
                                    </ul>
                                    <p className="card-p my-3">
                                        En Rootworking, ofrecemos espacios de trabajo privados para tus reuniones y
                                        presentaciones. Reserva en línea y paga solo por el tiempo que necesites.
                                    </p>
                                </div>
                                <div className="card-footer p-0">
                                    <ButtonCard onClick={scrollToFormulario}>Información</ButtonCard>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mt-3">
                            <div className="card card-second rounded-0 h-100">
                                <div className="card-body p-4">
                                    <h5 className="card-second-title my-3">Salas de Juntas en Espacios de Coworking</h5>
                                    <h6 className="card-second-p my-3">Ciudad de México</h6>
                                    <ul className="list-unstyled list-items my-3">
                                        <li className="d-flex align-items-center mb-3">
                                            <i className="fas fa-check me-3"></i>
                                            <span>Espacios coworking a excelentes precios</span>
                                        </li>
                                        <li className="d-flex align-items-center mb-3">
                                            <i className="fas fa-check me-3"></i>
                                            <span>Ubicación perfecta para tu negocio</span>
                                        </li>
                                        <li className="d-flex align-items-center mb-3">
                                            <i className="fas fa-check me-3"></i>
                                            <span>Limpieza y Cafetería incluidos</span>
                                        </li>
                                    </ul>
                                    <p className="card-p my-3">
                                        En Rootworking, ofrecemos salas de juntas totalmente equipadas para reuniones
                                        productivas. Reserva en línea y paga solo por el tiempo que necesites.
                                    </p>
                                </div>
                                <div className="card-footer p-0">
                                    <ButtonCard onClick={scrollToFormulario}>Información</ButtonCard>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-4">
                            <div className="card card-three rounded-0 h-100">
                                <div className="card-body p-4">
                                    <h3 className="card-three-title my-3">¡Únete a nuestra comunidad de RootWorking hoy! <br />
                                        <br />Ponte en contacto con nosotros para reservar tu espacio de trabajo perfecto.
                                    </h3>
                                    <div className="card-threee-title-mobile">
                                        ¡Únete a nuestra comunidad de RootWorking hoy!
                                        <p className="card-three-p">
                                            Ponte en contacto con nosotros para reservar tu espacio de trabajo perfecto.
                                        </p>
                                        <h5 className="card-three-text my-3">Contacto</h5>
                                        <ul className="list-unstyled list-items my-4">
                                            <li className="d-flex align-items-center mb-3">
                                                <i className="fab icon-three fa-whatsapp me-3"></i>
                                                <a href="https://wa.link/ixp1bq" className="a-three">55 5922 8379</a>
                                            </li>
                                            <li className="d-flex align-items-center mb-3">
                                                <i className="fas icon-three fa-phone me-3"></i>
                                                <a href="tel:5524620319" className="a-three">55 2462 0319</a>
                                            </li>
                                            <li className="d-flex align-items-center mb-3">
                                                <i className="fas icon-three fa-phone me-3"></i>
                                                <a href="tel:5559228379" className="a-three">55 5922 8379</a>
                                            </li>
                                            <li className="d-flex align-items-center mb-3">
                                                <i className="fas icon-three fa-envelope-open-text me-3"></i>
                                                <a href="mailto:contacto@rootworking.mx"
                                                    className="a-three">contacto@rootworking.mx</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mt-3">
                            <div className="card card-second rounded-0 h-100">
                                <div className="card-body p-4">
                                    <h5 className="card-second-title my-3">Salas de Capacitación en Espacios de Coworking
                                    </h5>
                                    <h6 className="card-second-p my-3">Ciudad de México</h6>
                                    <ul className="list-unstyled list-items my-3">
                                        <li className="d-flex align-items-center mb-3">
                                            <i className="fas fa-check me-3"></i>
                                            <span>Espacios coworking a excelentes precios</span>
                                        </li>
                                        <li className="d-flex align-items-center mb-3">
                                            <i className="fas fa-check me-3"></i>
                                            <span>Ubicación perfecta para tu negocio</span>
                                        </li>
                                        <li className="d-flex align-items-center mb-3">
                                            <i className="fas fa-check me-3"></i>
                                            <span>Limpieza y Cafetería incluidos</span>
                                        </li>
                                    </ul>
                                    <p className="card-p my-3">
                                        En Rootworking, ofrecemos salas de capacitación para eventos y talleres. Ofrece una
                                        experiencia RootWorking de aprendizaje inolvidable. Reserva en línea y paga solo por el
                                        tiempo que necesites.
                                    </p>
                                </div>
                                <div className="card-footer p-0">
                                    <ButtonCard onClick={scrollToFormulario}>Información</ButtonCard>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mt-3">
                            <div className="card card-second rounded-0 h-100">
                                <div className="card-body p-4">
                                    <h5 className="card-second-title my-3">Áreas Comunes en Espacios de Coworking</h5>
                                    <h6 className="card-second-p my-3">Ciudad de México</h6>
                                    <ul className="list-unstyled list-items my-3">
                                        <li className="d-flex align-items-center mb-3">
                                            <i className="fas fa-check me-3"></i>
                                            <span>Espacios coworking a excelentes precios</span>
                                        </li>
                                        <li className="d-flex align-items-center mb-3">
                                            <i className="fas fa-check me-3"></i>
                                            <span>Ubicación perfecta para tu negocio</span>
                                        </li>
                                        <li className="d-flex align-items-center mb-3">
                                            <i className="fas fa-check me-3"></i>
                                            <span>Limpieza y Cafetería incluidosr</span>
                                        </li>
                                    </ul>
                                    <p className="card-p my-3">
                                        En Rootworking, obtienes más que una oficina privada. Accede a nuestras áreas comunes,
                                        eventos y oportunidades de networking. Alquila hoy y únete a nuestra comunidad
                                        colaborativa.
                                    </p>
                                </div>
                                <div className="card-footer p-0">
                                    <ButtonCard onClick={scrollToFormulario}>Información</ButtonCard>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container bg-white mt-3">
                    <div className="row">
                        <div className="col-md-5 p-5 d-flex justify-content-center align-items-center">
                            <div className="inf-welcome p-3">
                                <h2 className="title-welcome my-3">¡Bienvenido a Root Working!</h2>
                                <p className="p-welcome my-3">
                                    Somos una empresa de coworking ubicada en la Ciudad de México, fundada con el objetivo de
                                    brindar a nuestros clientes una experiencia única de trabajo en un espacio cómodo y
                                    acogedor.
                                    <br />
                                    <br />
                                    Toma tus proyectos al siguiente nivel con RootWorking: Tus espacios de coworking en la
                                    Ciudad de México
                                </p>
                                <Link to="/nuestra-historia" className="d-flex justify-content-end" >Leer más</Link>
                            </div>
                        </div>
                        <div className="col-md-7 d-flex justify-content-center align-items-center p-5">
                            <img src={img_10} alt="..." width="100%" height="400" />
                        </div>
                    </div>
                </div>
            </div>
            <div ref={formularioRef}>
                <Formulario />
            </div>
            <FooterCliente />
        </>
    );
}

export default InicioPublico;