import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ENV } from '../../Utils/API/Constants';

const IngresosRentaInicioChart = () => {
    const BASE_PATH = ENV.BASE_PATH;
    const routeCOIN = ENV.API_ROUTES.PeS938hjFqmXqk59uOIV8KnNDdyrqaUA9IPMklB7OBMhTLIkYjRNNkg9lfutOx;
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [ingresosDatosEsteAno, setIngresosDatosEsteAno] = useState({ meses: [], datos: [] });
    const [loading, setLoading] = useState(true);
    const token = Cookies.get('token');

    useEffect(() => {
        const url = `${BASE_PATH}${routeCOIN}`;
        axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        })
        .then(response => {
            const { ingresosEsteAno } = response.data;

            const datos = Array(12).fill(0);
            const meses = [
                'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
            ];

            ingresosEsteAno.forEach(item => {
                const mes = parseInt(item._id.split('-')[1], 10) - 1;
                datos[mes] = item.total;
            });

            setIngresosDatosEsteAno({
                meses: meses,
                datos: datos
            });
            setLoading(false);
        })
        .catch(error => {
            //console.error('Error al obtener los datos de ingresos:', error);
            setLoading(false);
        });
    }, [token]);

    useEffect(() => {
        if (!loading && ingresosDatosEsteAno.datos.length === 12) {
            const { meses, datos } = ingresosDatosEsteAno;

            if (!chartRef.current) {
                //console.error('Ref del canvas es nulo');
                return;
            }

            const ctx = chartRef.current.getContext('2d');

            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            chartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: meses,
                    datasets: [
                        {
                            label: 'Ingresos de Renta',
                            data: datos,
                            backgroundColor: 'rgba(0, 100, 0, 0.2)',
                            borderColor: '#006400',
                            borderWidth: 1,
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            type: 'logarithmic',
                            beginAtZero: true,
                            ticks: {
                                callback: function(value, index, values) {
                                    return value.toLocaleString();
                                }
                            }
                        }
                    }
                }
            });
        }
    }, [loading, ingresosDatosEsteAno]);

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

export default IngresosRentaInicioChart;
