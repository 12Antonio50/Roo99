import React from "react";
import { Link } from "react-router-dom";
import "../../styles/style.principal.css";
import login from "../../assets/images/login.jpg";
import Image from 'react-bootstrap/Image';
import { Alert } from "react-bootstrap";
import useLogin from "../../Utils/Function/LoginFunction";

export default function Login({ setUsuarioRol, setAutentificado }) {
    const {
        isFlipped,
        correo,
        setCorreo,
        password,
        setPassword,
        handleLinkClick,
        iniciarSesion,
        alerta
    } = useLogin({ setUsuarioRol, setAutentificado });

    return (
        <div className={`container-login container-fluid ${isFlipped ? "fade-out" : ""}`}>
            <div className="small-body-login row justify-content-center align-items-center vh-100">
                <div className="col-lg-8">
                    <div className="card border-0 p-0 h-100">
                        <div className="card-custom card-body row no-gutters align-items-center">
                            <div className="col-md-6">
                                <Image src={login} alt="login" className="card-custom-img img-fluid d-none h-100 d-md-block" thumbnail />
                            </div>
                            <div className="col-md-6">
                                <h2 className="title-login display-4 text-center mb-5">Inicio de Sesión</h2>
                                <form>
                                    <div className="mb-3">
                                        <label className="form-label fs-5">Correo electrónico</label>
                                        <input
                                            type="email"
                                            className="input-transparent form-control fs-5"
                                            value={correo}
                                            onChange={(e) => setCorreo(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fs-5">Contraseña</label>
                                        <input
                                            type="password"
                                            className="input-transparent form-control fs-5"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="d-flex justify-content-end mb-3">
                                        <Link
                                            className="d-flex justify-content-end"
                                            style={{ textDecoration: 'none', color: '#FFFFFF' }}
                                            onClick={handleLinkClick}
                                        >
                                            ¿Se te olvidó la contraseña?
                                        </Link>
                                    </div>
                                    <div className="d-flex justify-content-center text-decoration-none">
                                        <button
                                            type="button"
                                            className="btn btn-lg btn-block fs-5"
                                            onClick={iniciarSesion}>Entrar</button>
                                    </div>
                                </form>
                                <div className="my-3">
                                    {alerta && <Alert variant={alerta.tipo}>{alerta.mensaje}</Alert>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
