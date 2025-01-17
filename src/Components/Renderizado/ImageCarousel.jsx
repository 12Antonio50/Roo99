import React, { useState, useEffect } from "react";
import "../../styles/Style.clientes.css";
import img_1 from "../../assets/images/img_1.jpg";
import img_2 from "../../assets/images/img_2.jpg";
import img_3 from "../../assets/images/img_3.jpg";
import img_4 from "../../assets/images/img_4.jpeg";
import img_5 from "../../assets/images/img_5.jpg";
import img_6 from "../../assets/images/img_6.jpg";
import img_7 from "../../assets/images/img_7.jpg";
import img_8 from "../../assets/images/img_8.jpg";
import img_9 from "../../assets/images/img_9.jpeg";

const ImageCarousel = () => {
    const images = [img_1, img_2, img_3, img_4, img_5, img_6, img_7, img_8, img_9];

    const [currentIndex, setCurrentIndex] = useState(0);
    const totalImages = images.length;

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
        }, 5000);
        return () => clearInterval(intervalId);
    }, [totalImages]);

    return (
        <div id="carouselContainer">
            {images.map((image, index) => (
                <div key={index} className={`image-container-i ${index === currentIndex ? 'show zoom' : 'hide'}`}>
                    <img src={image} alt={`Imagen ${index + 1}`} className="carousel-img" />
                </div>
            ))}
        </div>
    );
};

export default ImageCarousel;
