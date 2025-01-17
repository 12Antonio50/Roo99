import { useState } from "react";
import axios from "axios";
import { ENV } from "../API/Constants";

export default function useNotificaciones() {
    const BASE_PATH = ENV.BASE_PATH;
    const routeNot = ENV.API_ROUTES.correo;
    const routeNotExp = ENV.API_ROUTES.correo_exp;
    const [mensajeAlerta, setMensajeAlerta] = useState("");
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorCorreo, setErrorCorreo] = useState('');
    const [valorFormulario, setValorFormulario] = useState({
        Nombre: '',
        Apellido: '',
        Correo: '',
        Telefono: '',
        Empresa: '',
        CantidadPersonas: '',
        InformacionAdicional: ''
    });

    const limpiarFormulario = () => {
        setValorFormulario({
            Nombre: '',
            Apellido: '',
            Correo: '',
            Telefono: '',
            Empresa: '',
            CantidadPersonas: '',
            InformacionAdicional: ''
        });
    };

    const validarCorreo = (correo) => {
        const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regexCorreo.test(correo);
    };

    const manejarCambioInput = (e) => {
        const { name, value } = e.target;

        setValorFormulario((prevState) => ({
            ...prevState,
            [name]: value
        }));

        // Validación del correo electrónico al momento de escribir
        if (name === 'Correo') {
            if (!validarCorreo(value)) {
                setErrorCorreo('Por favor ingresa un correo electrónico válido.');
            } else {
                setErrorCorreo('');
            }
        }
    };

    const enviarFormulario = (e) => {
        e.preventDefault();

        setIsLoading(true);
        const {
            Nombre,
            Correo,
            Telefono
        } = valorFormulario;

        if (!Nombre || !Correo || !Telefono) {
            setMensajeAlerta("Por favor, complete todos los campos antes de enviar");
            setMostrarAlerta(true);
            setTimeout(() => setMostrarAlerta(false), 3000);
            return;
        }

        if (!validarCorreo(valorFormulario.Correo)) {
            setErrorCorreo('Por favor ingresa un correo electrónico válido.');
            return;
        }

        const dato = {
            nombre: Nombre,
            correo: Correo,
            telefono: Telefono,
        }

        const url = `${BASE_PATH}${routeNot}`;

        axios.post(url, dato)
            .then((respuesta) => {
                if (respuesta.status === 200) {
                    setIsLoading(false);
                    setMensajeAlerta("En breve nos pondremos en contacto con usted");
                    setMostrarAlerta(true);
                    setTimeout(() => setMostrarAlerta(false), 3000);
                    limpiarFormulario();
                }
            })
            .catch((err) => {
                setIsLoading(false);
                setMensajeAlerta('Hubo un error intentelo nuevamente más tarde.');
                setMostrarAlerta(true);
                setTimeout(() => setMostrarAlerta(false), 5000);
            });
    }

    const enviarFormularioExp = (e) => {
        e.preventDefault();

        setIsLoading(true);
        const {
            Nombre,
            Apellido,
            Correo,
            Telefono,
            Empresa,
            CantidadPersonas,
            InformacionAdicional
        } = valorFormulario;

        if (!Nombre || !Apellido || !Correo || !Telefono || !Empresa || !CantidadPersonas || !InformacionAdicional) {
            setMensajeAlerta("Por favor, complete todos los campos antes de enviar");
            setMostrarAlerta(true);
            setTimeout(() => setMostrarAlerta(false), 3000);
            return;
        }

        if (!validarCorreo(valorFormulario.Correo)) {
            setErrorCorreo('Por favor ingresa un correo electrónico válido.');
            return;
        }

        const dato = {
            nombre: Nombre,
            apellido: Apellido,
            correo: Correo,
            telefono: Telefono,
            empresa: Empresa,
            cantidadPersonas: CantidadPersonas,
            informacionAdicional: InformacionAdicional
        }

        const url = `${BASE_PATH}${routeNotExp}`;

        axios.post(url, dato)
            .then((respuesta) => {
                if (respuesta.status === 200) {
                    setIsLoading(false);
                    setMensajeAlerta("En breve nos pondremos en contacto con usted");
                    setMostrarAlerta(true);
                    setTimeout(() => setMostrarAlerta(false), 3000);
                    limpiarFormulario();
                }
            })
            .catch((err) => {
                setIsLoading(false);
                setMensajeAlerta('Hubo un error intentelo nuevamente más tarde.');
                setMostrarAlerta(true);
                setTimeout(() => setMostrarAlerta(false), 5000);
            });
    }

    return {
        mensajeAlerta,
        mostrarAlerta,
        valorFormulario,
        isLoading,
        errorCorreo,
        enviarFormulario,
        enviarFormularioExp,
        manejarCambioInput
    }
}