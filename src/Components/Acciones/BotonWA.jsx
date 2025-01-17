import React, { useState, useEffect } from "react";
import { BsWhatsapp } from "react-icons/bs";

const BotonWA = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const buttonStyle = {
        background: '#1bd741',
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        borderRadius: '50%',
        padding: '10px',
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
    };

    return (
        <a
            href="https://wa.me/525549109289"
            style={buttonStyle}
            target="_blank"
            rel="noopener noreferrer"
        >
            <BsWhatsapp style={{ color: '#FFFFFF', fontSize: '30px' }} />
        </a>
    );
}

export default BotonWA;
