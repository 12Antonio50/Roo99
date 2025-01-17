import React, { useRef } from "react";
import VistaMenu from "../../Components/Acciones/MenuVista";
import FooterCliente from "../../Components/Acciones/FooterCliente";
import Formulario from "./Formulario";
import ButtonCard from "../../Components/Acciones/ButtonCard";
import "../../styles/Style.clientes.css";
import ImageCarousel from "../../Components/Renderizado/ImageCarousel";
import Logo from "../../assets/images/logo.jpeg";
import Img_1 from "../../assets/images/img_1.jpg";
import Espacio from "../../assets/images/9.jpg";
import Card_1 from "../../assets/images/img_card_1.jpg"
import Card_2 from "../../assets/images/img_card_2.jpeg";
import Card_3 from "../../assets/images/img_card_3.jpeg";
import Card_4 from "../../assets/images/img_card_4.jpeg";
import Card_5 from "../../assets/images/img_card_5.jpeg";
import Card_6 from "../../assets/images/img_card_6.png";

const SobreNosotros = () => {
    const formularioRef = useRef(null);

    const scrollToFormulario = () => {
        formularioRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <>
            <div style={{ position: 'sticky', top: '0', zIndex: '1000', backgroundColor: '#FFFFFF' }}>
                <VistaMenu />
            </div>
            <div className="front-page">
                <div className="background-overlay">
                    <h1 className="front-page-text">
                        Toma tus proyectos al siguiente nivel con RootWorking
                    </h1>
                    <p className="front-page-p">Tus espacios de coworking en la
                        Ciudad de México</p>
                </div>
                <ImageCarousel />
            </div>
            <section className="container-fluid bg-white p-4">
                <div className="about-body-img text-center">
                    <img src={Logo} alt="Logo RootWorking" width="auto" height="200" />
                </div>
                <div className="about-content">
                    <h2 className="about-title-body text-center mt-3">¡Bienvenido a RootWorking!</h2>
                    <h4 className="about-text-body mt-3">
                        Somos una empresa de CoWorking ubicada en la Ciudad de México, fundada
                        recientemente con el objetivo de brindar a nuestros clientes una experiencia
                        única de trabajo en un espacio cómodo y acogedor.
                    </h4>
                    <img src={Img_1} alt="..." width="100%" className="mt-3" />
                    <h5 className="about-text-body-small mt-3">
                        Ofrecemos una variedad de servicios para adaptarnos a las necesidades de nuestros
                        clientes, desde la renta de espacios de coworking, salas privadas, salas de juntas y
                        capacitación, hasta áreas comunes que promueven la colaboración y el intercambio de
                        ideas.
                    </h5>
                    <h5 className="about-text-body-small mt-3">
                        En Root Working, nuestra misión es brindar un espacio de trabajo inspirador y
                        motivador para emprendedores, pequeñas empresas y profesionales independientes. Nos
                        enorgullece ofrecer un ambiente moderno y dinámico donde la creatividad y la
                        productividad pueden florecer.
                    </h5>
                    <h5 className="about-text-body-small mt-3">
                        Nuestra ubicación en la Reforma de la Ciudad de México es ideal para aquellos que
                        buscan un espacio de coworking cercano a las principales áreas comerciales y
                        empresariales. Además, nuestras instalaciones están diseñadas para satisfacer las
                        necesidades de cualquier tipo de negocio, desde empresas de tecnología hasta
                        consultoras y agencias de publicidad.
                    </h5>
                    <div className="icon-box mt-3">
                        <div className="icon">
                            <i className="fas about-icon-body fa-map-marker-alt"></i>
                        </div>
                        <div className="content mt-3">
                            <h3 className="about-h3-body">¡Visítanos hoy!</h3>
                            <p className="about-p-body">
                                Calle Rio Tiber #103 Int. 201 y 202
                                Colonia Cuauhtemoc,
                                Alcaldia Cuauhtemoc,
                                CDMX, México, C.P. 06500
                            </p>
                        </div>
                    </div>
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
                    <div className="icon-box mt-3">
                        <div className="icon">
                            <i className="fas about-icon-body fa-map-marker-alt"></i>
                        </div>
                        <div className="content mt-3">
                            <h3 className="about-h3-body">¡Visítanos hoy!</h3>
                            <p className="about-p-body">
                                Calle Tomas Alva Edison #149 Int. 201 y 202 Colonia San Rafael, Alcaldía
                                Cuauhtémoc, CDMX, México, C.P. 06470
                            </p>
                        </div>
                    </div>
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

                    <h5 className="about-text-body-small mt-3">
                        En Root Working, creemos que un buen ambiente de trabajo puede marcar la diferencia
                        en el éxito de una empresa o proyecto. Por lo tanto, nos esforzamos por ofrecer un
                        lugar donde nuestros clientes se sientan cómodos y motivados para alcanzar sus
                        metas. Si estás buscando espacios de coworking flexibles y dinámicos en la Reforma,
                        ¡no busques más allá de Root Working!
                    </h5>
                    <img src={Espacio} alt="..." width="100%" className="mt-3" />
                    <h3 className="about-sub-title-body mt-3 text-center">¡Gracias por visitar!</h3>
                    <p className="about-text-body-small mt-3">
                        Si deseas obtener más información sobre nuestros servicios de coworking en la
                        Reforma o deseas programar una visita a nuestro espacio, contáctanos llenando
                        nuestro formulario en línea, llamando por teléfono o enviando un mensaje a través de
                        WhatsApp. ¡Nos encantaría ayudarte a encontrar el espacio de trabajo perfecto para
                        tus necesidades!
                    </p>
                    <div className="row mb-5">
                        <div className="col-md-6 mt-3">
                            <button onClick={scrollToFormulario} className="about-btn-body">
                                ¡Llena el formulario para cotizar tu espacio!
                            </button>
                        </div>
                        <div className="col-md-6 mt-3">
                            <button className="about-btn-body">
                                <i className="fas fa-phone pe-1"></i>¡Llámanos ahora para más información!
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container-fluid pb-5 pt-4" style={{ background: "#F0F0F0" }}>
                <section className="section-2">
                    <div className="container">
                        <h3 className="section-2-up">Tu lugar de trabajo perfecto te espera</h3>
                        <div className="row">
                            <article className="col-md-4 my-3">
                                <div className="card rounded-0 h-100">
                                    <img src={Card_1} alt="Áreas de Trabajo" />
                                    <div className="card-body">
                                        <h5 className="card-second-title my-3">Áreas de Trabajo</h5>
                                        <h6 className="card-second-p my-3">Ciudad de México</h6>
                                        <ul className="list-unstyled my-3">
                                            <li className="d-flex align-items-center mb-3">
                                                <i className="fas fa-check me-3"></i>
                                                <span>Excelentes precios​</span>
                                            </li>
                                            <li className="d-flex align-items-center mb-3">
                                                <i className="fas fa-check me-3"></i>
                                                <span>Perfecta ubicación​</span>
                                            </li>
                                            <li className="d-flex align-items-center mb-3">
                                                <i className="fas fa-check me-3"></i>
                                                <span>Limpieza y Cafetería​</span>
                                            </li>
                                        </ul>
                                        <p className="card-p my-3">
                                            ¿Necesitas un espacio de trabajo flexible y asequible? Rootworking ofrece renta de
                                            áreas de trabajo con todas las comodidades que necesitas para crecer y conectarte.
                                        </p>
                                    </div>
                                    <div className="card-footer p-0">
                                        <ButtonCard onClick={scrollToFormulario}>Información</ButtonCard>
                                    </div>
                                </div>
                            </article>

                            <article className="col-md-4 my-3">
                                <div className="card rounded-0 h-100">
                                    <img src={Card_2} alt="Salas Privadas" />
                                    <div className="card-body">
                                        <h5 className="card-second-title my-3">Salas Privadas​</h5>
                                        <h6 className="card-second-p my-3">Ciudad de México</h6>
                                        <ul className="list-unstyled my-3">
                                            <li className="d-flex align-items-center mb-3">
                                                <i className="fas fa-check me-3"></i>
                                                <span>Excelentes precios​</span>
                                            </li>
                                            <li className="d-flex align-items-center mb-3">
                                                <i className="fas fa-check me-3"></i>
                                                <span>Perfecta ubicación​</span>
                                            </li>
                                            <li className="d-flex align-items-center mb-3">
                                                <i className="fas fa-check me-3"></i>
                                                <span>Limpieza y Cafetería​</span>
                                            </li>
                                        </ul>
                                        <p className="card-p my-3">
                                            En Rootworking, ofrecemos espacios de trabajo privados para tus reuniones y
                                            presentaciones.
                                        </p>
                                    </div>
                                    <div className="card-footer p-0">
                                        <ButtonCard onClick={scrollToFormulario}>Información</ButtonCard>
                                    </div>
                                </div>
                            </article>

                            <article className="col-md-4 my-3">
                                <div className="card rounded-0 h-100">
                                    <img src={Card_3} alt="Salas de Juntas" />
                                    <div className="card-body">
                                        <h5 className="card-second-title my-3">Salas de Juntas​</h5>
                                        <h6 className="card-second-p my-3">Ciudad de México</h6>
                                        <ul className="list-unstyled my-3">
                                            <li className="d-flex align-items-center mb-3">
                                                <i className="fas fa-check me-3"></i>
                                                <span>Excelentes precios​</span>
                                            </li>
                                            <li className="d-flex align-items-center mb-3">
                                                <i className="fas fa-check me-3"></i>
                                                <span>Perfecta ubicación​</span>
                                            </li>
                                            <li className="d-flex align-items-center mb-3">
                                                <i className="fas fa-check me-3"></i>
                                                <span>Limpieza y Cafetería​</span>
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
                            </article>

                            <article className="col-md-4 my-3">
                                <div className="card rounded-0 h-100">
                                    <img src={Card_4} alt="Salas de Capacitación" />
                                    <div className="card-body">
                                        <h5 className="card-second-title my-3">Salas de Capacitación</h5>
                                        <h6 className="card-second-p my-3">Ciudad de México</h6>
                                        <ul className="list-unstyled my-3">
                                            <li className="d-flex align-items-center mb-3">
                                                <i className="fas fa-check me-3"></i>
                                                <span>Excelentes precios​</span>
                                            </li>
                                            <li className="d-flex align-items-center mb-3">
                                                <i className="fas fa-check me-3"></i>
                                                <span>Perfecta ubicación​</span>
                                            </li>
                                            <li className="d-flex align-items-center mb-3">
                                                <i className="fas fa-check me-3"></i>
                                                <span>Limpieza y Cafetería​</span>
                                            </li>
                                        </ul>
                                        <p className="card-p my-3">
                                            En Rootworking, ofrecemos salas de capacitación para eventos y talleres. Ofrece una
                                            experiencia RootWorking de aprendizaje inolvidable.
                                        </p>
                                    </div>
                                    <div className="card-footer p-0">
                                        <ButtonCard onClick={scrollToFormulario}>Información</ButtonCard>
                                    </div>
                                </div>
                            </article>

                            <article className="col-md-4 my-3">
                                <div className="card rounded-0 h-100">
                                    <img src={Card_5} alt="Áreas Comunes" />
                                    <div className="card-body">
                                        <h5 className="card-second-title my-3">Áreas Comunes​</h5>
                                        <h6 className="card-second-p my-3">Ciudad de México</h6>
                                        <ul className="list-unstyled my-3">
                                            <li className="d-flex align-items-center mb-3">
                                                <i className="fas fa-check me-3"></i>
                                                <span>Excelentes precios​</span>
                                            </li>
                                            <li className="d-flex align-items-center mb-3">
                                                <i className="fas fa-check me-3"></i>
                                                <span>Perfecta ubicación​</span>
                                            </li>
                                            <li className="d-flex align-items-center mb-3">
                                                <i className="fas fa-check me-3"></i>
                                                <span>Limpieza y Cafetería​</span>
                                            </li>
                                        </ul>
                                        <p className="card-p my-3">
                                            En Rootworking, obtienes más que una oficina privada. Accede a nuestras áreas
                                            comunes, eventos y oportunidades de networking. Alquila hoy y únete a nuestra
                                            comunidad colaborativa.
                                        </p>
                                    </div>
                                    <div className="card-footer p-0">
                                        <ButtonCard onClick={scrollToFormulario}>Información</ButtonCard>
                                    </div>
                                </div>
                            </article>

                            <article className="col-md-4 my-3">
                                <div className="card section-2-black rounded-0 h-100">
                                    <img src={Card_6} alt="Contacto" />
                                    <div className="card-body">
                                        <h5 className="card-three-text my-3" style={{ color: '#E5E5DD' }}>Contacto</h5>
                                        <ul className="list-unstyled list-items my-4" style={{ color: '#E5E5DD' }}>
                                            <li className="d-flex align-items-center mb-3">
                                                <i className="fab icon-three fa-whatsapp me-3"></i>
                                                <a href="https://wa.link/ixp1bq" className="a-three" style={{ color: '#E5E5DD' }}>55 5922
                                                    8379</a>
                                            </li>
                                            <li className="d-flex align-items-center mb-3">
                                                <i className="fas icon-three fa-phone me-3"></i>
                                                <a href="tel:5524620319" className="a-three" style={{ color: '#E5E5DD' }}>55 2462
                                                    0319</a>
                                            </li>
                                            <li className="d-flex align-items-center mb-3">
                                                <i className="fas icon-three fa-phone me-3"></i>
                                                <a href="tel:5559228379" className="a-three" style={{ color: '#E5E5DD' }}>55 5922
                                                    8379</a>
                                            </li>
                                            <li className="d-flex align-items-center mb-3">
                                                <i className="fas icon-three fa-envelope-open-text me-3"></i>
                                                <a href="mailto:contacto@rootworking.mx" className="a-three"
                                                    style={{ color: '#E5E5DD' }}>contacto@rootworking.mx</a>
                                            </li>
                                        </ul>
                                        <p className="card-p my-3" style={{ color: '#E5E5DD' }}>
                                            ¡Únete a nuestra comunidad de RootWorking hoy! Ponte en contacto con nosotros para
                                            reservar tu espacio de trabajo perfecto.
                                        </p>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>
            </div>
            <div ref={formularioRef}>
                <Formulario />
            </div>
            <FooterCliente />
        </>
    );
}

export default SobreNosotros;