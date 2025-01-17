import { useState } from "react";
import axios from "axios";
import { ENV } from "../API/Constants";

export default function RestablecerFunction(){
    const BASE_PATH = ENV.BASE_PATH;
    const routeUSRECO = ENV.API_ROUTES.uGwT7NxqmpFvM5I283y0qAOWhW5VqxeajNVDMv8iNO6kQEHZ5s99JwuIh2F6Kkct9Pi1EaxXGBdbCyx3bGlfvXBHxPkDL;
    const [correo, setCorreo] = useState("");
    const [alerta, setAlerta] = useState(null);
    const [isFlipped, setIsFlipped] = useState(false);

    const restablecerPassword = (event) => {
        event.preventDefault();
    
        const url = `${BASE_PATH}${routeUSRECO}`;
        
        axios.patch(url, {
            correo: correo
        })
        .then(() => {
            mostrarAlerta("La contraseña ha sido restablecida. Por favor, revise su correo electrónico para obtener la nueva contraseña.", "success");
        })
        .catch((error) => {
            //console.error("");
            mostrarAlerta("Ocurrió un error al restablecer la contraseña. Por favor, inténtelo de nuevo más tarde.", "danger");
        });
    };
    
    const mostrarAlerta = (mensaje, tipo) => {
        setAlerta({ mensaje, tipo });
        setTimeout(() => {
            setAlerta(null);
        }, 3000);
    }

    const handleLinkClick = () => {
        setIsFlipped(true);
        setTimeout(() => {
            window.location.href = "/ad/root-working/inicio-de-sesion";
        }, 500);
    };

    return {
        alerta,
        correo,
        isFlipped,
        setCorreo,
        handleLinkClick,
        restablecerPassword,
    }
}