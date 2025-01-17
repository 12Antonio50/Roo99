import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ENV } from "../API/Constants";

export default function useCrearInmueble() {
    const BASE_PATH = ENV.BASE_PATH;
    const routeESCR = ENV.API_ROUTES.qqxUzmvE80jhIp00JkUx3rb3m3pj1rs9dmedPUFfa9cGua6wEPilOpdzNifd0v;
    const routeESBU = ENV.API_ROUTES.TINCxXBMbkQ2eUvOWJXUeYjFjUWgmkZbULeLH9EzlQGWr6kbkVVOzJGCw22r0;
    const routeESAC = ENV.API_ROUTES.xcbrWVdS4eAYwuakX4m8rtZGTANuvRP0krmhbmKAXH6qeNqz3i1DALainxb6Ubo2viAZGe2DOT3zajWO7o9aV2jEnyTC;
    const routeESEL = ENV.API_ROUTES.erC4QljhfqCVUnJdWK7fPyF3gnXwkGlOlhQQXOVf0hYBLxX6gQP8mdGNzAExOxdHlstt4y0yKKAOyG9mcids15qiBQUj;
    const [valorFormulario, setValorFormulario] = useState({
        NombreOriginal: '',
        NombreCambio: '',
        Nombre: '',
        Direccion: '',
        MetrosCuadrados: '',
        Descripcion: ''
    });
    const [modalAbierto, setModalAbierto] = useState(false);
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mensajeAlerta, setMensajeAlerta] = useState('');
    const [opcionSeleccionada, setOpcionSeleccionada] = useState("");
    const [nombreInmuebleSeleccionado, setNombreInmuebleSeleccionado] = useState("");
    const [inmuebleSeleccionadoFormulario, setInmuebleSeleccionadoFormulario] = useState("");
    const [inmuebles, setInmuebles] = useState([]);
    const [oficinas, setOficinas] = useState([]);
    const [textoBoton, setTextoBoton] = useState("Selecciona una acción");
    const [colorBoton, setColorBoton] = useState("primary");
    const [isLoading, setIsLoading] = useState(false);
    const token = Cookies.get('token');

    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        setValorFormulario((valoresAnteriores) => ({
            ...valoresAnteriores,
            [name]: value,
        }));
    };

    const alternarModal = (estado) => {
        setModalAbierto(estado);
    }

    const limpiarFormulario = () => {
        setValorFormulario({
            Nombre: '',
            Direccion: '',
            MetrosCuadrados: '',
            Descripcion: ''
        });
    };

    const getColor = (variant) => {
        switch (variant) {
            case 'success':
                return 'green';
            case 'warning':
                return '#d1bf00';
            case 'danger':
                return 'red';
            default:
                return '#007bff';
        }
    };

    const estiloButton = {
        width: '100%',
        color: "#fff",
        border: "none",
        backgroundColor: getColor(colorBoton)
    };

    const enviarFormulario = () => {
        setIsLoading(true);
        const { Nombre, Direccion, MetrosCuadrados, Descripcion } = valorFormulario;
        if (!Nombre || !Direccion || !MetrosCuadrados || !Descripcion) {
            setMensajeAlerta('Por favor, complete todos los campos antes de guardar');
            setMostrarAlerta(true);
            setTimeout(() => {
                setMostrarAlerta(false);
            }, 3000);
            return;
        }

        const metroCuadradoString = MetrosCuadrados.toString();
        const token = Cookies.get('token');

        const nuevosDatos = {
            nombre: Nombre,
            direccion: Direccion,
            metrosCuadrados: metroCuadradoString,
            descripcion: Descripcion,
        };

        const url = `${BASE_PATH}${routeESCR}`;

        axios.post(url, nuevosDatos, {
            headers: {
                Authorization: `${token}`,
            },
        })
            .then(() => {
                return obtenerInmuebles();
            })
            .then(() => {
                limpiarFormulario();
                setIsLoading(false);
            })
            .catch((error) => {
                //console.error('Error al enviar los datos');
                setIsLoading(false);
            });
    };

    const obtenerInmuebles = useCallback(() => {
        setIsLoading(true);
        const url = `${BASE_PATH}${routeESBU}`;
        axios.get(url)
            .then((respuesta) => {
                setInmuebles(respuesta.data);
                setIsLoading(false);
            })
            .catch((error) => {
                //console.error('Error al obtener los datos');
                setIsLoading(false);
            })
    }, [BASE_PATH, routeESBU]);

    useEffect(() => {
        obtenerInmuebles();
    }, [obtenerInmuebles]);

    const editarInmueble = () => {
        setIsLoading(true);
        const url = `${BASE_PATH}${routeESAC}`;

        const nombreEditado = valorFormulario.NombreCambio || valorFormulario.NombreOriginal;

        const datosEditados = {
            nombreOriginal: valorFormulario.NombreOriginal,
            nombreCambio: nombreEditado,
            direccion: valorFormulario.Direccion,
            metrosCuadrados: valorFormulario.MetrosCuadrados,
            descripcion: valorFormulario.Descripcion,
        };

        axios.patch(url, datosEditados, {
            headers: {
                Authorization: `${token}`,
            },
        })
            .then(response => {
                return obtenerInmuebles().then(() => response);
            })
            .then(response => {
                setIsLoading(false);
                setValorFormulario(prevValorFormulario => ({
                    ...prevValorFormulario,
                    NombreOriginal: response.data.nombre,
                    Direccion: response.data.direccion,
                    MetrosCuadrados: response.data.metrosCuadrados,
                    Descripcion: response.data.descripcion,
                }));

                setMensajeAlerta('Inmueble editado correctamente');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 5000);
            })
            .catch(error => {
                //console.error('Error al editar el inmueble');
                setIsLoading(false);
                setMensajeAlerta('Error al editar el inmueble');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 5000);
            });
    };

    const eliminarInmueble = () => {
        setIsLoading(false);
        const url = `${BASE_PATH}${routeESEL}`;

        axios.delete(url, {
            headers: {
                Authorization: `${token}`,
            },
            data: {
                nombre: nombreInmuebleSeleccionado,
            },
        })
            .then(response => {
                if (response.status === 200) {
                    setIsLoading(false);
                    return obtenerInmuebles();
                } else {
                    setIsLoading(false);
                    throw new Error('Error al eliminar el inmueble');
                }
            })
            .then(() => {
                setIsLoading(false);
                setMensajeAlerta('Inmueble eliminado correctamente');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 5000);
            })
            .catch(error => {
                setIsLoading(false);
                //console.error('Error al eliminar el inmueble');
                setMensajeAlerta('Error al eliminar el inmueble');
                setMostrarAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 5000);
            });
    };

    return {
        oficinas,
        inmuebles,
        isLoading,
        textoBoton,
        colorBoton,
        estiloButton,
        modalAbierto,
        mostrarAlerta,
        mensajeAlerta,
        valorFormulario,
        opcionSeleccionada,
        nombreInmuebleSeleccionado,
        inmuebleSeleccionadoFormulario,
        setTextoBoton,
        setOficinas,
        setValorFormulario,
        setInmuebleSeleccionadoFormulario,
        limpiarFormulario,
        setOpcionSeleccionada,
        setColorBoton,
        alternarModal,
        editarInmueble,
        obtenerInmuebles,
        eliminarInmueble,
        enviarFormulario,
        manejarCambioInput,
        setNombreInmuebleSeleccionado
    }
}
