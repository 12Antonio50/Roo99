import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Container, Col, Row, Card, Table, Pagination, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { ENV } from '../../Utils/API/Constants';

const RentasOficinasChart = () => {
    const BASE_PATH = ENV.BASE_PATH;
    const routeCOPOME = ENV.API_ROUTES.knhWyU9pm2u22cKe5rentuIfVSJMPYbyZSpNz6caf2ggu5zfjTU7nOogByLj3lXwz1pYgzRIYM34vtDE6aTwDdsb86h1s4W;
    const chartRef = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [meses, setMeses] = useState([]);
    const [cantidadCodigos, setCantidadCodigos] = useState([]);
    const [porcentajeCodigos, setPorcentajeCodigos] = useState([]);
    const [tablaDatos, setTablaDatos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const token = Cookies.get('token');

    useEffect(() => {
        const url = `${BASE_PATH}${routeCOPOME}`;
        axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        })
            .then(response => {
                const { codigosPorMes, codigosPorMesConPorcentaje } = response.data;

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
                setTablaDatos(codigosPorMes.flatMap(item => item.detalles));
                setLoading(false);
            })
            .catch(error => {
                //console.error('Error al obtener los datos:', error);
                setLoading(false);
            });
    }, [token]);

    useEffect(() => {
        if (!loading && meses.length) {
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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = tablaDatos.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(tablaDatos.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const paginationItems = [];
    for (let i = 1; i <= totalPages; i++) {
        paginationItems.push(
            <Pagination.Item key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
                {i}
            </Pagination.Item>
        );
    }

    const exportToExcel = async () => {
        try {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Datos de códigos');

            // Estilo para los encabezados
            worksheet.columns = [
                { header: 'Código', key: 'codigo', width: 15 },
                { header: 'Fecha de inicio', key: 'fechaInicio', width: 20 },
                { header: 'Fecha Fin', key: 'fechaFin', width: 20 },
                { header: 'Hora de inicio', key: 'horaInicio', width: 15 },
                { header: 'Hora de fin', key: 'horaFin', width: 15 },
                { header: 'Días de renta', key: 'diasRenta', width: 20 },
                { header: 'Estado', key: 'estado', width: 15 },
                { header: 'Mes', key: 'mes', width: 15 },
                { header: 'Número de Códigos', key: 'numCodigos', width: 20 },
                { header: 'Porcentaje', key: 'porcentaje', width: 15 },
            ];

            worksheet.getRow(1).font = { bold: true };
            worksheet.getRow(1).alignment = { horizontal: 'center' };

            tablaDatos.forEach(item => {
                worksheet.addRow({
                    codigo: item.codigo || 'N/A',
                    fechaInicio: new Date(item.fechaGeneracion).toLocaleDateString() || 'N/A',
                    fechaFin: item.diasRenta.length > 0 ? new Date(item.diasRenta[0]).toLocaleDateString() : 'No disponible',
                    horaInicio: item.horaInicio || 'No disponible',
                    horaFin: item.horaFin || 'No disponible',
                    diasRenta: item.diasRenta.length > 0 ? new Date(item.diasRenta[item.diasRenta.length - 1]).toLocaleDateString() : 'No disponible',
                    estado: item.estado ? 'Pagado' : 'Pendiente',
                    mes: meses[new Date(item.fechaGeneracion).getMonth()],
                    numCodigos: cantidadCodigos[new Date(item.fechaGeneracion).getMonth()],
                    porcentaje: porcentajeCodigos[new Date(item.fechaGeneracion).getMonth()]
                });
            });

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = chartRef.current.width;
            canvas.height = chartRef.current.height;
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(chartRef.current, 0, 0);
            const imageBase64 = canvas.toDataURL('image/png');

            const imageId = workbook.addImage({
                base64: imageBase64,
                extension: 'png',
            });
            worksheet.addImage(imageId, 'J1:T20');

            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            saveAs(blob, 'datos-codigos.xlsx');
        } catch (error) {
            //console.error('Error al exportar a Excel:', error);
        }
    };

    return (
        <Container fluid>
            <Row className="my-3">
                <Col xs={12}>
                    {loading ? (
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        <>
                            <Row className="my-3">
                                <Col xs={12} md={5}>
                                    <canvas ref={chartRef} />
                                </Col>
                                <Col xs={12} md={7}>
                                    <Card className="mb-3">
                                        <Card.Body>
                                            <Table responsive>
                                                <thead>
                                                    <tr>
                                                        <th>Códigos</th>
                                                        <th>Fecha de generación</th>
                                                        <th>Fecha inicio</th>
                                                        <th>Fecha fin</th>
                                                        <th>Hora de inicio</th>
                                                        <th>Horas fin</th>
                                                        <th>Estado</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentItems.length > 0 ? (
                                                        currentItems.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{item.codigo}</td>
                                                                <td>{new Date(item.fechaGeneracion).toLocaleDateString()}</td>
                                                                <td>{item.diasRenta.length > 0 ? new Date(item.diasRenta[0]).toLocaleDateString() : 'No disponible'}</td>
                                                                <td>{item.diasRenta.length > 0 ? new Date(item.diasRenta[item.diasRenta.length - 1]).toLocaleDateString() : 'No disponible'}</td>
                                                                <td>{item.horaInicio || 'No disponible'}</td>
                                                                <td>{item.horaFin || 'No disponible'}</td>
                                                                <td>{item.estado ? 'Pagado' : 'Pendiente'}</td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="7" className="text-center">No hay datos disponibles</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </Table>
                                            <div className='d-flex justify-content-center'>
                                                <Pagination>
                                                    {paginationItems}
                                                </Pagination>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <div className='d-flex justify-content-center'>
                                <OverlayTrigger
                                    placement='top'
                                    overlay={
                                        <Tooltip id='tooltip-top'>
                                            Descargar en Excel
                                        </Tooltip>
                                    }
                                >
                                    <Button style={{ background: "green", color: "white", fontSize: '20px' }} onClick={exportToExcel}>
                                        <PiMicrosoftExcelLogoFill />
                                    </Button>
                                </OverlayTrigger>
                            </div>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default RentasOficinasChart;
