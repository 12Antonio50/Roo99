import React, { useState, useEffect } from "react";
import "../../styles/Style.clientes.css";

const Carousel = ({ images }) => {
    const [displayImages, setDisplayImages] = useState(images.slice(0, 3));
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);

            setTimeout(() => {
                setDisplayImages((prevImages) => {
                    const nextIndex = (images.indexOf(prevImages[0]) + 1) % images.length;
                    return [
                        images[nextIndex],
                        images[(nextIndex + 1) % images.length],
                        images[(nextIndex + 2) % images.length]
                    ];
                });

                setIsTransitioning(false);
            }, 500);
        }, 3500);

        return () => clearInterval(interval);
    }, [images]);

    return (
        <div className="carousel-wrapper">
            <div className={`carousel-inner ${isTransitioning ? "transitioning" : ""}`}>
                {displayImages.map((image, index) => (
                    <div key={index} className="image-box">
                        <img src={image} alt={`Imagen ${index + 1}`} className="carousel-image" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
