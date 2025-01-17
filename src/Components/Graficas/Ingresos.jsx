import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Container, Col, Row, Card, Table, Pagination, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { ENV } from '../../Utils/API/Constants';


const IngresosRentaConTabla = () => {
    const BASE_PATH = ENV.BASE_PATH;
    const routeCOIN = ENV.API_ROUTES.PeS938hjFqmXqk59uOIV8KnNDdyrqaUA9IPMklB7OBMhTLIkYjRNNkg9lfutOx;
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [ingresosDatosEsteAno, setIngresosDatosEsteAno] = useState({ meses: [], datos: [] });
    const [tablaDatos, setTablaDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const token = Cookies.get('token');

    useEffect(() => {
        const url = `${BASE_PATH}${routeCOIN}`;
        axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        })
            .then(response => {
                //console.log('Datos de respuesta:', response.data);
                const { ingresosEsteAno } = response.data;

                const datos = Array(12).fill(0);
                const meses = [
                    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
                ];

                // Prepara los datos para la tabla
                const tablaDatos = [];

                ingresosEsteAno.forEach(item => {
                    const mes = parseInt(item._id.split('-')[1], 10) - 1;
                    datos[mes] = item.total;

                    // Agrega los detalles de los códigos para la tabla
                    if (Array.isArray(item.detalles)) {
                        item.detalles.forEach(codigo => {
                            tablaDatos.push({
                                codigo: codigo.codigo || 'No disponible',
                                paquete: codigo.paquete || 'No disponible',
                                precio: codigo.precio || 0,
                                precioTotal: codigo.precioTotal || 0,
                                diasRenta: codigo.diasRenta ? new Date(codigo.diasRenta).toLocaleDateString() : 'No disponible',
                                horasRenta: codigo.horasRenta || 0
                            });
                        });
                    }
                });

                setIngresosDatosEsteAno({
                    meses: meses,
                    datos: datos
                });
                setTablaDatos(tablaDatos);
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
                                callback: function (value) {
                                    return value.toLocaleString();
                                }
                            }
                        }
                    }
                }
            });
        }
    }, [loading, ingresosDatosEsteAno]);

    // Calcular la paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = tablaDatos.slice(indexOfFirstItem, indexOfLastItem);

    // Manejar cambio de página
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calcular los números de página
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(tablaDatos.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const exportToExcel = async () => {
        try {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Ingresos de Renta');

            // Estilo para los encabezados
            worksheet.columns = [
                { header: 'Código', key: 'codigo', width: 15 },
                { header: 'Paquete', key: 'paquete', width: 15 },
                { header: 'Precio', key: 'precio', width: 15 },
                { header: 'Fecha de Generación', key: 'diasRenta', width: 20 },
            ];

            worksheet.getRow(1).font = { bold: true };
            worksheet.getRow(1).alignment = { horizontal: 'center' };

            // Agregar los datos de la tabla
            tablaDatos.forEach(item => {
                worksheet.addRow({
                    codigo: item.codigo || 'N/A',
                    paquete: item.paquete || 'N/A',
                    precio: item.precio || 0,
                    diasRenta: item.diasRenta || 'N/A',
                });
            });

            // Crear un canvas para la imagen del gráfico
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = chartRef.current.width;
            canvas.height = chartRef.current.height;
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Dibujar la gráfica en el canvas
            ctx.drawImage(chartRef.current, 0, 0);
            const imageBase64 = canvas.toDataURL('image/png');

            // Agregar la imagen al archivo Excel
            const imageId = workbook.addImage({
                base64: imageBase64,
                extension: 'png',
            });
            worksheet.addImage(imageId, 'H1:M20');

            // Escribir el archivo Excel
            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            saveAs(blob, 'ingresos-renta.xlsx');
        } catch (error) {
            //console.error('Error al exportar a Excel:', error);
        }
    };

    return (
        <Container fluid>
            <Row className="my-3">
                <Col xs={12}>
                    <Card className="mb-3">
                        <Card.Body>
                            {loading ? (
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            ) : (
                                <>
                                    <Row className="my-3">
                                        <Col xs={12} md={6}>
                                            <canvas ref={chartRef} />
                                        </Col>
                                        <Col xs={12} md={6}>
                                            <Card className="mb-3">
                                                <Card.Body>
                                                    <Table responsive>
                                                        <thead>
                                                            <tr>
                                                                <th>Código</th>
                                                                <th>Paquete</th>
                                                                <th>Precio</th>
                                                                <th>Fecha de Generación</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {currentItems.length > 0 ? (
                                                                currentItems.map((item, index) => (
                                                                    <tr key={index}>
                                                                        <td>{item.codigo}</td>
                                                                        <td>{item.paquete}</td>
                                                                        <td>{item.precio}</td>
                                                                        <td>{item.diasRenta}</td>
                                                                    </tr>
                                                                ))
                                                            ) : (
                                                                <tr>
                                                                    <td colSpan="6" className="text-center">No hay datos disponibles</td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </Table>
                                                    <div className='d-flex justify-content-center'>
                                                        <Pagination>
                                                            {pageNumbers.map(number => (
                                                                <Pagination.Item
                                                                    key={number}
                                                                    active={number === currentPage}
                                                                    onClick={() => handlePageChange(number)}
                                                                >
                                                                    {number}
                                                                </Pagination.Item>
                                                            ))}
                                                        </Pagination>
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
                                </>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default IngresosRentaConTabla;
