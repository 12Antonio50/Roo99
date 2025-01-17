import React from "react";
import "../../styles/style.principal.css";
import { Link } from "react-router-dom";
import restore from "../../assets/images/restore.jpg";
import Image from 'react-bootstrap/Image';
import { Alert } from "react-bootstrap";
import RestablecerFunction from "../../Utils/Function/RestablecerFunction";

const Restablecer = () => {
    const {
        isFlipped,
        correo,
        handleLinkClick,
        restablecerPassword,
        alerta,
        setCorreo
    } = RestablecerFunction();
    
    return (
        <div className={`container-restore container-fluid ${isFlipped ? "fade-out" : ""}`}>
            <div className="small-body-restore row justify-content-center align-items-center vh-100">
                <div className="col-lg-8">
                    <div className="card border-0 p-0 h-100">
                        <div className="card-custom-restore card-body row no-gutters align-items-center">
                            <div className="col-md-6">
                                <h2 className="title-restore display-5 text-center mb-5">Restablecer contraseña</h2>
                                <form>
                                    <div className="mb-3">
                                        <label className="label-restore form-label fs-5">Correo electrónico</label>
                                        <input
                                            type="email"
                                            className="input-transparent form-control fs-5"
                                            value={correo}
                                            onChange={(e) => setCorreo(e.target.value)}
                                        />
                                    </div>
                                    <div className="d-flex mb-3">
                                        <Link
                                            className="d-block mb-3 d-flex"
                                            style={{ textDecoration: 'none', color: '#788A77' }}
                                            onClick={handleLinkClick}
                                        >
                                            Regresar al inicio</Link>
                                    </div>
                                    <div className="d-flex justify-content-center text-decoration-none">
                                        <button
                                            type="button"
                                            className="btn-restore btn-lg btn-block fs-5"
                                            onClick={restablecerPassword}
                                        >
                                            Enviar
                                        </button>
                                    </div>
                                </form>
                                {alerta && <Alert variant={alerta.tipo}>{alerta.mensaje}</Alert>}
                            </div>
                            <div className="col-md-6">
                                <Image src={restore} alt="login" className="card-custom-img img-fluid h-100 d-none d-md-block" thumbnail />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Restablecer;