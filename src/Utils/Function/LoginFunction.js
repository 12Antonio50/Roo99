import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { ENV } from "../API/Constants";

export default function useLogin({ setUsuarioRol, setAutentificado }) {
    const BASE_PATH = ENV.BASE_PATH;
    const routeAULO = ENV.API_ROUTES.ZMf1M99pEHw5JyUfo7AlVD6Yha74sTqpWnHahLPyWqRutnCXvqUMTlozUXeSMh1;
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [alerta, setAlerta] = useState(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const navigate = useNavigate();

    const iniciarSesion = (event) => {
        event.preventDefault();
        if (!correo || !password) {
            mostrarAlerta("Por favor, ingresa el correo electrónico y contraseña", "danger");
            return;
        }

        const datosDeUsuario = {
            correo: correo,
            password: password,
            modelo: "usuariosRoot"
        };
        const url = `${BASE_PATH}${routeAULO}`;

        axios
            .post(url, datosDeUsuario, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                const datos = response.data;

                if (datos.access) {
                    const tiempoExpiracion = 0.5;
                    Cookies.set("token", datos.access, { expires: tiempoExpiracion });

                    if (datos.existenciaUsuario && datos.existenciaUsuario.correo) {
                        Cookies.set("correo", datos.existenciaUsuario.correo, { expires: tiempoExpiracion });

                        if (datos.existenciaUsuario.area) {
                            Cookies.set("area", datos.existenciaUsuario.area, { expires: tiempoExpiracion });
                        }
                        if (datos.existenciaUsuario.nombre) {
                            Cookies.set("nombre", datos.existenciaUsuario.nombre, { expires: tiempoExpiracion });
                        }
                        if (datos.existenciaUsuario.apellido_paterno) {
                            Cookies.set("apellido_paterno", datos.existenciaUsuario.apellido_paterno, { expires: tiempoExpiracion });
                        }
                    }

                    const rol = datos.existenciaUsuario.rol;

                    Cookies.set("rol", rol, { expires: tiempoExpiracion });

                    setUsuarioRol(rol);
                    setAutentificado(true);

                    if (rol === "A") {
                        navigate(`/home`);
                    } else if (rol === "AP") {
                        navigate(`/home`);
                    } else if (rol === "R") {
                        navigate(`/inicio`);
                    }
                } else {
                    mostrarAlerta(datos.msg, "danger");
                }
            })
            .catch((error) => {
                //console.error("");
                mostrarAlerta("Correo o contraseña incorrecta", "danger");
            });
    };

    const mostrarAlerta = (mensaje, tipo) => {
        setAlerta({ mensaje, tipo });
        setTimeout(() => {
            setAlerta(null);
        }, 3000);
    };

    const handleLinkClick = () => {
        setIsFlipped(true);
        setTimeout(() => {
            window.location.href = "/ad/root-working/restablecer";
        }, 500);
    };

    return {
        alerta,
        correo,
        password,
        isFlipped,
        setCorreo,
        setPassword,
        iniciarSesion,
        handleLinkClick,
    }
}