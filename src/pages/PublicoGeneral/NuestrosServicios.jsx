import React, { useRef } from "react";
import VistaMenu from "../../Components/Acciones/MenuVista";
import FooterCliente from "../../Components/Acciones/FooterCliente";
import "../../styles/Style.clientes.css";
import ImageCarousel from "../../Components/Renderizado/ImageCarousel";
import Formulario from "./Formulario";
import Carousel from "../../Components/Renderizado/Carousel";
import S_img_1 from "../../assets/images/s_img_1_1.jpeg";
import S_img_2 from "../../assets/images/s_img_1_2.jpeg";
import S_img_3 from "../../assets/images/s_img_1_3.jpeg";
import S_img_4 from "../../assets/images/s_img_1_4.jpeg";
import S_img_5 from "../../assets/images/s_img_1_5.jpeg";
import S_img_2_1 from "../../assets/images/s_img_2_1.jpg";
import S_img_2_2 from "../../assets/images/s_img_2_2.jpeg";
import S_img_2_3 from "../../assets/images/s_img_2_3.jpg";
import S_img_2_4 from "../../assets/images/s_img_2_4.jpg";
import S_img_2_5 from "../../assets/images/s_img_2_5.jpg";
import S_img_2_6 from "../../assets/images/s_img_2_6.jpg";
import S_img_3_1 from "../../assets/images/img_9.jpeg";
import S_img_3_2 from "../../assets/images/s_img_3_1.jpeg";
import S_img_3_3 from "../../assets/images/img_card_2.jpeg";
import S_img_3_4 from "../../assets/images/s_img_3_2.jpeg";
import S_img_4_1 from "../../assets/images/s_img_4_1.jpeg";
import S_img_4_2 from "../../assets/images/s_img_4_2.jpg";
import S_img_4_3 from "../../assets/images/s_img_4_3.jpg";
import S_img_4_4 from "../../assets/images/s_img_4_4.jpeg";
import S_img_5_1 from "../../assets/images/img_card_4.jpeg";
import S_img_5_2 from "../../assets/images/img_4.jpeg";
import S_img_5_3 from "../../assets/images/img_card_1.jpg";
import Servicios_1 from "../../assets/images/Servicios – Root Working_1.jpeg";
import Servicios_2 from "../../assets/images/img_2_cafe.jpeg";
import Servicios_3 from "../../assets/images/Servicios_Root_Working_3.png";
import Servicios_4 from "../../assets/images/img_impresora.jpeg";
import Video_1 from "../../assets/video/video_Tiber.mp4";
import Video_2 from "../../assets/video/video_Tomas.mp4";

const coworkingImages = [
    S_img_1, S_img_2, S_img_3, S_img_4, S_img_5
];

const oficinasPrivadasImages = [
    S_img_2_1, S_img_2_2, S_img_2_3, S_img_2_4, S_img_2_5, S_img_2_6
];

const salaJuntasImages = [
    S_img_3_1, S_img_3_2, S_img_3_3, S_img_3_4
];

const recepcionImages = [
    S_img_4_1, S_img_4_2, S_img_4_3, S_img_4_4
];

const capacitacionImages = [
    S_img_5_1, S_img_5_2, S_img_5_3
];

const NuestrosServicios = () => {
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
                        Espacios de Coworking en CDMX a Precios Justos
                    </h1>
                </div>
                <ImageCarousel />
            </div>
            <div className="container mt-3">
                <h2 className="our-services-title my-4">Espacios de Trabajo Compartidos y Coworking</h2>
                <h3 className="our-services-text my-4">Trabaja en comunidad y alcanza el éxito.</h3>

                <Carousel images={coworkingImages} />

                <p className="about-text-body-small my-4">
                    Descubre nuestros <b>espacios de coworking</b> en CDMX, donde podrás trabajar en un ambiente cómodo,
                    amigable y completamente equipado. Con <b>espacios de coworking</b> abiertos y colaborativos, tendrás la
                    oportunidad de conocer a otros profesionales y ampliar tu red de contactos, ¡todo mientras incrementas
                    tu productividad!
                </p>

                <div className="conatiner">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="video-container">
                                <video controls>
                                    <source src={Video_1} type="video/mp4" />
                                    Tu navegador no soporta videos HTML5.
                                </video>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="video-container">
                                <video controls>
                                    <source src={Video_2} type="video/mp4" />
                                    Tu navegador no soporta videos HTML5.
                                </video>
                            </div>
                        </div>
                        <div className="container text-center py-5">
                            <h2 className="mb-4 text-center">
                                <i className="bi bi-geo-alt display-4 d-block mb-2"></i>
                                ¡Visítanos hoy!
                            </h2>
                            <div className="row mb-4">
                                <div className="col-md-6 mb-3">
                                    <p>Calle Río Tiber #103 Int. 201 y 202 Colonia Cuauhtémoc, Alcaldía Cuauhtémoc, CDMX,
                                        México, C.P. 06500</p>
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

                                <div className="col-md-6 mb-3">
                                    <p>Calle Tomas Alva Edison #149 Int. 201 y 202 Colonia San Rafael, Alcaldía Cuauhtémoc,
                                        CDMX, México, C.P. 06470</p>
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

                            <div className="row">
                                <div className="col-md-6 d-grid mb-3">
                                    <button onClick={scrollToFormulario} className="btn-warning btn-lg" > ¡Llena el
                                        formulario para cotizar tu espacio!</button>
                                </div>
                                <div className="col-md-6 d-grid mb-3">
                                    <a href="tel:+521234567890" className="btn-warning btn-lg"><i
                                        className="fas fa-phone pe-1"></i> ¡Llámanos ahora para más información!</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className="our-services-title my-4">Oficinas Privadas y Espacios de Coworking</h2>
                <h3 className="our-services-text my-4">Tu espacio privado, tu éxito asegurado.</h3>

                <Carousel images={oficinasPrivadasImages} />

                <p className="about-text-body-small my-4">
                    Si prefieres trabajar en un ambiente exclusivo y seguro, nuestras oficinas coworking son perfectas para
                    ti. Ofrecemos una amplia gama de opciones, incluyendo espacios de trabajo personalizados que se adaptan
                    a las necesidades específicas de tu negocio. ¡En Rootworking, garantizamos tu éxito!
                </p>

                <h2 className="our-services-title my-4">Salas de Reuniones en Espacios de Coworking</h2>
                <h3 className="our-services-text my-4">Reuniones efectivas en un espacio inspirador.</h3>

                <Carousel images={salaJuntasImages} />

                <p className="about-text-body-small my-4">
                    Nuestras salas de reuniones están equipadas con la última tecnología y todo lo necesario para llevar a
                    cabo encuentros exitosos y presentaciones impactantes. Con capacidad para grupos de diferentes tamaños,
                    nuestras instalaciones ofrecen una solución completa para todas tus necesidades de reuniones de negocios
                    en espacios de coworking.
                </p>

                <h2 className="our-services-title my-4">Salas de Recepción en Espacios de Coworking </h2>
                <h3 className="our-services-text my-4">Visitas bien recibidas, éxito asegurado.</h3>

                <Carousel images={recepcionImages} />

                <p className="about-text-body-small my-4">
                    En Rootworking nos ocupamos de recibir a tus visitas y paquetes de manera amable y eficiente,
                    permitiéndote concentrarte en tu trabajo. Contamos con un personal experimentado y profesional que
                    garantiza que tus visitas siempre sean recibidas con una sonrisa y una atención personalizada en centros
                    coworking.
                </p>

                <h2 className="our-services-title my-4">Salas de Capacitación en Espacios de Coworking</h2>
                <h3 className="our-services-text my-4">Aprende y crece en Rootworking.</h3>

                <Carousel images={capacitacionImages} />

                <p className="about-text-body-small my-4">
                    En Rootworking, ofrecemos salas de capacitación para eventos y talleres que te brindarán una experiencia
                    de aprendizaje inolvidable. Amplía tus conocimientos y descubre nuevas oportunidades para alcanzar tus
                    metas profesionales en un ambiente diseñado especialmente para ello en coworking espacios.
                </p>

                <h2 className="our-services-title my-4">Áreas Comunes en Espacios de Coworking</h2>
                <h3 className="our-services-text my-4">Conéctate y colabora en nuestras áreas comunes.</h3>
                <h5 className="about-text-body-small">
                    En Rootworking, nuestras <b>áreas comunes</b> son el punto de encuentro perfecto para conectar y
                    colaborar con
                    otros miembros. Estos espacios están diseñados para fomentar la interacción y el intercambio de ideas
                    entre profesionales de diversos sectores. Disfruta de un ambiente inspirador donde podrás establecer
                    contactos, compartir conocimientos y encontrar nuevas oportunidades para impulsar tu crecimiento
                    profesional en <b>oficinas coworking</b>.
                </h5>
                <div className="row my-4">
                    <div className="col-md-6 order-1 order-md-2">
                        <img src={Servicios_1} alt="..." width="100%" height="500" />
                    </div>
                    <div className="col-md-6 d-flex flex-column justify-content-center align-items-center order-2 order-md-1">
                        <h2 className="title-section-end">Espacios de Descanso en Espacios de Coworking</h2>
                        <h3 className="sub-title-section-end">Descansa, relájate y socializa con otros miembros.</h3>
                        <p className="p-section-end">
                            Nuestros <b>espacios de descanso</b> están diseñados para que puedas relajarte y socializar con
                            otros miembros. Con áreas comunes, cómodas y acogedoras, podrás disfrutar de un merecido descanso en
                            un ambiente relajante y tranquilo en <b>coworking espacios</b>.
                        </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 d-flex flex-column justify-content-center align-items-center order-2 order-md-1">
                        <h2 className="title-section-end">Servicios de Cafetería en Espacios de Coworking</h2>
                        <h3 className="sub-title-section-end">Descansa, relájate y socializa con otros miembros.</h3>
                        <p className="p-section-end">
                            Nuestros <b>espacios de descanso</b> están diseñados para que puedas relajarte y socializar
                            con otros miembros. Con áreas comunes, cómodas y acogedoras, podrás disfrutar de un merecido descanso
                            en un ambiente relajante y tranquilo en <b>coworking espacios</b>.
                        </p>
                    </div>
                    <div className="col-md-6 order-1 order-md-2">
                        <img src={Servicios_2} alt="..." width="100%" height="500" />
                    </div>
                </div>

                <div className="row my-4">
                    <div className="col-md-6 order-1 order-md-2">
                        <img src={Servicios_3} alt="..." width="100%" height="500" />
                    </div>
                    <div className="col-md-6 d-flex flex-column justify-content-center align-items-center order-2 order-md-1">
                        <h2 className="title-section-end">Servicios de Limpieza en Espacios de Coworking</h2>
                        <h3 className="text-start sub-title-section-end">Trabaja en un ambiente limpio, ordenado y fresco.</h3>
                        <p className="p-section-end">
                            En Rootworking, nos preocupamos por mantener nuestros <b>espacios coworking</b> siempre limpios
                            y ordenados. Sabemos que un entorno limpio es fundamental para mantener la productividad, por lo
                            que puedes concentrarte en tu trabajo sin preocuparte por la limpieza en <b>centros coworking</b>.
                        </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 d-flex flex-column justify-content-center align-items-center order-2 order-md-1">
                        <h2 className="title-section-end">Servicio de Impresión en Espacios de Coworking</h2>
                        <h3 className="sub-title-section-end">Calidad de impresión excepcional, en blanco y negro.</h3>
                        <p className="p-section-end">
                            En Rootworking, ofrecemos servicios de <b>impresión</b> en blanco y negro de alta calidad para
                            todas tus necesidades. Ya sea impresión de documentos, presentaciones o folletos, nuestro equipo está
                            equipado con la última tecnología para garantizar una calidad de impresión excepcional en
                            <b>espacios de coworking</b>.
                        </p>
                    </div>
                    <div className="col-md-6 order-1 order-md-2">
                        <img src={Servicios_4} alt="..." width="100%" height="500" />
                    </div>
                </div>
                <h4 className="mb-4 text-center my-4">
                    <i className="bi bi-geo-alt display-4 d-block mb-2"></i>
                    ¡Aprovecha nuestro servicio de impresión de calidad!
                </h4>
                <p className="p-section-end text-center">
                    Calle Rio Tiber #103 Int. 201 y 202 Colonia Cuauhtemoc, Alcaldia Cuauhtemoc, CDMX, México, C.P. 06500
                </p>
                <div className="row">
                    <div className="col-md-6 mb-5 mt-3">
                        <button className="btn about-btn-body w-100">
                            ¡Llena el formulario para cotizar tu espacio!
                        </button>
                    </div>
                    <div className="col-md-6 mb-3 mt-3">
                        <button className="btn about-btn-body w-100">
                            <i className="fas fa-phone pe-1"></i>¡Llámanos ahora para más información!
                        </button>
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

export default NuestrosServicios;