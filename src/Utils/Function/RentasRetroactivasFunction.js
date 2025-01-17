import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ENV } from "../API/Constants";

export default function useRentasRetroactivas() {
    const BASE_PATH = ENV.BASE_PATH;
    const routeOFBUHA = ENV.API_ROUTES.k0smyjJV0ybzcLFMNMBfdZbF5K8BFyHPo3ORWvfn0GydqfrZKHArB6HT6IEjM8vTHfUcGDiTe2iJRdWwIQ5l2vJAXiAGPu;
    const routeCOOB = ENV.API_ROUTES.uXYiWYH7FEE0lqfc2ct8IZmTp5SPyyLWweZWcmycXii6Z7ZRdFTpnFaKfaejQQD;
    const routeCOOBUN = ENV.API_ROUTES.GZEh4N3n4OTDAz9ZWMtv6SIF6Sb46GpOTyZ4VgA4wXWmM4pT7ZAObPYRbJKuf2ne0OQcOpdR3neje2n7mllFzB7S9j0g;
    const routeCOAC = ENV.API_ROUTES.Bw21r8OXICUCWT9grWplBzASut6kpvdUG3KviPu3nAWZdZBiMiyf6YUUMwuHfOMQSvNAGEYG1rJI4tcFH3wSX0OW3NqUm5;
    const routeCOEL = ENV.API_ROUTES.V9lEjmqfsIXhx5ZmeXkUSiZ9jwvlRczXYT08rZoqW4Wxa24s0CmzMIOn0EbXzoR1;
    const token = Cookies.get('token');
    const [valorFormulario, setValorFormulario] = useState({
        estado: '',
        precio: '',
        numeroIntegrantes: '',
        paquete: '',
        nombreArrendatario: '',
        precioTotal: ''
    });
    const [oficina, setOficina] = useState([]);
    const [codigosTodos, setCodigosTodos] = useState([]);
    const [codigoSeleccionado, setCodigoSeleccionado] = useState(null);
    const [oficinaSeleccionada, setOficinaSeleccionada] = useState([]);
    const [paginaPagados, setPaginaPagados] = useState(1);
    const [paginaPendientes, setPaginaPendientes] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [unicoCodigo, setUnicoCodigo] = useState([]);
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mensajeAlerta, setMensajeAlerta] = useState('');
    const [mostrarAdvertencia, setMostrarAdvertencia] = useState(false);
    const [visibleToast, setVisibleToast] = useState('');
    const [buscarEspacio, setBuscarEspacio] = useState('');
    const [ingresosMesActual, setIngresosMesActual] = useState(0);
    const [ingresosMesPasado, setIngresosMesPasado] = useState(0);
    const [totalIngresosAnioPresente, setTotalIngresosAnioPresente] = useState(0);
    const [codigosGeneradosMesActual, setCodigosGeneradosMesActual] = useState(0);
    const [codigosGeneradosMesPasado, setCodigosGeneradosMesPasado] = useState(0);
    const [totalCodigosGeneradosAnioPresente, setTotalCodigosGeneradosAnioPresente] = useState(0);
    const [codigosGeneradosFalseMesActual, setCodigosGeneradosFalseMesActual] = useState(0);
    const [codigosGeneradosFalseMesPasado, setCodigosGeneradosFalseMesPasado] = useState(0);
    const [totalCodigosGeneradosFalseAnioPresente, setTotalCodigosGeneradosFalseAnioPresente] = useState(0);

    const elementosPorPagina = 5;

    const handlePaginaChange = (tipo, numeroPagina) => {
        if (tipo === 'pagados') {
            setPaginaPagados(numeroPagina);
        } else if (tipo === 'pendientes') {
            setPaginaPendientes(numeroPagina);
        }
    };

    const abrirModal = (codigo, nombreOficina) => {
        setCodigoSeleccionado(codigo);
        setModalVisible(true);
        setOficinaSeleccionada(nombreOficina);
    };

    const handleButtonClick = (variante, codigo) => {
        setCodigoSeleccionado(codigo);
        setVisibleToast(visibleToast === variante ? '' : variante);
    };

    const cerrarModal = () => {
        setCodigoSeleccionado(null);
        setModalVisible(false);
    };

    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        setValorFormulario((valoresAnteriores) => ({
            ...valoresAnteriores,
            [name]: value,
        }));

        if (name === "paquete" && value) {
            setMostrarAdvertencia(true);
        } else if (name === "paquete" && value === "") {
            setMostrarAdvertencia(false);
        }
    };

    const limpiarFormulario = () => {
        setValorFormulario({
            estado: '',
            precio: '',
            numeroIntegrantes: '',
            paquete: '',
            nombreArrendatario: '',
            precioTotal: ''
        });
    }

    const obtenerOficinas = useCallback(() => {
        const url = `${BASE_PATH}${routeOFBUHA}`;
        axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        })
            .then((respuesta) => {
                setOficina(respuesta.data);
            })
            .catch((error) => {
                //console.error('Error al obtener los datos');
            });
    }, [token, BASE_PATH, routeOFBUHA]);

    const obtenerCodigos = useCallback(() => {
        const url = `${BASE_PATH}${routeCOOB}`;
        axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        })
            .then((respuesta) => {
                setCodigosTodos(respuesta.data);
            })
            .catch((error) => {
                //console.error("Error al obtener los datos: ");
            });
    }, [token, BASE_PATH, routeCOOB]);


    const obtenerUnicoCodigo = useCallback(() => {
        if (codigoSeleccionado !== null) {
            const url = `${BASE_PATH}${routeCOOBUN}`;

            const body = {
                codigo: codigoSeleccionado,
            };

            axios.post(url, body, {
                headers: {
                    Authorization: `${token}`,
                },
            })
                .then(respuesta => {
                    setUnicoCodigo(respuesta.data);
                })
                .catch(error => {
                    //console.error("Error al obtener los datos: ");
                });
        }
    }, [codigoSeleccionado, token, BASE_PATH, routeCOOBUN]);

    const obtenerCodigosPorNombreOficina = (nombreOficina) => {
        return codigosTodos.filter(codigo => codigo.nombreOficina === nombreOficina);
    };

    useEffect(() => {
        if (token) {
            obtenerOficinas();
        }
    }, [obtenerOficinas, token]);

    useEffect(() => {
        if (token) {
            obtenerCodigos();
        }
    }, [obtenerCodigos, token]);

    useEffect(() => {
        if (codigoSeleccionado !== null) {
            obtenerUnicoCodigo();
        }
    }, [codigoSeleccionado, obtenerUnicoCodigo]);

    const actualizarDatos = () => {
        const url = `${BASE_PATH}${routeCOAC}`;

        const codigo = {
            codigo: codigoSeleccionado,
        };

        const datosEditados = Object.fromEntries(
            Object.entries(valorFormulario).filter(([key, value]) => value !== '' && value !== undefined)
        );

        const datosCombinados = {
            ...codigo,
            ...datosEditados
        };

        axios.patch(url, datosCombinados, {
            headers: {
                Authorization: `${token}`,
            },
        })
            .then((respuesta) => {
                if (respuesta.status === 200) {
                    setMensajeAlerta("Código actualizado correctamente");
                    setMostrarAlerta(true);
                    setTimeout(() => {
                        setMostrarAlerta(false);
                    }, 5000);
                    return Promise.all([
                        obtenerUnicoCodigo(),
                        obtenerCodigos(),
                        obtenerOficinas()
                    ]);
                } else {
                    throw new Error('Error al actualizar el código');
                }
            })
            .catch((error) => {
                setMensajeAlerta('Error al editar el código');
                setMostrarAlerta(true);
                //console.error("Error al editar el código");
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 5000);
            });
    };

    const eliminarCodigo = () => {
        const url = `${BASE_PATH}${routeCOEL}`;
        axios.delete(url, {
            headers: {
                Authorization: `${token}`,
            },
            data: {
                codigo: codigoSeleccionado,
                oficina: oficinaSeleccionada,
            }
        })
            .then(respuesta => {
                if (respuesta.status === 200) {
                    setMensajeAlerta("Código eliminado correctamente");
                    setMostrarAlerta(true);
                    setTimeout(() => {
                        setMostrarAlerta(false);
                    }, 5000);
                    return Promise.all([
                        obtenerCodigos(),
                        obtenerOficinas()
                    ]);
                } else {
                    throw new Error('Error al eliminar el código');
                }
            })
            .catch(error => {
                setMensajeAlerta('Error al eliminar el código');
                setMostrarAlerta(true);
                //console.error("Error al eliminar el código");
                setTimeout(() => {
                    setMostrarAlerta(false);
                }, 5000);
            });
    }

    const estiloBoton = {
        background: 'none',
        color: 'black',
        border: 'none',
        textDecoration: 'none'
    };

    const filtrarCodigosPorEstado = (codigos, estado) => {
        return codigos.filter(codigoNombre => {
            const codigoEncontrado = codigosTodos.find(codigo => codigo.codigo === codigoNombre);
            return codigoEncontrado && (codigoEncontrado.estado === estado) && (codigoEncontrado.codigo.toLowerCase().includes(buscarEspacio.toLowerCase()));
        });
    };

    const oficinasFiltradas = oficina.filter((oficinaItem) => {
        return oficinaItem.nombre.toLowerCase().includes(buscarEspacio.toLowerCase());
    });

    const calcularIndicesPaginacion = (codigos, pagina) => {
        const inicio = (pagina - 1) * elementosPorPagina;
        const fin = inicio + elementosPorPagina;
        return codigos.slice(inicio, fin);
    };

    const formatearFechas = (diasRenta) => {
        if (Array.isArray(diasRenta)) {
            return diasRenta.map(dia => {
                if (dia instanceof Date) {
                    return dia.toISOString().split('T')[0];
                }
                return dia.split('T')[0];
            }).join("\n");
        } else if (typeof diasRenta === 'string') {
            const fechas = diasRenta.match(/\d{4}-\d{2}-\d{2}/g);
            return fechas ? fechas.join("\n") : "";
        } else {
            return "";
        }
    }

    useEffect(() => {
        if (codigosTodos && codigosTodos.length > 0) {
            const ahora = new Date();
            const mesActual = ahora.getMonth();
            const anioActual = ahora.getFullYear();

            let ingresosMesActual = 0;
            let ingresosMesPasado = 0;
            let totalIngresosAnioPresente = 0;

            let codigosGeneradosMesActual = 0;
            let codigosGeneradosMesPasado = 0;
            let totalCodigosGeneradosAnioPresente = 0;

            let codigosGeneradosFalseMesActual = 0;
            let codigosGeneradosFalseMesPasado = 0;
            let totalCodigosGeneradosFalseAnioPresente = 0;

            codigosTodos.forEach(codigo => {
                const fechaGeneracion = new Date(codigo.fechaGeneracion);
                const mesGeneracion = fechaGeneracion.getMonth();
                const anioGeneracion = fechaGeneracion.getFullYear();
                const ingreso = codigo.precioTotal || 0;

                if (codigo.estado === true) {
                    if (anioGeneracion === anioActual) {
                        totalIngresosAnioPresente += ingreso;
                    }
                    if (mesGeneracion === mesActual && anioGeneracion === anioActual) {
                        ingresosMesActual += ingreso;
                    } else if (mesGeneracion === mesActual - 1 && anioGeneracion === anioActual) {
                        ingresosMesPasado += ingreso;
                    }
                }

                if (anioGeneracion === anioActual) {
                    totalCodigosGeneradosAnioPresente += 1;
                    if (mesGeneracion === mesActual) {
                        codigosGeneradosMesActual += 1;
                    } else if (mesGeneracion === mesActual - 1) {
                        codigosGeneradosMesPasado += 1;
                    }
                }

                if (codigo.estado === false) {
                    if (anioGeneracion === anioActual) {
                        totalCodigosGeneradosFalseAnioPresente += 1;
                        if (mesGeneracion === mesActual) {
                            codigosGeneradosFalseMesActual += 1;
                        } else if (mesGeneracion === mesActual - 1) {
                            codigosGeneradosFalseMesPasado += 1;
                        }
                    }
                }
            });

            setIngresosMesActual(ingresosMesActual);
            setIngresosMesPasado(ingresosMesPasado);
            setTotalIngresosAnioPresente(totalIngresosAnioPresente);

            setCodigosGeneradosMesActual(codigosGeneradosMesActual);
            setCodigosGeneradosMesPasado(codigosGeneradosMesPasado);
            setTotalCodigosGeneradosAnioPresente(totalCodigosGeneradosAnioPresente);

            setCodigosGeneradosFalseMesActual(codigosGeneradosFalseMesActual);
            setCodigosGeneradosFalseMesPasado(codigosGeneradosFalseMesPasado);
            setTotalCodigosGeneradosFalseAnioPresente(totalCodigosGeneradosFalseAnioPresente);
        }
    }, [codigosTodos]);

    return {

        oficina,
        estiloBoton,
        unicoCodigo,
        modalVisible,
        visibleToast,
        codigosTodos,
        paginaPagados,
        buscarEspacio,
        mostrarAlerta,
        mensajeAlerta,
        valorFormulario,
        paginaPendientes,
        oficinasFiltradas,
        ingresosMesActual,
        ingresosMesPasado,
        mostrarAdvertencia,
        elementosPorPagina,
        codigoSeleccionado,
        totalIngresosAnioPresente,
        codigosGeneradosMesActual,
        codigosGeneradosMesPasado,
        codigosGeneradosFalseMesActual,
        codigosGeneradosFalseMesPasado,
        totalCodigosGeneradosAnioPresente,
        totalCodigosGeneradosFalseAnioPresente,
        abrirModal,
        cerrarModal,
        eliminarCodigo,
        obtenerCodigos,
        obtenerOficinas,
        actualizarDatos,
        formatearFechas,
        setVisibleToast,
        setBuscarEspacio,
        handleButtonClick,
        limpiarFormulario,
        obtenerUnicoCodigo,
        handlePaginaChange,
        manejarCambioInput,
        filtrarCodigosPorEstado,
        calcularIndicesPaginacion,
        obtenerCodigosPorNombreOficina
    }
}