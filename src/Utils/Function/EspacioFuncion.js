import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import useCrearInmueble from "./InmuebleFuncion";
import { ENV } from "../API/Constants";

export default function useCrearEspacio() {
    const {
        nombreInmuebleSeleccionado,
    } = useCrearInmueble();
    const BASE_PATH = ENV.BASE_PATH;
    const routeOBOF = ENV.API_ROUTES.nCuWL3omVwlNkBPbxCOO9fiuWirLaLhM6t7AVbiEFy8XASd5H9qZgUlXel3DCR4DNFtdTcIxiocR0bWv3UHd3GCgvP7El5;
    const routeOBOFDE = ENV.API_ROUTES.VdLunVWaEaoUegm6qN9Gk4xWJboUJAM6EnDgOl7XUKpz8neJCxDxX8vnR5lzj5Beoqr8OdYOc6m1EkAblN2FqzwKZQsAS5;
    const routeOBOFHA = ENV.API_ROUTES.k0smyjJV0ybzcLFMNMBfdZbF5K8BFyHPo3ORWvfn0GydqfrZKHArB6HT6IEjM8vTHfUcGDiTe2iJRdWwIQ5l2vJAXiAGPu;
    const routeOBES = ENV.API_ROUTES.TINCxXBMbkQ2eUvOWJXUeYjFjUWgmkZbULeLH9EzlQGWr6kbkVVOzJGCw22r0;
    const routeCROF = ENV.API_ROUTES.HJypkO5WH2sim9EBeCrSod9v5EVsFsXkNcAXMnvVWkDhxKOBlYAZGsvhhnqDX;
    const routeESAGOF = ENV.API_ROUTES.Dm8y2sIxHfmaiWnQjhfsjFvJf9cA3vpB3Y1zQzNnabHm1S1htbUBQSvYx1bxzr6cLAA8Jo7pipcriJzrFrraHJb99EOZ0Frn;
    const routeOFAC = ENV.API_ROUTES.vRaK8BPs6QJDz6AyXmjKtq75tkfXRO39DembCnK8ACy6T1aLyiZdFbBygQxPvvF5iiPIqzlxogXOflwAgc843Yl1jTTW;
    const routeESOFEL = ENV.API_ROUTES.o4SaQNSaodSOAzifNtfnxmUzvxLF9gSesHhY03lMk0uOZ80xqnL6Z5MWGPrNYQ315hyvldlosjIyLceoWQrFL6j5GM4d4;
    const routeESOFDE = ENV.API_ROUTES.XmwEotUVjdMwhq6nb9u5HCUyna4Nau4rGWJqUp6B1vj67UbMTvb2nisx67AkESItvWVEiZXupE0yQFdSWCN79tXpxpXAu;
    const routeOFHA = ENV.API_ROUTES.LYvhw9BfF9q31xl8IYXgZQLwl5y7CtATzKPSLtyUqr604x62mqvDxLjbpnhTiWQR0SWBMKb1ap1MZRapebgsAd8o7UiZBgu;
    const [valorFormularioOficina, setValorFormularioOficina] = useState({
        Nombre: '',
        CostoBasico: '',
        CostoIntermedio: '',
        CostoPremium: '',
        MetrosCuadrados: '',
        Descripcion: '',
        Caracteristicas: [],
        Servicios: [],
        Ubicacion: '',
        NumeroMaximoIntegrantes: '',
        TipoEspacio: '',
        imagenes: []
    });
    const [nombreInmuebleSeleccionadoOficina, setNombreInmuebleSeleccionadoOficina] = useState("");
    const [modalAbiertoOficina, setModalAbiertoOficina] = useState(false);
    const token = Cookies.get('token');
    const [inmuebles, setInmuebles] = useState([]);
    const [oficina, setOficinas] = useState([]);
    const [oficinaDeshabilitar, setOficinaDeshabilitar] = useState([]);
    const [oficinaabilitar, setOficinahabilitar] = useState([]);
    const [mostrarAlertaOficina, setMostrarAlertaOficina] = useState(false);
    const [mensajeAlertaOficina, setMensajeAlertaOficina] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const alternarModalOficina = (estado) => {
        setModalAbiertoOficina(estado);
    }

    const limpiarFormularioEspacio = () => {
        setValorFormularioOficina({
            NombreOriginal: '',
            NombreCambio: '',
            Nombre: '',
            CostoBasico: '',
            CostoIntermedio: '',
            CostoPremium: '',
            MetrosCuadrados: '',
            Descripcion: '',
            Caracteristicas: '',
            Servicios: '',
            Ubicacion: '',
            TipoEspacio: '',
            NumeroMaximoIntegrantes: '',
        });
    };

    const manejarSeleccionInmuebleOficina = (e) => {
        const nombreInmuebleSeleccionado = e.target.value;

        if (nombreInmuebleSeleccionado === nombreInmuebleSeleccionadoOficina) {
            limpiarFormularioEspacio();
            setNombreInmuebleSeleccionadoOficina("");
        } else {
            setNombreInmuebleSeleccionadoOficina(nombreInmuebleSeleccionado);
        }

        const oficinaSeleccionada = oficina.find((oficina) => {
            return oficina.nombre === nombreInmuebleSeleccionado;
        });

        if (oficinaSeleccionada) {
            setValorFormularioOficina({
                ...valorFormularioOficina,
                NombreOriginal: oficinaSeleccionada.nombre,
                NombreCambio: '',
                Nombre: oficinaSeleccionada.nombre,
                CostoBasico: oficinaSeleccionada.costoBasico,
                CostoIntermedio: oficinaSeleccionada.costoIntermedio,
                CostoPremium: oficinaSeleccionada.costoPremium,
                MetrosCuadrados: oficinaSeleccionada.metrosCuadrados,
                Descripcion: oficinaSeleccionada.descripcion,
                Caracteristicas: oficinaSeleccionada.caracteristicas,
                Servicios: oficinaSeleccionada.servicios,
                Ubicacion: oficinaSeleccionada.ubicacion,
                TipoEspacio: oficinaSeleccionada.tipoEspacio,
                NumeroMaximoIntegrantes: oficinaSeleccionada.numeroMaximoIntegrantes
            });
        } else {
            // limpiarFormularioEspacio();
        }
    };

    const obtenerOficinas = useCallback(() => {
        setIsLoading(true);
        const url = `${BASE_PATH}${routeOBOF}`;
        return axios.get(url)
            .then((respuesta) => {
                setOficinas(respuesta.data);
                setIsLoading(false);
            })
            .catch((error) => {
                //console.error('Error al obtener los datos');
                setMensajeAlertaOficina('Hubo un error al obtener los datos.');
                setMostrarAlertaOficina(true);
                setTimeout(() => setMostrarAlertaOficina(false), 5000);
                setIsLoading(false);
            });
    }, [BASE_PATH, routeOBOF]);

    const obtenerOficinasDeshabilitadas = useCallback(() => {
        setIsLoading(true);
        const url = `${BASE_PATH}${routeOBOFDE}`;
        axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        })
            .then((respuesta) => {
                setOficinaDeshabilitar(respuesta.data);
                setIsLoading(false);
            })
            .catch((error) => {
                //console.error('Error al obtener los datos');
                setMensajeAlertaOficina('Hubo un error al obtener los datos.');
                setMostrarAlertaOficina(true);
                setTimeout(() => setMostrarAlertaOficina(false), 5000);
                setIsLoading(false);
            });
    }, [token, BASE_PATH, routeOBOFDE]);

    const obtenerOficinashabilitadas = useCallback(() => {
        setIsLoading(true);
        const url = `${BASE_PATH}${routeOBOFHA}`;
        axios.get(url)
            .then((respuesta) => {
                setOficinahabilitar(respuesta.data);
                setIsLoading(false);
            })
            .catch((error) => {
                //console.error('Error al obtener los datos');
                setMensajeAlertaOficina('Hubo un error al obtener los datos.');
                setMostrarAlertaOficina(true);
                setTimeout(() => setMostrarAlertaOficina(false), 5000);
                setIsLoading(false);
            });
    }, [BASE_PATH, routeOBOFHA]);

    useEffect(() => {
        obtenerOficinashabilitadas();
    }, [obtenerOficinashabilitadas]);

    useEffect(() => {
        if (token) {
            obtenerOficinasDeshabilitadas();
        }
    }, [obtenerOficinasDeshabilitadas, token]);

    useEffect(() => {
        obtenerOficinas();
    }, [obtenerOficinas]);

    const manejarCambioInputOficina = (e) => {
        const { name, value } = e.target;

        if (name === 'Caracteristicas' || name === 'Servicios') {
            const elementos = value.split('\n').map(item => item.trim());
            setValorFormularioOficina(prevState => ({
                ...prevState,
                [name]: elementos,
            }));
        } else {
            setValorFormularioOficina(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const manejarCambioImagen = (e, opcionSeleccionada) => {
        const files = Array.from(e.target.files);
        if (opcionSeleccionada === "1") {
            setValorFormularioOficina((prevState) => ({
                ...prevState,
                imagenes: Array.isArray(prevState.imagenes)
                    ? [...prevState.imagenes, ...files]
                    : [...files]
            }));
        } else if (opcionSeleccionada === "2") {
            setOficinas((prevState) => {
                const updatedOficinas = prevState.map((o) => {
                    if (o.nombre === nombreInmuebleSeleccionadoOficina) {
                        return {
                            ...o,
                            imagenes: [...o.imagenes, ...files]
                        };
                    }
                    return o;
                });
                return updatedOficinas;
            });
        }
    };

    const eliminarImagen = (index) => {
        setValorFormularioOficina((prevState) => ({
            ...prevState,
            imagenes: prevState.imagenes.filter((_, i) => i !== index)
        }));
    };

    const eliminarImagenExistente = (index) => {
        setOficinas((prevState) => {
            const updatedOficina = prevState.map((o) => {
                if (o.nombre === nombreInmuebleSeleccionadoOficina) {
                    return {
                        ...o,
                        imagenes: o.imagenes.filter((_, i) => i !== index)
                    };
                }
                return o;
            });
            return updatedOficina;
        });
    };

    const obtenerInmuebles = useCallback(() => {
        setIsLoading(true);
        const url = `${BASE_PATH}${routeOBES}`;
        axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        })
            .then((respuesta) => {
                setInmuebles(respuesta.data);
                setIsLoading(false);
            })
            .catch((error) => {
                //console.error('Error al obtener los datos');
                setMensajeAlertaOficina('Hubo un error al obtener los datos.');
                setMostrarAlertaOficina(true);
                setTimeout(() => setMostrarAlertaOficina(false), 5000);
                setIsLoading(false);
            });
    }, [token, BASE_PATH, routeOBES]);

    const enviarFormularioOficina = () => {
        setIsLoading(true);
        const {
            Nombre,
            CostoBasico,
            CostoIntermedio,
            CostoPremium,
            MetrosCuadrados,
            Descripcion,
            Caracteristicas,
            Servicios,
            Ubicacion,
            NumeroMaximoIntegrantes,
            TipoEspacio,
            imagenes
        } = valorFormularioOficina;

        if (
            !Nombre || !CostoBasico || !CostoIntermedio || !CostoPremium ||
            !MetrosCuadrados || !Descripcion || !Caracteristicas ||
            !Servicios || !Ubicacion || !NumeroMaximoIntegrantes || !TipoEspacio
        ) {
            setMensajeAlertaOficina('Por favor, complete todos los campos antes de guardar');
            setMostrarAlertaOficina(true);
            setTimeout(() => setMostrarAlertaOficina(false), 3000);
            return;
        }

        const formData = new FormData();
        formData.append('nombre', Nombre);
        formData.append('costoBasico', CostoBasico);
        formData.append('costoIntermedio', CostoIntermedio);
        formData.append('costoPremium', CostoPremium);
        formData.append('metrosCuadrados', MetrosCuadrados.toString());
        formData.append('descripcion', Descripcion);
        formData.append('caracteristicas', JSON.stringify(Caracteristicas));
        formData.append('servicios', JSON.stringify(Servicios));
        formData.append('ubicacion', Ubicacion);
        formData.append('numeroMaximoIntegrantes', NumeroMaximoIntegrantes);
        formData.append('tipoEspacio', TipoEspacio);

        if (imagenes && imagenes.length > 0) {
            imagenes.forEach((img, index) => {
                formData.append('imagenes', img);
            });
        }

        const token = Cookies.get('token');
        const url = `${BASE_PATH}${routeCROF}`;

        axios.post(url, formData, {
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'multipart/form-data',
            }
        })
            .then((respuesta) => {
                if (respuesta.status === 200) {
                    setIsLoading(false);
                    const nombreOficina = Nombre;
                    agregarOficinaAEspacio(nombreInmuebleSeleccionadoOficina, nombreOficina);
                    setMensajeAlertaOficina('Oficina creada y adjuntada correctamente');
                    setMostrarAlertaOficina(true);
                    setTimeout(() => setMostrarAlertaOficina(false), 5000);
                    limpiarFormularioEspacio();
                    setNombreInmuebleSeleccionadoOficina("default");
                    setTimeout(() => window.location.reload(), 6000);
                }
            })
            .catch((error) => {
                setIsLoading(false);
                //console.error('Error al enviar los datos');
                setMensajeAlertaOficina('Hubo un error al enviar el formulario. Intente nuevamente.');
                setMostrarAlertaOficina(true);
                setTimeout(() => setMostrarAlertaOficina(false), 5000);
            });
    };

    const agregarOficinaAEspacio = (nombreInmuebleSeleccionadoOficina, nombreOficina) => {
        setIsLoading(true);
        const datosAgregarOficina = {
            nombre: nombreInmuebleSeleccionadoOficina,
            oficina: nombreOficina
        };

        const url = `${BASE_PATH}${routeESAGOF}`;

        axios.patch(url, datosAgregarOficina, {
            headers: {
                Authorization: `${token}`,
            },
        })
            .then((respuesta) => {
                if (respuesta.status === 200) {
                    setIsLoading(false);
                    obtenerOficinasDeshabilitadas();
                    obtenerOficinas();
                    obtenerOficinashabilitadas();
                    obtenerInmuebles();
                    setMensajeAlertaOficina('Oficina vinculada correctamente');
                    setMostrarAlertaOficina(true);
                    setTimeout(() => setMostrarAlertaOficina(false), 5000);
                }
            })
            .catch((error) => {
                setIsLoading(false);
                //console.error('Error al agregar la oficina al espacio');
                setMensajeAlertaOficina('Error al agregar la oficina al espacio');
                setMostrarAlertaOficina(true);
                setTimeout(() => setMostrarAlertaOficina(false), 5000);
            });
    };

    const editarOficina = () => {
        setIsLoading(true);
        const url = `${BASE_PATH}${routeOFAC}`;
        const {
            NombreOriginal,
            NombreCambio,
            CostoBasico,
            CostoIntermedio,
            CostoPremium,
            MetrosCuadrados,
            Descripcion,
            Caracteristicas,
            Servicios,
            Ubicacion,
            NumeroMaximoIntegrantes,
            TipoEspacio,
            imagenes
        } = valorFormularioOficina;

        if (
            !NombreOriginal ||
            !CostoBasico ||
            !CostoIntermedio ||
            !CostoPremium ||
            !MetrosCuadrados ||
            !Descripcion ||
            !Caracteristicas ||
            !Servicios ||
            !Ubicacion ||
            !TipoEspacio ||
            !NumeroMaximoIntegrantes
        ) {
            setMensajeAlertaOficina('Por favor, completa todos los campos obligatorios.');
            setMostrarAlertaOficina(true);
            setTimeout(() => {
                setMostrarAlertaOficina(false);
            }, 5000);
            return;
        }

        const formData = new FormData();
        formData.append('nombreOriginal', NombreOriginal);
        if (NombreCambio) formData.append('nombreCambio', NombreCambio);
        formData.append('costoBasico', CostoBasico);
        formData.append('costoIntermedio', CostoIntermedio);
        formData.append('costoPremium', CostoPremium);
        formData.append('metrosCuadrados', MetrosCuadrados);
        formData.append('descripcion', Descripcion);
        formData.append('caracteristicas', JSON.stringify(Caracteristicas));
        formData.append('servicios', JSON.stringify(Servicios));
        formData.append('ubicacion', Ubicacion);
        formData.append('tipoEspacio', TipoEspacio);
        formData.append('numeroMaximoIntegrantes', NumeroMaximoIntegrantes);

        if (imagenes && imagenes.length > 0) {
            imagenes.forEach((img) => {
                formData.append('imagenes', img);
            });
        }

        const token = Cookies.get('token');
        axios.patch(url, formData, {
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((respuesta) => {
                setValorFormularioOficina({
                    ...valorFormularioOficina,
                    NombreOriginal: respuesta.data.nombre,
                    CostoBasico: respuesta.data.costoBasico,
                    CostoIntermedio: respuesta.data.costoIntermedio,
                    CostoPremium: respuesta.data.costoPremium,
                    MetrosCuadrados: respuesta.data.metrosCuadrados,
                    Descripcion: respuesta.data.descripcion,
                    Caracteristicas: respuesta.data.caracteristicas,
                    Servicios: respuesta.data.servicios,
                    Ubicacion: respuesta.data.ubicacion,
                    NumeroMaximoIntegrantes: respuesta.data.numeroMaximoIntegrantes,
                    TipoEspacio: respuesta.data.tipoEspacio,
                    imagenes: respuesta.data.imagenes
                });
                setIsLoading(false);
                setMensajeAlertaOficina('Oficina editada correctamente');
                setMostrarAlertaOficina(true);
                setTimeout(() => {
                    setMostrarAlertaOficina(false);
                }, 5000);
                setTimeout(() => window.location.reload(), 6000);
            })
            .catch((error) => {
                setIsLoading(false);
                //console.error('Error al editar la oficina');
                /*if (error.respuesta) {
                    console.error('Respuesta de la API:', error.respuesta.data);
                } else if (error.request) {
                    console.error('Solicitud no recibió respuesta:', error.request);
                } else {
                    console.error('Error en la configuración de la solicitud:', error.message);
                }*/
                setMensajeAlertaOficina('Error al editar la oficina');
                setMostrarAlertaOficina(true);
                setTimeout(() => {
                    setMostrarAlertaOficina(false);
                }, 5000);
            });
    };

    const eliminarOficina = () => {
        setIsLoading(true);
        const url = `${BASE_PATH}${routeESOFEL}`;
        const token = Cookies.get('token');

        axios.delete(url, {
            headers: {
                Authorization: `${token}`,
            },
            data: {
                nombre: nombreInmuebleSeleccionadoOficina,
                espacio: nombreInmuebleSeleccionado,
            }
        })
            .then((respuesta) => {
                if (respuesta.status === 200) {
                    setIsLoading(false);
                    setMensajeAlertaOficina('Espacio eliminado correctamente');
                    setMostrarAlertaOficina(true);
                    setTimeout(() => {
                        setMostrarAlertaOficina(false);
                    }, 5000);
                    setTimeout(() => window.location.reload(), 6000);
                } else {
                    setIsLoading(false);
                    setMensajeAlertaOficina('Error al eliminar el espacio');
                    setMostrarAlertaOficina(true);
                    setTimeout(() => {
                        setMostrarAlertaOficina(false);
                    }, 5000);
                }
            })
            .catch((error) => {
                setIsLoading(false);
                //console.error('Error al eliminar el inmueble:');
                setMensajeAlertaOficina('Error al eliminar el espacio');
                setMostrarAlertaOficina(true);
                setTimeout(() => {
                    setMostrarAlertaOficina(false);
                }, 5000);
            });
    };

    const deshabilitarEspacio = () => {
        setIsLoading(true);
        const url = `${BASE_PATH}${routeESOFDE}`;
        const dato = {
            nombre: nombreInmuebleSeleccionadoOficina,
        };

        axios.patch(url, dato, {
            headers: {
                Authorization: `${token}`,
            },
        })
            .then((respuesta) => {
                if (respuesta.status === 200) {
                    setIsLoading(false);
                    setMensajeAlertaOficina("Espacio deshabilitado correctamente");
                    setMostrarAlertaOficina(true);
                    setTimeout(() => {
                        setMostrarAlertaOficina(false);
                    }, 5000);
                    obtenerOficinasDeshabilitadas();
                    obtenerOficinas();
                    obtenerOficinashabilitadas();
                } else {
                    setIsLoading(false);
                    throw new Error('Error al deshabilitar el espacio');
                }
            })
            .catch((error) => {
                setIsLoading(false);
                setMensajeAlertaOficina('Error al deshabilitar el espacio');
                setMostrarAlertaOficina(true);
                //console.error("Error al deshabilitar el espacio");
                setTimeout(() => {
                    setMostrarAlertaOficina(false);
                }, 5000);
            });
    };

    const habilitarEspacio = () => {
        setIsLoading(true);
        const url = `${BASE_PATH}${routeOFHA}`;
        const dato = {
            nombre: nombreInmuebleSeleccionadoOficina,
        };

        axios.patch(url, dato, {
            headers: {
                Authorization: `${token}`
            }
        })
            .then((respuesta) => {
                if (respuesta.status === 200) {
                    setIsLoading(false);
                    setMensajeAlertaOficina("Espacio habilitado correctamente");
                    setMostrarAlertaOficina(true);
                    setTimeout(() => {
                        setMostrarAlertaOficina(false);
                    }, 5000);
                    obtenerOficinasDeshabilitadas();
                    obtenerOficinas();
                    obtenerOficinashabilitadas();
                } else {
                    setIsLoading(false);
                    throw new Error('Error al habilitar el espacio');
                }
            })
            .catch((error) => {
                setIsLoading(false);
                setMensajeAlertaOficina('Error al habilitar el espacio');
                setMostrarAlertaOficina(true);
                //console.error('Error al habilitar el espacio');
                setTimeout(() => {
                    setMostrarAlertaOficina(false);
                }, 5000);
            });
    };

    return {
        oficina,
        oficinaabilitar,
        inmuebles,
        isLoading,
        oficinaDeshabilitar,
        modalAbiertoOficina,
        mensajeAlertaOficina,
        mostrarAlertaOficina,
        valorFormularioOficina,
        limpiarFormularioEspacio,
        nombreInmuebleSeleccionadoOficina,
        editarOficina,
        eliminarImagen,
        eliminarOficina,
        obtenerInmuebles,
        habilitarEspacio,
        deshabilitarEspacio,
        manejarCambioImagen,
        alternarModalOficina,
        enviarFormularioOficina,
        eliminarImagenExistente,
        manejarCambioInputOficina,
        manejarSeleccionInmuebleOficina,
        setNombreInmuebleSeleccionadoOficina
    }
}