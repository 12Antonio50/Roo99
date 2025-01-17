import React, { useEffect, useState } from 'react';

const AvisoPrivacidad = () => {
    const [showPrivacyNotice, setShowPrivacyNotice] = useState(false);

    useEffect(() => {
        const privacidadAceptada = localStorage.getItem('privacyAccepted');

        if (!privacidadAceptada) {
            setShowPrivacyNotice(true);
        }
    }, []);

    const aceptarAviso = () => {
        localStorage.setItem('privacyAccepted', 'true');
        setShowPrivacyNotice(false);
    };

    return (
        showPrivacyNotice && (
            <div style={styles.overlay}>
                <div style={styles.modal}>
                    <h2>Aviso de Privacidad</h2>
                    <p style={styles.text}>
                        Este sitio utiliza cookies para mejorar la experiencia del usuario.
                        Al continuar navegando, aceptas nuestra política de privacidad.
                    </p>
                    <button onClick={aceptarAviso} style={styles.button}>
                        Aceptar
                    </button>
                </div>
            </div>
        )
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modal: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%',
    },
    button: {
        backgroundColor: '#28a745',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    text: {
        textAlign: 'justify'
    }
};

export default AvisoPrivacidad;
