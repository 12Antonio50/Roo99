import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ENV } from '../../Utils/API/Constants';

const CodigosInicio = () => {
    const BASE_PATH = ENV.BASE_PATH;
    const routeCOPOME = ENV.API_ROUTES.knhWyU9pm2u22cKe5rentuIfVSJMPYbyZSpNz6caf2ggu5zfjTU7nOogByLj3lXwz1pYgzRIYM34vtDE6aTwDdsb86h1s4W;
    const chartRef = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [meses, setMeses] = useState([]);
    const [cantidadCodigos, setCantidadCodigos] = useState([]);
    const [porcentajeCodigos, setPorcentajeCodigos] = useState([]);
    const token = Cookies.get('token');

    useEffect(() => {
        const url = `${BASE_PATH}${routeCOPOME}`;
        axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        })
        .then(response => {
            const { codigosPorMesConPorcentaje } = response.data;

            const months = [
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
                "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
            ];
            
            const cantidadArray = Array(12).fill(0);
            const porcentajeArray = Array(12).fill(0);

            codigosPorMesConPorcentaje.forEach(item => {
                const monthIndex = parseInt(item._id.slice(5, 7)) - 1;
                cantidadArray[monthIndex] = item.cantidad;
                porcentajeArray[monthIndex] = parseFloat(item.porcentaje);
            });

            setMeses(months);
            setCantidadCodigos(cantidadArray);
            setPorcentajeCodigos(porcentajeArray);
            setLoading(false);
        })
        .catch(error => {
            //console.error('Error al obtener los datos:', error);
            setLoading(false);
        });
    }, [token]);

    useEffect(() => {
        if (!loading) {
            const ctx = chartRef.current.getContext('2d');

            if (chartInstance) {
                chartInstance.destroy();
            }

            const newChartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: meses,
                    datasets: [
                        {
                            label: 'Número de Códigos',
                            data: cantidadCodigos,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Porcentaje de Códigos',
                            data: porcentajeCodigos,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                            type: 'line',
                            yAxisID: 'percentage'
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Número de Códigos'
                            }
                        },
                        percentage: {
                            type: 'linear',
                            position: 'right',
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Porcentaje'
                            }
                        }
                    }
                }
            });

            setChartInstance(newChartInstance);
        }
    }, [loading, meses, cantidadCodigos, porcentajeCodigos]);

    return (
        <div className="container">
            {loading ? (
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            ) : (
                <canvas ref={chartRef} />
            )}
        </div>
    );
};

export default CodigosInicio;
