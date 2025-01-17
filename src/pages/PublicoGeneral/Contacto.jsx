import React from "react";
import VistaMenu from "../../Components/Acciones/MenuVista";
import FooterCliente from "../../Components/Acciones/FooterCliente";
import Formulario from "./Formulario";
import ImageCarousel from "../../Components/Renderizado/ImageCarousel";
import "../../styles/Style.clientes.css";

const Contacto = () => {
    return (
        <>
            <div style={{ position: 'sticky', top: '0', zIndex: '1000', backgroundColor: '#FFFFFF' }}>
                <VistaMenu />
            </div>
            <div className="front-page-contact">
                <div className="background-overlay">
                    <h1 className="front-page-text">
                        Contáctanos
                    </h1>
                </div>
                <ImageCarousel />
            </div>
            <div className="container-fluid pb-2" style={{ background: "#F0F0F0" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mt-3">
                            <div className="icon-box">
                                <div className="icon text-center">
                                    <i className="fas about-icon-body fa-map-marker-alt"></i>
                                </div>
                                <div className="content mt-3">
                                    <h3 className="about-h3-body text-center">¡Visítanos hoy!</h3>
                                    <p className="contact-p">
                                        1. Calle Rio Tiber #103 Int. 201 y 202 Colonia Cuauhtémoc, Alcaldía Cuauhtémoc, CDMX,
                                        México, C.P. 06500 <br />
                                        2. Calle Tomas Alva Edison #149 Int. 201 y 202 Colonia San Rafael, Alcaldía
                                        Cuauhtémoc, CDMX, México, C.P. 06470
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mt-3">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.6187067988762!2d-99.17156482558485!3d19.428873781849763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff4a8b03ffff%3A0xd1d9ebc31951c505!2sC.%20R%C3%ADo%20Tiber%20103-Int.%20201%20y%20202%2C%20Cuauht%C3%A9moc%2C%2006500%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses-419!2smx!4v1732818318088!5m2!1ses-419!2smx"
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Mapa de ubicación - Ciudad de México"
                            />
                        </div>
                        <div className="col-md-6 mt-3">
                            <h3 className="contact-h3">¡Únete a nuestra comunidad de RootWorking hoy!</h3>
                            <button className="btn-contact mt-2 pt-3" onClick={() => window.location.href = 'tel:+525549109289'}>
                                <i className=" fas fa-phone me-3"></i>+52 55 4910 9289
                            </button>
                            <br />
                            <button className="btn-contact mt-2 pb-3" onClick={() => window.location.href = 'mailto:contacto@rootworking.mx'}>
                                <i className="fas fa-envelope-open-text me-3"></i>contacto@rootworking.mx
                            </button>
                            <h3 className="contact-h3">Ponte en contacto con nosotros para reservar tu espacio de trabajo perfecto.
                            </h3>
                        </div>
                        <div className="col-md-6">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.393004888509!2d-99.1597160255845!3d19.438615381842034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f8ce04433511%3A0xf0bb7e7066930aa0!2sTomas%20Alva%20Edison%20149-Int.%20201%20y%20202%2C%20San%20Rafael%2C%20Cuauht%C3%A9moc%2C%2006470%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses-419!2smx!4v1732818571688!5m2!1ses-419!2smx"
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Mapa de ubicación - San Rafael, Ciudad de México"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Formulario />
            <FooterCliente />
        </>
    );
}

export default Contacto;