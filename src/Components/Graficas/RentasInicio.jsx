import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ENV } from '../../Utils/API/Constants';

const RentasOficinasChart = () => {
    const BASE_PATH = ENV.BASE_PATH;
    const routeOFPOCO = ENV.API_ROUTES.N6MkHCw9HvrttEOsTcc1xa3Eum6d4jkMg9OSyEgayUryFVy4PTbVaFm1OY10SmoQ4zhaSTzRDrkMC39w8MOBUI2HER5irB;
    const chartRef = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [oficinas, setOficinas] = useState([]);
    const [cantidadCodigos, setCantidadCodigos] = useState([]);
    const [porcentajes, setPorcentajes] = useState([]);
    const token = Cookies.get('token');

    useEffect(() => {
        const url = `${BASE_PATH}${routeOFPOCO}`;
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            const oficinasData = response.data;

            if (Array.isArray(oficinasData) && oficinasData.length > 0) {
                const oficinasArray = oficinasData.map(oficina => oficina.nombre);
                const cantidadArray = oficinasData.map(oficina => oficina.cantidadCodigos);
                const porcentajeArray = oficinasData.map(oficina => oficina.porcentaje);

                setOficinas(oficinasArray);
                setCantidadCodigos(cantidadArray);
                setPorcentajes(porcentajeArray);
            } else {
                //console.warn('No se encontraron oficinas en los datos de respuesta.');
            }
            setLoading(false);
        })
        .catch(error => {
            //console.error('Error al obtener los datos');
            setLoading(false);
        });
    }, [token]);

    useEffect(() => {
        if (!loading && oficinas.length > 0 && cantidadCodigos.length > 0) {
            const ctx = chartRef.current.getContext('2d');

            if (chartInstance) {
                chartInstance.destroy();
            }

            const newChartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: oficinas,
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
                            data: porcentajes,
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            borderColor: 'rgba(153, 102, 255, 1)',
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
                            },
                            grid: {
                                drawOnChartArea: false
                            }
                        }
                    }
                }
            });

            setChartInstance(newChartInstance);
        }
    }, [loading, oficinas, cantidadCodigos, porcentajes]);

    return (
        <div className="container">
            {loading ? (
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            ) : (
                <canvas ref={chartRef} />
            )}
        </div>
    );
};

export default RentasOficinasChart;
