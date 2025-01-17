import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { ENV } from "../API/Constants";

export default function useCrearRenta() {
    const { nombre } = useParams();
    const nombreReal = decodeURIComponent(nombre.replace(/_/g, ' '));
    const BASE_PATH = ENV.BASE_PATH;
    const routeOFBUUN = ENV.API_ROUTES.rtJDIXE9Kc35Z93qrXIJ9ddowrtHdoHpQgSaHK1YzhCfYVkylqXxdTZ7twDfHTs1DwglQ8KAAR9aVmyLz5HPQDcnifLN;
    const routeCOCRERE = ENV.API_ROUTES.xNRHIms3BtH1hv7cINbfjb6lalKFl7ihYmaYWRji5hZUrcJ8ObfvHe8KQ5VnXGIpRfU04OhSVdEYELWr562D7doVhtEAyAN;
    const routeOFAGCO = ENV.API_ROUTES.OpU8fhe5zuxk0U9KzlNxavZMVDvpxHrlYxJCZ4Ncuor14TdkxxIOcWyM6mnJoVadOb4NdPqKqSQvcm71RdgmsUJFkr4OdEq;
    const routeCOENCO = ENV.API_ROUTES.PdNg6TfsOYdyVbW4YDZeiSS7V3ggSdBODBQ5qk9VaKm8TeMPKAeZk0cIgRJY6VMxzGKqQ9JoqbaOP3B12mas1MOwGi3kVWrI;
    const routeCOHOOB = ENV.API_ROUTES.HORAS;
    const [valorFormulario, setValorFormulario] = useState({
        Correo: '',
        Codigo: '',
        Precio: '',
        Paquete: '',
        HoraInicio: '',
        HoraFin: '',
        DiasRenta: [],
        NombreArrendatario: '',
        NumeroIntegrantes: '',
    });
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mensajeAlerta, setMensajeAlerta] = useState("");
    const [costoBasico, setCostoBasico] = useState(0);
    const [costoIntermedio, setCostoIntermedio] = useState(0);
    const [costoPremium, setCostoPremium] = useState(0);
    const [nombreEspacio, setNombreEspacio] = useState("");
    const [dimension, setDimension] = useState("");
    const [caracteristicas, setCaracteristicas] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [ubicacion, setUbicacion] = useState('');
    const [detalles, setDetalles] = useState("");
    const [basicoResultado, setBasicoResultado] = useState(false);
    const [intermedioResultado, setIntermedioResultado] = useState(false);
    const [premiumResultado, setPremiumResultado] = useState(false);
    const [mostrarDetalles, setMostrarDetalles] = useState(false);
    const [participantes, setParticipantes] = useState(0);
    const [tipoEspacio, setTipoEspacio] = useState("");
    const [numeroMaximoIntegrantes, setNumeroMaximoIntegrantes] = useState(0);
    const [show, setShow] = useState(false);
    const [seleccionarDias, setSeleccionarDias] = useState([]);
    const [codigoGenerado, setCodigoGenerado] = useState("");
    const [diasSeleccionados, setDiasSeleccionados] = useState("");
    const [envioExitoso, setEnvioExitoso] = useState(false);
    const [imagenes, setImagenes] = useState([]);
    const [imagenActual, setImagenActual] = useState(0);
    const [modalAlerta, setModalAlerta] = useState(false);
    const [codigoHoras, setCodigoHoras] = useState([]);

    const obtenerOficinaUnica = useCallback(() => {
        const url = `${BASE_PATH}${routeOFBUUN}?nombre=${encodeURIComponent(nombreReal)}`;
        axios.get(url)
            .then(respuesta => {
                const oficina = respuesta.data;
                setCaracteristicas(oficina.caracteristicas);
                setServicios(oficina.servicios);
                setUbicacion(oficina.ubicacion);
                setCostoBasico(oficina.costoBasico);
                setCostoIntermedio(oficina.costoIntermedio);
                setCostoPremium(oficina.costoPremium);
                setNombreEspacio(oficina.nombre);
                setDimension(oficina.metrosCuadrados);
                setDetalles(oficina.descripcion);
                setTipoEspacio(oficina.tipoEspacio);
                setNumeroMaximoIntegrantes(oficina.numeroMaximoIntegrantes);
                setImagenes(oficina.imagenes);
            })
            .catch(error => {
                //console.error("Error al obtener los datos");
            });
    }, [nombreReal, BASE_PATH, routeOFBUUN]);

    useEffect(() => {
        obtenerOficinaUnica();
    }, [obtenerOficinaUnica]);

    const obtenerHorasCodigos = useCallback(() => {
        const url = `${BASE_PATH}${routeCOHOOB}`;
        const dato = { nombre: nombreEspacio };

        axios.post(url, dato)
            .then((respuesta) => {
                setCodigoHoras(respuesta.data);
            })
            .catch((error) => {
                //console.error("Error al obtener los datos de los códigos");
            });
    }, [BASE_PATH, routeCOHOOB, nombreEspacio]);

    useEffect(() => {
        if (nombreEspacio) {
            obtenerHorasCodigos();
        }
    }, [nombreEspacio, obtenerHorasCodigos]);

    const handleCambioFecha = (dias) => {
        if (!Array.isArray(dias)) {
            setMensajeAlerta("El formato de fechas es inválido.");
            setMostrarAlerta(true);
            setModalAlerta(true)
            setTimeout(() => {
                setMostrarAlerta(false);
                setModalAlerta(false)
            }, 5000);
            return;
        }

        const fechaActual = new Date();
        fechaActual.setHours(0, 0, 0, 0);

        for (let i = 0; i < dias.length; i++) {
            const fechaSeleccionada = new Date(dias[i]);

            if (isNaN(fechaSeleccionada.getTime())) {
                setMensajeAlerta("Una de las fechas seleccionadas no es válida.");
                setMostrarAlerta(true);
                setModalAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                    setModalAlerta(false);
                }, 5000);
                return;
            }

            fechaSeleccionada.setHours(0, 0, 0, 0);

            const fechaLimite = new Date();
            fechaLimite.setDate(fechaActual.getDate() + 25);

            if (fechaSeleccionada < fechaActual) {
                setMensajeAlerta("Debes seleccionar solo fechas posteriores a la fecha actual.");
                setMostrarAlerta(true);
                setModalAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                    setModalAlerta(false);
                }, 5000);
                return;
            }

            if (fechaSeleccionada > fechaLimite) {
                setMensajeAlerta("La fecha seleccionada supera los 25 días de anticipación");
                setMostrarAlerta(true);
                setModalAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                    setModalAlerta(false);
                }, 5000);
                return;
            }

            if (fechaSeleccionada.getDay() === 0 || fechaSeleccionada.getDay() === 6) {
                setMensajeAlerta("No se permite seleccionar sabados o domingos.");
                setMostrarAlerta(true);
                setModalAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                    setModalAlerta(false);
                }, 5000);
                return;
            }
        }
        setSeleccionarDias(dias);
    };

    const asignarClasesDiasInvalidos = ({ date }) => {
        const fechaActual = new Date();
        const fechaLimite = new Date();
        fechaLimite.setDate(fechaActual.getDate() + 25);

        const fechaComparacion = new Date(fechaActual);
        fechaComparacion.setHours(0, 0, 0, 0);

        if (
            date < fechaComparacion ||
            date > fechaLimite ||
            date.getDay() === 0 ||
            date.getDay() === 6
        ) {
            return 'react-calendar__tile--dia-invalido';
        }
        return null;
    };

    const deshabilitarSabadosDomingos = ({ date }) => {
        const day = date.getDay();
        return day === 0 || day === 6;
    }

    const asignarClasesRango = ({ date, view }) => {
        if (view === 'month') {
            if (seleccionarDias && seleccionarDias.length === 2) {
                const [inicio, fin] = seleccionarDias;
                const isIntoRange = date >= inicio && date <= fin;
                const isDisabledDay = date.getDay() === 0 || date.getDay() === 6;

                if (isIntoRange && isDisabledDay) {
                    return 'react-calendar__tile--rango-sin-dias-no-validos'
                }

                if (isIntoRange) {
                    return 'react-calendar__tile--range';
                }
            }
        }
        return null;
    };

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setTimeout(() => {
            setShow(true);
        }, 5000)
    }

    const handleBasicoCambio = () => {
        if (basicoResultado) {
            setBasicoResultado(false);
            setValorFormulario((prevState) => ({
                ...prevState,
                Paquete: '',
                Precio: ''
            }));
        } else {
            setBasicoResultado(true);
            setIntermedioResultado(false);
            setPremiumResultado(false);
            setValorFormulario((prevState) => ({
                ...prevState,
                Paquete: 'Básico',
                Precio: costoBasico.toFixed(2)
            }));
        }
    };

    const handleIntermedioCambio = () => {
        if (intermedioResultado) {
            setIntermedioResultado(false);
            setValorFormulario((prevState) => ({
                ...prevState,
                Paquete: '',
                Precio: ''
            }));
        } else {
            setIntermedioResultado(true);
            setBasicoResultado(false);
            setPremiumResultado(false);
            setValorFormulario((prevState) => ({
                ...prevState,
                Paquete: 'Intermedio',
                Precio: costoIntermedio.toFixed(2)
            }));
        }
    };

    const handlePremiumCambio = () => {
        if (premiumResultado) {
            setPremiumResultado(false);
            setValorFormulario((prevState) => ({
                ...prevState,
                Paquete: '',
                Precio: ''
            }));
        } else {
            setPremiumResultado(true);
            setBasicoResultado(false);
            setIntermedioResultado(false);
            setValorFormulario((prevState) => ({
                ...prevState,
                Paquete: 'Premium',
                Precio: costoPremium.toFixed(2)
            }));
        }
    };

    useEffect(() => {
        if (basicoResultado || intermedioResultado || premiumResultado) {
            setMostrarDetalles(true);
        } else {
            setMostrarDetalles(false);
        }
    }, [basicoResultado, intermedioResultado, premiumResultado]);

    const rentaCodigoRef = useRef(null);

    useEffect(() => {
        if (mostrarDetalles) {
            if (rentaCodigoRef.current) {
                rentaCodigoRef.current.scrollIntoView({ behavior: 'smooth' });
            } else {
                setTimeout(() => {
                    if (rentaCodigoRef.current) {
                        rentaCodigoRef.current.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
        }
    }, [mostrarDetalles]);

    useEffect(() => {
        if (numeroMaximoIntegrantes === 1) {
            setValorFormulario(prevState => ({
                ...prevState,
                NumeroIntegrantes: 1
            }));
            setParticipantes(1);
        }
    }, [numeroMaximoIntegrantes]);

    const handleParticipantesCambio = (e) => {
        const inputValue = e.target.value.trim();
        const parsedValue = parseInt(inputValue, 10);

        if (!isNaN(parsedValue) && parsedValue > 0) {
            if (parsedValue > numeroMaximoIntegrantes) {
                setMensajeAlerta(`El número máximo de integrantes permitido es ${numeroMaximoIntegrantes}`);
                setMostrarAlerta(true);
                setModalAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                    setModalAlerta(false);
                }, 5000);
                return;
            }

            setValorFormulario(prevState => ({
                ...prevState,
                NumeroIntegrantes: parsedValue
            }));
            setParticipantes(parsedValue);
        } else {
            setValorFormulario(prevState => ({
                ...prevState,
                NumeroIntegrantes: ''
            }));
            setParticipantes(0);
        }
    };

    const validarHora = (hora) => {
        const horaSeleccionada = new Date(`1970-01-01T${hora}:00`);
        const horaInicioPermitida = new Date('1970-01-01T09:00:00');
        const horaFinPermitida = new Date('1970-01-01T18:00:00');

        return horaSeleccionada >= horaInicioPermitida && horaSeleccionada <= horaFinPermitida;
    };

    const generarHorasInicio = useCallback(() => {
        const horasDisponibles = [];
        for (let h = 9; h <= 18; h++) {
            const hora = h < 10 ? `0${h}:00` : `${h}:00`;
            horasDisponibles.push(hora);
        }
        return horasDisponibles;
    }, []);

    const obtenerHorasOcupadasPorDia = useCallback((diaSeleccionado) => {
        let horasOcupadas = [];

        codigoHoras.forEach(({ horaInicio, horaFin, diasRenta }) => {
            diasRenta.forEach((dia) => {
                const fechaDB = new Date(dia).toISOString().split('T')[0];
                const fechaSeleccionada = new Date(diaSeleccionado).toISOString().split('T')[0];

                if (fechaDB === fechaSeleccionada) {
                    const horaInicioMinutos = convertirAHorasMinutos(horaInicio);
                    const horaFinMinutos = convertirAHorasMinutos(horaFin);

                    for (let h = horaInicioMinutos; h < horaFinMinutos; h += 60) {
                        horasOcupadas.push(minutosAHoras(h));
                    }

                    if (horaFin === "18:00") {
                        horasOcupadas.push("18:00");
                    }
                }
            });
        });

        return horasOcupadas;
    }, [codigoHoras]);


    const obtenerHorasDisponibles = (tipoHora, horaInicio = null) => {
        let horasDisponibles = generarHorasInicio();

        const horasOcupadas = seleccionarDias.flatMap(dia => obtenerHorasOcupadasPorDia(dia));

        horasDisponibles = horasDisponibles.filter(hora => !horasOcupadas.includes(hora));

        horasDisponibles = horasDisponibles.filter(hora => hora !== "18:00" || !horasOcupadas.includes("18:00"));

        if (tipoHora === 'HoraInicio') {
            horasDisponibles = horasDisponibles.filter(hora => convertirAHorasMinutos(hora) < convertirAHorasMinutos("18:00"));
        }

        if (tipoHora === 'HoraFin' && horaInicio) {
            const horaInicioMinutos = convertirAHorasMinutos(horaInicio);

            horasDisponibles = horasDisponibles.filter(hora => convertirAHorasMinutos(hora) > horaInicioMinutos);

            if (horaInicioMinutos <= convertirAHorasMinutos("17:30") && !horasOcupadas.includes("18:00")) {
                if (!horasDisponibles.includes("18:00")) {
                    horasDisponibles.push("18:00");
                }
            }

            horasDisponibles.sort((a, b) => convertirAHorasMinutos(a) - convertirAHorasMinutos(b));
        }

        return horasDisponibles;
    };

    const convertirAHorasMinutos = (hora) => {
        const [horaStr, minutosStr] = hora.split(':');
        return parseInt(horaStr) * 60 + parseInt(minutosStr);
    };

    const minutosAHoras = (minutos) => {
        const hora = Math.floor(minutos / 60);
        const minutosRestantes = minutos % 60;
        return `${hora < 10 ? '0' + hora : hora}:${minutosRestantes === 0 ? '00' : minutosRestantes < 10 ? '0' + minutosRestantes : minutosRestantes}`;
    };

    const verificarTraslape = (horaInicio, horaFin, diasSeleccionados) => {
        for (let dia of diasSeleccionados) {
            const fechaSeleccionada = new Date(dia).toISOString().split('T')[0];

            for (let reserva of codigoHoras) {
                for (let diaRenta of reserva.diasRenta) {
                    const fechaReservada = new Date(diaRenta).toISOString().split('T')[0];

                    if (fechaSeleccionada === fechaReservada) {
                        const inicioReservado = convertirAHorasMinutos(reserva.horaInicio);
                        const finReservado = convertirAHorasMinutos(reserva.horaFin);
                        const inicioNuevo = convertirAHorasMinutos(horaInicio);
                        const finNuevo = convertirAHorasMinutos(horaFin);

                        // Validar si se solapan
                        if (
                            (inicioNuevo >= inicioReservado && inicioNuevo < finReservado) || // Empieza dentro de una reserva existente
                            (finNuevo > inicioReservado && finNuevo <= finReservado) || // Termina dentro de una reserva existente
                            (inicioNuevo <= inicioReservado && finNuevo >= finReservado) // La nueva reserva cubre completamente otra
                        ) {
                            return true; // Hay traslape
                        }
                    }
                }
            }
        }
        return false; // No hay traslape
    };

    const manejarCambioInput = (name, value) => {
        if ((name === 'HoraInicio' || name === 'HoraFin') && !validarHora(value)) {
            setMensajeAlerta("La hora debe estar entre 09:00 AM y 06:00 PM.");
            setMostrarAlerta(true);
            setModalAlerta(true);
            setTimeout(() => {
                setMostrarAlerta(false);
                setModalAlerta(false);
            }, 5000);
            return;
        }

        if (name === "HoraInicio") {
            const horaInicioMinutos = convertirAHorasMinutos(value);

            // 🔹 Limitar `HoraInicio` a 17:00 máximo
            if (horaInicioMinutos > 17 * 60) {
                setMensajeAlerta("La hora de inicio no puede ser después de las 17:00.");
                setMostrarAlerta(true);
                return;
            }

            let horaFinMinutos = horaInicioMinutos + 30;

            // 🔹 Limitar `HoraFin` a 18:00 máximo
            if (horaFinMinutos > 18 * 60) {
                horaFinMinutos = 18 * 60;
            }

            const nuevaHoraFin = minutosAHoras(horaFinMinutos);

            // Validar traslape
            if (verificarTraslape(value, nuevaHoraFin, seleccionarDias)) {
                setMensajeAlerta("El horario seleccionado se solapa con una reserva existente.");
                setMostrarAlerta(true);
                setModalAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                    setModalAlerta(false);
                }, 5000);
                return;
            }

            setValorFormulario((prev) => ({
                ...prev,
                HoraInicio: value,
                HoraFin: nuevaHoraFin,
            }));
        } else if (name === "HoraFin") {
            const horaFinMinutos = convertirAHorasMinutos(value);

            // 🔹 Asegurar que `HoraFin` no pase de 18:00
            if (horaFinMinutos > 18 * 60) {
                setMensajeAlerta("La hora de fin no puede ser después de las 18:00.");
                setMostrarAlerta(true);
                return;
            }

            if (verificarTraslape(valorFormulario.HoraInicio, value, seleccionarDias)) {
                setMensajeAlerta("El horario seleccionado se solapa con una reserva existente.");
                setMostrarAlerta(true);
                setModalAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                    setModalAlerta(false);
                }, 5000);
                return;
            }

            setValorFormulario((prev) => ({
                ...prev,
                HoraFin: value,
            }));
        } else {
            setValorFormulario((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const manejarCambios = (e) => {
        manejarCambioInput(e.target.name, e.target.value);
        if (e.target.name === 'NumeroIntegrantes') {
            handleParticipantesCambio(e);
        }
    };

    const esDiaSinDisponibilidad = useCallback((diaSeleccionado) => {
        const horasOcupadas = obtenerHorasOcupadasPorDia(diaSeleccionado);
        const horasTotales = generarHorasInicio();
        return horasTotales.every(hora => horasOcupadas.includes(hora));
    }, [obtenerHorasOcupadasPorDia, generarHorasInicio]);

    const generarFechasIntermedias = useCallback((fechaInicio, fechaFin) => {
        let fechas = [];
        let fechaActual = new Date(fechaInicio);

        while (fechaActual <= fechaFin) {
            let esFinDeSemana = fechaActual.getDay() === 0 || fechaActual.getDay() === 6;
            let sinDisponibilidad = esDiaSinDisponibilidad(fechaActual);

            if (!esFinDeSemana && !sinDisponibilidad) {
                fechas.push(new Date(fechaActual));
            }

            fechaActual.setDate(fechaActual.getDate() + 1);
        }

        return fechas;
    }, [esDiaSinDisponibilidad]);

    const calcularTotal = useCallback(() => {
        let costoSeleccionado = basicoResultado ? costoBasico
            : intermedioResultado ? costoIntermedio
                : premiumResultado ? costoPremium
                    : 0;

        let numeroDiasSeleccionados = 0;
        if (seleccionarDias.length > 1) {
            const fechaInicio = seleccionarDias[0];
            const fechaFin = seleccionarDias[seleccionarDias.length - 1];

            const todasLasFechas = generarFechasIntermedias(fechaInicio, fechaFin);
            numeroDiasSeleccionados = todasLasFechas.length;
        }

        const subtotal = participantes * costoSeleccionado * numeroDiasSeleccionados;
        const totalConImpuesto = subtotal * 1.16;

        return isNaN(totalConImpuesto) ? "0.00" : totalConImpuesto.toFixed(2);
    }, [
        participantes,
        basicoResultado,
        intermedioResultado,
        premiumResultado,
        seleccionarDias,
        costoBasico,
        costoIntermedio,
        costoPremium,
        generarFechasIntermedias
    ]);

    useEffect(() => {
        if (numeroMaximoIntegrantes === 1) {
            setValorFormulario(prevState => ({
                ...prevState,
                NumeroIntegrantes: 1
            }));
            setParticipantes(1);
        }
    }, [numeroMaximoIntegrantes]);

    useEffect(() => {
        const total = calcularTotal();
        setValorFormulario((prevState) => ({
            ...prevState,
            Precio: total
        }));
    }, [participantes, basicoResultado, intermedioResultado, premiumResultado, seleccionarDias, calcularTotal]);

    const limpiarFormulario = () => {
        setValorFormulario({
            Precio: '',
            NumeroIntegrantes: '',
            Paquete: '',
            HoraInicio: '',
            HoraFin: '',
            DiasRenta: '',
            NombreArrendatario: ''
        });
        setParticipantes(0);
        setBasicoResultado(false);
        setIntermedioResultado(false);
        setPremiumResultado(false);
        setMostrarDetalles(false);
        setSeleccionarDias([]);
    };

    const formatearFecha = (fecha) => {
        const year = fecha.getFullYear();
        const month = String(fecha.getMonth() + 1).padStart(2, '0');
        const day = String(fecha.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const enviarFormulario = async () => {
        const { Precio, NumeroIntegrantes, Paquete, HoraInicio, HoraFin, NombreArrendatario } = valorFormulario;

        if (!Precio || !NumeroIntegrantes || !Paquete || !seleccionarDias.length || !NombreArrendatario || !HoraFin || !HoraInicio) {
            setMensajeAlerta("Por favor, complete todos los campos antes de guardar");
            setMostrarAlerta(true);
            setModalAlerta(true);
            setTimeout(() => {
                setMostrarAlerta(false);
                setModalAlerta(false);
            }, 5000);
            return;
        }

        let diasRentasFormateados = [];
        if (seleccionarDias.length >= 1) {
            const fechaInicio = seleccionarDias[0];
            const fechaFin = seleccionarDias[seleccionarDias.length - 1];

            const todasLasFechas = generarFechasIntermedias(fechaInicio, fechaFin);
            diasRentasFormateados = todasLasFechas.map(dia => formatearFecha(dia));

            if (diasRentasFormateados.length === 0) {
                setMensajeAlerta("No hay días seleccionados");
                setMostrarAlerta(true);
                setModalAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                    setModalAlerta(false);
                }, 5000);
                return;
            }
        } else {
            setMensajeAlerta("Por favor, seleccione al menos un día");
            setMostrarAlerta(true);
            setModalAlerta(true);
            setTimeout(() => {
                setMostrarAlerta(false);
                setModalAlerta(false);
            }, 5000);
            return;
        }
        const url = `${BASE_PATH}${routeCOCRERE}`;

        let sumaTotal = calcularTotal();

        const now = new Date();
        const dia = String(now.getDate()).padStart(2, '0');
        const mes = String(now.getMonth() + 1).padStart(2, '0');
        const anio = now.getFullYear();

        const numeroAleatorio = Math.floor(Math.random() * 900) + 100;

        valorFormulario.Codigo = `RootWorking${dia}${mes}${anio}${numeroAleatorio}`;

        setCodigoGenerado(valorFormulario.Codigo);
        setDiasSeleccionados(diasRentasFormateados);

        let datos = {
            codigo: valorFormulario.Codigo,
            precio: Precio,
            numeroIntegrantes: NumeroIntegrantes,
            paquete: Paquete,
            horaInicio: HoraInicio,
            horaFin: HoraFin,
            diasRenta: diasRentasFormateados,
            nombreArrendatario: NombreArrendatario,
            precioTotal: sumaTotal,
            nombreEspacio: nombreEspacio
        };

        axios.post(url, datos)
            .then(respuesta => {
                if (respuesta.status === 200) {
                    setEnvioExitoso(true);
                    setMensajeAlerta(`${Paquete} apartado correctamente`);
                    setMostrarAlerta(true);
                    setModalAlerta(true);
                    setTimeout(() => {
                        setMostrarAlerta(false);
                        setModalAlerta(false);
                    }, 5000);
                    agregarCodigoAOficina(nombreEspacio, valorFormulario.Codigo);
                } else {
                    setEnvioExitoso(false);
                    throw Error('Error al apartar el espacio', Error);
                }
            })
            .catch(error => {
                //console.error("Errores: ", error)
                setMensajeAlerta('Error al apartar el espacio');
                setMostrarAlerta(true);
                setModalAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                    setModalAlerta(false);
                }, 5000);
                setEnvioExitoso(false);
            });
    };

    const agregarCodigoAOficina = async (nombreEspacio, Codigo) => {
        let datosAgregarCodigo = {
            codigo: Codigo,
            nombre: nombreEspacio
        };
        const url = `${BASE_PATH}${routeOFAGCO}`;

        await axios.patch(url, datosAgregarCodigo)
            .then(respuesta => {
                if (respuesta.status === 200) {
                    setMensajeAlerta(`Espacio apartado correctamente`);
                    setMostrarAlerta(true);
                    setModalAlerta(true);
                    setTimeout(() => {
                        setMostrarAlerta(false);
                        setModalAlerta(false);
                    }, 5000);
                } else {
                    throw Error('Error al apartar el espacio');
                }
            })
            .catch(error => {
                setMensajeAlerta('Error al apartar el espacio');
                setMostrarAlerta(true);
                setModalAlerta(true)
                setTimeout(() => {
                    setMostrarAlerta(false);
                    setModalAlerta(false);
                }, 5000);
            });
    }

    const enviarCodigo = () => {
        const url = `${BASE_PATH}${routeCOENCO}`;

        const { Correo } = valorFormulario;

        if (!Correo || Correo.trim() === "") {
            setMensajeAlerta("Ingrese el dato que se le solicita");
            setMostrarAlerta(true);
            setModalAlerta(true);
            setTimeout(() => {
                setModalAlerta(false);
                setMostrarAlerta(false);
            }, 5000);
        }

        let sumaTotal = calcularTotal();

        let datos = {
            correo: valorFormulario.Correo,
            codigo: valorFormulario.Codigo,
            nombreEspacio: nombreEspacio,
            horaInicio: valorFormulario.HoraInicio,
            horaFin: valorFormulario.HoraFin,
            numeroIntegrantes: valorFormulario.NumeroIntegrantes,
            paquete: valorFormulario.Paquete,
            nombreArrendatario: valorFormulario.NombreArrendatario,
            diasRenta: diasSeleccionados,
            precioTotal: sumaTotal
        };

        axios.patch(url, datos,)
            .then(respuesta => {
                if (respuesta.status === 200) {
                    setMensajeAlerta(`Correo enviado a ${valorFormulario.Correo}`);
                    setMostrarAlerta(true);
                    setModalAlerta(true);
                    setTimeout(() => {
                        setMostrarAlerta(false);
                        setModalAlerta(false);
                    }, 5000);
                    setTimeout(() => {
                        window.location.reload(true);
                    }, 5500);
                } else {
                    throw Error('Error al enviar el correo, por favor tome captura de pantalla o anote el código');
                }
            })
            .catch((error) => {
                setMensajeAlerta('Error al enviar el correo');
                setMostrarAlerta(true);
                setModalAlerta(true);
                setTimeout(() => {
                    setMostrarAlerta(false);
                    setModalAlerta(false)
                }, 5000);
            });
    }

    const handleClick = async () => {
        await enviarFormulario();

        if (envioExitoso) {
            handleShow();
        }
    };

    useEffect(() => {
        if (envioExitoso) {
            handleShow();
            setEnvioExitoso(false);
        }
    }, [envioExitoso]);

    const handleEvent = () => {
        handleClose();
        enviarCodigo();
    }

    const primeraImagen = imagenes && imagenes.length > 0 ? imagenes[0] : null;

    const imagenAnterior = () => {
        setImagenActual((prevIndex) => (prevIndex === 0 ? imagenes.length - 1 : prevIndex - 1));
    };

    const imagenSiguiente = () => {
        setImagenActual((prevIndex) => (prevIndex === imagenes.length - 1 ? 0 : prevIndex + 1));
    }

    const opcionesIntegrantes = [];
    for (let i = 1; i <= numeroMaximoIntegrantes; i++) {
        opcionesIntegrantes.push(<option key={i} value={i}>{i}</option>);
    }

    const combinarClases = ({ date, view }) => {
        const rangoClase = asignarClasesRango({ date, view });
        const invalidoClase = asignarClasesDiasInvalidos({ date });
        const sinDisponibilidadClase = esDiaSinDisponibilidad(date) ? "dia-sin-disponibilidad" : "";
        return [rangoClase, invalidoClase, sinDisponibilidadClase].filter(Boolean).join(' ');
    };

    return {
        show,
        imagenes,
        detalles,
        ubicacion,
        servicios,
        dimension,
        codigoHoras,
        tipoEspacio,
        costoBasico,
        modalAlerta,
        costoPremium,
        imagenActual,
        participantes,
        mensajeAlerta,
        mostrarAlerta,
        nombreEspacio,
        primeraImagen,
        rentaCodigoRef,
        codigoGenerado,
        mostrarDetalles,
        seleccionarDias,
        basicoResultado,
        valorFormulario,
        costoIntermedio,
        caracteristicas,
        premiumResultado,
        opcionesIntegrantes,
        intermedioResultado,
        numeroMaximoIntegrantes,
        handleShow,
        handleClick,
        handleEvent,
        handleClose,
        calcularTotal,
        formatearFecha,
        minutosAHoras,
        generarHorasInicio,
        combinarClases,
        manejarCambios,
        imagenAnterior,
        imagenSiguiente,
        setImagenActual,
        enviarFormulario,
        setMensajeAlerta,
        setMostrarAlerta,
        handleCambioFecha,
        limpiarFormulario,
        setValorFormulario,
        manejarCambioInput,
        handleBasicoCambio,
        handlePremiumCambio,
        handleIntermedioCambio,
        convertirAHorasMinutos,
        handleParticipantesCambio,
        deshabilitarSabadosDomingos,
        obtenerHorasDisponibles
    }
}