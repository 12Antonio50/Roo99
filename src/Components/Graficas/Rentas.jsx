import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Container, Col, Row, Card, Table, Pagination, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { ENV } from '../../Utils/API/Constants';

const RentasOficinasCharts = () => {
    const BASE_PATH = ENV.BASE_PATH;
    const routeOFPOCO = ENV.API_ROUTES.N6MkHCw9HvrttEOsTcc1xa3Eum6d4jkMg9OSyEgayUryFVy4PTbVaFm1OY10SmoQ4zhaSTzRDrkMC39w8MOBUI2HER5irB;
    const chartRefBar = useRef(null);
    const chartRefLine = useRef(null);
    const [chartInstanceBar, setChartInstanceBar] = useState(null);
    const [chartInstanceLine, setChartInstanceLine] = useState(null);
    const [loading, setLoading] = useState(true);
    const [oficinas, setOficinas] = useState([]);
    const [dataLine, setDataLine] = useState({ labels: [], datasets: [] });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const token = Cookies.get('token');

    useEffect(() => {
        const url = `${BASE_PATH}${routeOFPOCO}`;
        axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        })
            .then(response => {
                const oficinasData = response.data;
                if (Array.isArray(oficinasData) && oficinasData.length > 0) {
                    setOficinas(oficinasData);
                } else {
                    //console.warn('No se encontraron oficinas en los datos de respuesta.');
                }
                setLoading(false);
            })
            .catch(error => {
                //console.error('Error al obtener los datos:', error);
                setLoading(false);
            });
    }, [token]);

    useEffect(() => {
        if (!loading && oficinas.length > 0) {
            const ctxBar = chartRefBar.current.getContext('2d');
            if (chartInstanceBar) {
                chartInstanceBar.destroy();
            }
            const newChartInstanceBar = new Chart(ctxBar, {
                type: 'bar',
                data: {
                    labels: oficinas.map(oficina => oficina.nombre),
                    datasets: [
                        {
                            label: 'Número de Códigos',
                            data: oficinas.map(oficina => oficina.cantidadCodigos || 0),
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Porcentaje de Códigos',
                            data: oficinas.map(oficina => oficina.porcentaje || 0),
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
            setChartInstanceBar(newChartInstanceBar);
        }
    }, [loading, oficinas]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/API/v1/espacio/porcentaje/mes', {
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
                        const monthIndex = rawLabels.findIndex(rawLabel => {
                            const [year, rawMonth] = rawLabel.split('-');
                            return mes === new Date(year, rawMonth - 1).toLocaleString('es-ES', { month: 'long' });
                        });
                        return todosLosDatos[inmueble][rawLabels[monthIndex]] || 0;
                    }),
                    borderColor: `rgba(${index * 50}, 99, 132, 1)`,
                    fill: false,
                }));

                setDataLine({ labels, datasets });
            } catch (error) {
                //console.error('Error al obtener los datos:', error);
            }
        };

        fetchData();
    }, [token]);

    useEffect(() => {
        if (dataLine.labels.length > 0) {
            const ctxLine = chartRefLine.current.getContext('2d');
            if (chartInstanceLine) {
                chartInstanceLine.destroy();
            }
            const newChartInstanceLine = new Chart(ctxLine, {
                type: 'line',
                data: dataLine,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
            setChartInstanceLine(newChartInstanceLine);
        }
    }, [dataLine]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const allItems = oficinas.flatMap(oficina => (oficina.detallesCodigos || []).map(codigo => ({
        ...codigo,
        oficinaNombre: oficina.nombre,
        oficinaTipoEspacio: oficina.tipoEspacio || 'N/A',
        oficinaPaqueteBasico: oficina.paqueteBasico || 'N/A',
        oficinaPaqueteIntermedio: oficina.paqueteIntermedio || 'N/A',
        oficinaPaquetePremium: oficina.paquetePremium || 'N/A'
    })));
    const currentItems = allItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(allItems.length / itemsPerPage);

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
            const worksheet = workbook.addWorksheet('Datos de oficina');

            worksheet.addRow([
                'Espacio',
                'Tipo de espacio',
                'Paquete básico',
                'Paquete Intermedio',
                'Paquete Premium',
                'Código',
                'Paquete seleccionado',
                'Precio total',
            ]);

            allItems.forEach(item => {
                worksheet.addRow([
                    item.oficinaNombre || 'N/A',
                    item.oficinaTipoEspacio || 'N/A',
                    item.oficinaPaqueteBasico || 'N/A',
                    item.oficinaPaqueteIntermedio || 'N/A',
                    item.oficinaPaquetePremium || 'N/A',
                    item.codigo || 'N/A',
                    item.paqueteSeleccionado || 'N/A',
                    item.precioTotal || 'N/A',
                ]);
            });

            worksheet.columns.forEach(column => {
                column.width = 20;
            });

            const canvasBar = document.createElement('canvas');
            const ctxBar = canvasBar.getContext('2d');
            canvasBar.width = chartRefBar.current.width;
            canvasBar.height = chartRefBar.current.height;
            ctxBar.fillStyle = 'white';
            ctxBar.fillRect(0, 0, canvasBar.width, canvasBar.height);
            ctxBar.drawImage(chartRefBar.current, 0, 0);
            const imageBase64Bar = canvasBar.toDataURL('image/png');

            const canvasLine = document.createElement('canvas');
            const ctxLine = canvasLine.getContext('2d');
            canvasLine.width = chartRefLine.current.width;
            canvasLine.height = chartRefLine.current.height;
            ctxLine.fillStyle = 'white';
            ctxLine.fillRect(0, 0, canvasLine.width, canvasLine.height);
            ctxLine.drawImage(chartRefLine.current, 0, 0);
            const imageBase64Line = canvasLine.toDataURL('image/png');

            const imageIdBar = workbook.addImage({
                base64: imageBase64Bar,
                extension: 'png',
            });

            const imageIdLine = workbook.addImage({
                base64: imageBase64Line,
                extension: 'png',
            });

            worksheet.addImage(imageIdBar, 'J1:O20');
            worksheet.addImage(imageIdLine, 'P1:U20');

            const buffer = await workbook.xlsx.writeBuffer();
            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'datos_oficina.xlsx');
        } catch (error) {
            //console.error('Error al exportar a Excel:', error);
        }
    };

    return (
        <Container fluid>
            <Row className="my-3">
                <Col md={6}>
                    {loading ? (
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        <canvas ref={chartRefBar} />
                    )}
                </Col>
                <Col md={6}>
                    {dataLine.labels.length === 0 ? (
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        <canvas ref={chartRefLine} />
                    )}
                </Col>
            </Row>
            <Row className="my-3">
                <Col xs={12}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Espacio</th>
                                        <th>Tipo de espacio</th>
                                        <th>Paquete básico</th>
                                        <th>Paquete Intermedio</th>
                                        <th>Paquete Premium</th>
                                        <th>Código</th>
                                        <th>Paquete seleccionado</th>
                                        <th>Precio total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.length > 0 && currentItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.oficinaNombre}</td>
                                            <td>{item.oficinaTipoEspacio || 'N/A'}</td>
                                            <td>{item.oficinaPaqueteBasico || 'N/A'}</td>
                                            <td>{item.oficinaPaqueteIntermedio || 'N/A'}</td>
                                            <td>{item.oficinaPaquetePremium || 'N/A'}</td>
                                            <td>{item.codigo || 'N/A'}</td>
                                            <td>{item.paqueteSeleccionado || 'N/A'}</td>
                                            <td>{item.precioTotal || 'N/A'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <div className='d-flex justify-content-center'>
                                <Pagination>{paginationItems}</Pagination>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <div className='d-flex justify-content-center'>
                <OverlayTrigger
                    placement="top"
                    overlay={
                        <Tooltip id="tooltip-top">
                            Descargar en Excel
                        </Tooltip>
                    }
                >
                    <Button style={{ background: "green", color: "white", fontSize: '20px' }} onClick={exportToExcel}>
                        <PiMicrosoftExcelLogoFill />
                    </Button>
                </OverlayTrigger>
            </div>
        </Container>
    );
};

export default RentasOficinasCharts;
