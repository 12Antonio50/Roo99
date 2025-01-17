import React from "react";

const ButtonCard = ({ onClick, children, className = "" }) => {
    return (
        <button onClick={onClick} type="button" className={`btn-information w-100 rounded-0 text-center ${className}`}>
            <b>{children}</b>
        </button>
    );
};

export default ButtonCard;
