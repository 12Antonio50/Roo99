import React, { useState } from "react";
import "../../styles/Style.horas.css";

const Reloj = ({ value, onSelectHours, availableHours }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="selector-horario">
            <button 
                onClick={handleToggle}
                className="hora-button"
                style={{ width: "100%" }}
            >
                {value || "Seleccionar hora"}
            </button>
            <div className={`horas-container ${isOpen ? "open" : ""}`}>
                {availableHours.map((hora, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            onSelectHours(hora);
                            setIsOpen(false);
                        }}
                        className={hora === value ? "hora-button selected" : "hora-button"}
                    >
                        {hora}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Reloj;
