import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ENV } from "../API/Constants";

export default function useEditarUsuario() {
    const BASE_PATH = ENV.BASE_PATH;
    const routeUSOBUN = ENV.API_ROUTES.HMaYWl4mzfrh4gPv7iuQpWYATRn6q5ZM9kgnBZsXarKHIiHRh3uvu2QprzyDY9E2FYbIBrKRF5gnx2qrgTytqFBe2V2;
    const routeUSAC = ENV.API_ROUTES.EeyUq9CtfW4WWU58KTJOxlnEphFHw3DT694MFPEygV6XyTHRMKyehRTEo7M57LzReozCJOX2uasfnRo7ZCp9Co12qJSfKR;
    const [usuario, setUsuario] = useState(null);
    const [formularioUsuario, setFormularioUsuario] = useState({
        CorreoOriginal: "",
        CorreoCambio: "",
        Nombre: "",
        Apellido_paterno: "",
        Apellido_materno: "",
        Area: "",
        Rol: "",
        Password: "",
        ConfirmarPasword: ""
    });
    const token = Cookies.get('token');
    const correo = Cookies.get('correo');
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mensajeAlerta, setMensajeAlerta] = useState('');
    const [modalAbierto, setModalAbierto] = useState(false);
    const [password, setPassword] = useState('');

    const alternarModal = (estado) => {
        setModalAbierto(estado);
    };

    const bucarUsuario = useCallback(() => {
        const url = `${BASE_PATH}${routeUSOBUN}`;
        const dato = { correo: correo };

        return axios.post(url, dato, {
            headers: {
                Authorization: `${token}`,
            },
        })
            .then((respuesta) => {

                const roles = {
                    A: "Administrador",
                    AP: "Administrador de apoyo",
                    R: "Recepcionista"
                };

                const areas = {
                    A: 'Administración',
                    C: 'Contaduría',
                    R: 'Recepción'
                }; 
                respuesta.data.area = areas[respuesta.data.area];
                respuesta.data.rol = roles[respuesta.data.rol];
                setUsuario(respuesta.data);
                return respuesta;
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    }, [correo, token, BASE_PATH, routeUSOBUN]);

    useEffect(() => {
        bucarUsuario();
    }, [token, bucarUsuario, BASE_PATH, routeUSOBUN]);

    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        setFormularioUsuario((valoresAnteriores) => ({
            ...valoresAnteriores,
            [name]: value,
        }));
    };

    const cambioEstadoCambio = (event) => {
        setPassword(event.target.value);
    }

    const manejarPreventDefault = (event) => {
        event.preventDefault();
    };

    const manejoMultiplesCambios = (event) => {
        manejarCambioInput(event);
        cambioEstadoCambio(event);
    }

    const editarUsuario = async () => {
        const validarContraseña = (password) => {
            if (password === "") {
                return true;
            }

            if (password.length < 10 || password.length > 20) {
                setMensajeAlerta("La contraseña debe tener entre 10 y 20 caracteres.");
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 5000);
                return false;
            }

            const tieneLetras = /[a-zA-Z]/.test(password);
            const tieneNumeros = /\d/.test(password);

            const contieneEspaciosEmojis = /[\s\uD800-\uDBFF\uDC00-\uDFFF]/.test(password);

            if (!tieneLetras || !tieneNumeros || contieneEspaciosEmojis) {
                setMensajeAlerta("La contraseña debe contener letras y números, y no debe contener espacios ni emojis.");
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 5000);
                return false;
            }
            return true;
        };

        if (formularioUsuario.Password !== formularioUsuario.ConfirmarPasword) {
            setMensajeAlerta("La contraseña y la confirmación de la contraseña no coinciden.");
            setMostrarAlerta(true);
            setTimeout(() => {
                setMostrarAlerta(false);
            }, 5000);
            return;
        }

        const tieneCampoLleno = Object.values(formularioUsuario).some(
            (valor) => valor !== '' && valor !== null && valor !== undefined
        );

        if (!tieneCampoLleno) {
            setMensajeAlerta("Por favor, complete al menos un campo antes de proceder.");
            setMostrarAlerta(true);
            setTimeout(() => {
                setMostrarAlerta(false);
            }, 5000);
            return;
        }

        if (!validarContraseña(formularioUsuario.ConfirmarPasword)) {
            setMensajeAlerta("La contraseña no cumple con los requisitos establecidos.");
            setMostrarAlerta(true);
            setTimeout(() => {
                setMostrarAlerta(false);
            }, 5000);
            return;
        }

        const datosEditados = {
            nombre: formularioUsuario.Nombre,
            apellido_paterno: formularioUsuario.Apellido_paterno,
            apellido_materno: formularioUsuario.Apellido_materno,
            correoOriginal: correo,
            correoCambio: formularioUsuario.CorreoCambio,
            area: formularioUsuario.Area,
            rol: formularioUsuario.Rol,
            password: formularioUsuario.ConfirmarPasword,
        };

        const datosEditadosFiltrados = Object.fromEntries(
            Object.entries(datosEditados).filter(([key, value]) => value !== '' && value !== null && value !== undefined)
        );
        const url = `${BASE_PATH}${routeUSAC}`;
        axios.patch(url, datosEditadosFiltrados, {
            headers: {
                Authorization: `${token}`,
            },
        })
            .then((respuesta) => {
                return bucarUsuario().then(() => {
                    if (respuesta.status === 200) {
                        setMensajeAlerta("Actualización correcta");
                    } else {
                        setMensajeAlerta("Error en la actualización");
                    }
                    setMostrarAlerta(true);
                    setTimeout(() => {
                        setMostrarAlerta(false);
                    }, 3000);
                });
            })
            .catch((error) => {
                setMensajeAlerta("Error en la actualización");
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 5000);
            });
    };

    return {
        usuario,
        password,
        modalAbierto,
        mostrarAlerta,
        mensajeAlerta,
        formularioUsuario,
        bucarUsuario,
        editarUsuario,
        alternarModal,
        cambioEstadoCambio,
        manejarCambioInput,
        manejarPreventDefault,
        manejoMultiplesCambios
    };
}
