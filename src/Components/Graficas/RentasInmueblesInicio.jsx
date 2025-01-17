import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ENV } from '../../Utils/API/Constants';

const RentasOficinasLineChart = () => {
    const BASE_PATH = ENV.BASE_PATH;
    const routeESPOME = ENV.API_ROUTES.ra4qhhL2lQwjSpXNp5dvivTm94c8uDmrlZqFBiOvxYHhvsIhIPlWaA1jXoVvJaHiYrzbPNPdDHVu7R89zIsN39jkPEs74;
    const chartRef = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);
    const [data, setData] = useState({ labels: [], datasets: [] });
    const token = Cookies.get('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `${BASE_PATH}${routeESPOME}`;
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `${token}`,
                    },
                });
                const { todosLosDatos } = response.data;
                
                const rawLabels = Object.keys(todosLosDatos[Object.keys(todosLosDatos)[0]] || {}).sort();
                const labels = rawLabels.map(label => {
                    const [year, month] = label.split('-');
                    const date = new Date(year, month - 1);
                    return date.toLocaleString('es-ES', { month: 'long' });
                });

                const inmuebles = Object.keys(todosLosDatos);

                const datasets = inmuebles.map((inmueble, index) => ({
                    label: inmueble,
                    data: labels.map(mes => {
                        // Buscando el valor de cada mes para cada inmueble
                        const monthIndex = rawLabels.findIndex(rawLabel => {
                            const [year, rawMonth] = rawLabel.split('-');
                            return mes === new Date(year, rawMonth - 1).toLocaleString('es-ES', { month: 'long' });
                        });
                        return todosLosDatos[inmueble][rawLabels[monthIndex]] || 0;
                    }),
                    borderColor: `rgba(${index * 50}, 99, 132, 1)`,
                    fill: false,
                }));

                setData({ labels, datasets });
            } catch (error) {
                //console.error('Error al obtener los datos:', error);
            }
        };

        fetchData();
    }, [token, BASE_PATH, routeESPOME]);

    useEffect(() => {
        if (chartInstance) {
            chartInstance.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        const newChartInstance = new Chart(ctx, {
            type: 'line',
            data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        setChartInstance(newChartInstance);

        return () => {
            if (newChartInstance) {
                newChartInstance.destroy();
            }
        };
    }, [data]);

    return <canvas ref={chartRef} />;
};

export default RentasOficinasLineChart;
