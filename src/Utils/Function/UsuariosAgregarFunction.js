import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Accordion, OverlayTrigger, Tooltip } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import Cookies from "js-cookie";
import { MdDeleteForever } from "react-icons/md";
import { ENV } from "../API/Constants";

export default function useAgregarUsuarios() {
    const BASE_PATH = ENV.BASE_PATH;
    const routeUSBUSADAP = ENV.API_ROUTES.aYTukpJhJPAYUi3rWgBtQjPEhxOBzTiROJAPE4sIuVTCppWBNDuXofPMvvemf8ZVwVmmJWAyMGdkH6IgaWVF2IWkly1sB;
    const routeUSCR = ENV.API_ROUTES.Qa9vFpKqi78bpSA0kOotbEPqwkyRUHXBdLC7ELMLHEGMfvegYzCXF3ckaooxz9DXyoxdoZZJKKfZzyAsr3HpjSBK9S;
    const routeUSAC = ENV.API_ROUTES.EeyUq9CtfW4WWU58KTJOxlnEphFHw3DT694MFPEygV6XyTHRMKyehRTEo7M57LzReozCJOX2uasfnRo7ZCp9Co12qJSfKR;
    const routeUSEL = ENV.API_ROUTES.t9FCQGbGr2D2j1SNUELLU6ATj4uQBcSeqonXy7NSLlc79AkWosLMfl3Y3oJE9m9Flp3aZNklY8CPCKP9PBqKxUjXFsFt18;
    const routeUSRE = ENV.API_ROUTES.sKDKOBiQ4xPq1OOmxhGqMMQ9u2o5gjxcJZxxIxrW8p9WH0VDIWGM2BHEbIYkRd9MfGhz3rCW3hoZvZjr2qudF4n9l2M;
    const token = Cookies.get('token');
    const usuarioRol = Cookies.get('rol');
    const [usuarios, setUsuarios] = useState([]);
    const [recepcionistas, setRecepcionistas] = useState([]);
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mensajeAlerta, setMensajeAlerta] = useState('');
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [formularioVisible, setFormularioVisible] = useState(false);
    const [valoresFormularioAgregar, setValoresFormularioAgregar] = useState({
        Nombre: '',
        Apellido_paterno: '',
        Apellido_materno: '',
        Area: '',
        Correo: '',
        Rol: '',
    });
    const [valoresFormularioEditar, setValoresFormularioEditar] = useState({
        Nombre: '',
        Apellido_paterno: '',
        Apellido_materno: '',
        Area: '',
        Correo: '',
        Rol: '',
    });

    const obtenerUsuarios = useCallback(() => {
        const url = `${BASE_PATH}${routeUSBUSADAP}`;
        axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        })
            .then((respuesta) => {
                setUsuarios(respuesta.data);
            })
            .catch((error) => {
                //console.error('Error al obtener los datos');
            });
    }, [token, BASE_PATH, routeUSBUSADAP]);

    const obtenerUsuariosRecepcionistas = useCallback(() => {
        const url = `${BASE_PATH}${routeUSRE}`;
        axios.get(url, {
            headers: {
                Authorization: `${token}`,
            },
        })
            .then((respuesta) => {
                setRecepcionistas(respuesta.data);
            })
            .catch((error) => {
                //console.error('Error al obtener los datos');
            });
    }, [token, BASE_PATH, routeUSRE]);

    useEffect(() => {
        if (token) {
            obtenerUsuariosRecepcionistas();
        }
    }, [token, obtenerUsuariosRecepcionistas]);

    useEffect(() => {
        if (token) {
            obtenerUsuarios();
        }
    }, [token, obtenerUsuarios]);

    const areas = {
        A: 'Administración',
        B: 'Recursos Humanos',
        C: 'Contabilidad',
        R: 'Recepción'
    };

    const rol = {
        AP: 'Administrador de apoyo',
        R: 'Recepcionista'
    }

    const manejarCambioInputAgregar = (e) => {
        const { name, value } = e.target;
        setValoresFormularioAgregar((valoresAnteriores) => ({
            ...valoresAnteriores,
            [name]: value,
        }));
    };

    const manejarCambioInputEditar = (e) => {
        const { name, value } = e.target;
        setValoresFormularioEditar((valoresAnteriores) => ({
            ...valoresAnteriores,
            [name]: value,
        }));
    };

    const enviarFormularioAgregar = (e) => {
        e.preventDefault();
        const { Nombre, Apellido_paterno, Apellido_materno, Correo, Area, Rol } = valoresFormularioAgregar;

        if (!Nombre || !Apellido_paterno || !Apellido_materno || !Correo || !Area || !Rol) {
            setMensajeAlerta('Por favor, complete todos los campos antes de guardar');
            setMostrarAlerta(true);
            setTimeout(() => setMostrarAlerta(false), 3000);
            return;
        }

        const nuevosDatos = {
            nombre: Nombre,
            apellido_paterno: Apellido_paterno,
            apellido_materno: Apellido_materno,
            correo: Correo,
            area: Area,
            rol: Rol,
        };

        const url = `${BASE_PATH}${routeUSCR}`;

        axios.post(url, nuevosDatos, {
            headers: {
                Authorization: `${token}`,
            },
        })
            .then(() => {
                obtenerUsuarios();
                obtenerUsuariosRecepcionistas();
                setValoresFormularioAgregar({
                    Nombre: '',
                    Apellido_paterno: '',
                    Apellido_materno: '',
                    Area: '',
                    Correo: '',
                    Rol: '',
                });
            })
            .catch(error => {
                //console.error('Error al enviar formulario');
                setMensajeAlerta('Error al enviar formulario');
                setMostrarAlerta(true);
                setTimeout(() => setMostrarAlerta(false), 5000);
            });
    };

    const editarUsuario = (e) => {
        e.preventDefault();
        if (!usuarioSeleccionado) return;

        const url = `${BASE_PATH}${routeUSAC}`;

        const datosEditados = {
            correoOriginal: usuarioSeleccionado.correo,
            nombre: valoresFormularioEditar.Nombre || usuarioSeleccionado.nombre,
            apellido_paterno: valoresFormularioEditar.Apellido_paterno || usuarioSeleccionado.apellido_paterno,
            apellido_materno: valoresFormularioEditar.Apellido_materno || usuarioSeleccionado.apellido_materno,
            area: valoresFormularioEditar.Area || usuarioSeleccionado.area,
            rol: valoresFormularioEditar.Rol || usuarioSeleccionado.rol,
        };

        axios.patch(url, datosEditados, {
            headers: {
                Authorization: `${token}`,
            },
        })
            .then(() => {
                setMensajeAlerta('Usuario editado correctamente');
                setMostrarAlerta(true);
                setTimeout(() => setMostrarAlerta(false), 5000);
                obtenerUsuarios();
                obtenerUsuariosRecepcionistas();
                setUsuarioSeleccionado(null);
                setFormularioVisible(false);
                setValoresFormularioEditar({
                    Nombre: '',
                    Apellido_paterno: '',
                    Apellido_materno: '',
                    Area: '',
                    Correo: '',
                    Rol: '',
                });
            })
            .catch(error => {
                //console.error('Error al editar el usuario');
                setMensajeAlerta('Error al editar el usuario');
                setMostrarAlerta(true);
                setTimeout(() => setMostrarAlerta(false), 5000);
            });
    };

    const eliminarUsuario = () => {
        if (!usuarioSeleccionado) return;

        const url = `${BASE_PATH}${routeUSEL}`;

        axios.delete(url, {
            headers: {
                Authorization: `${token}`,
            },
            data: { correo: usuarioSeleccionado.correo },
        })
            .then(response => {
                if (response.status === 200) {
                    setMensajeAlerta('Usuario eliminado correctamente');
                    setMostrarAlerta(true);
                    setTimeout(() => setMostrarAlerta(false), 5000);
                    obtenerUsuarios();
                    obtenerUsuariosRecepcionistas();
                    setUsuarioSeleccionado(null);
                    setFormularioVisible(false);
                } else {
                    setMensajeAlerta('Error al eliminar el usuario');
                    setMostrarAlerta(true);
                    setTimeout(() => setMostrarAlerta(false), 5000);
                }
            })
            .catch(error => {
                //console.error('Error al eliminar el usuario');
                setMensajeAlerta('Error al eliminar el usuario');
                setMostrarAlerta(true);
                setTimeout(() => setMostrarAlerta(false), 5000);
            });
    };

    const seleccionarUsuario = (usuario) => {
        if (usuarioSeleccionado && usuarioSeleccionado.correo === usuario.correo) {
            setUsuarioSeleccionado(null);
            setFormularioVisible(false);
        } else {
            setUsuarioSeleccionado(usuario);
            setValoresFormularioEditar({
                Nombre: usuario.nombre,
                Apellido_paterno: usuario.apellido_paterno,
                Apellido_materno: usuario.apellido_materno,
                Area: usuario.area,
                Correo: usuario.correo,
                Rol: usuario.rol,
            });
            setFormularioVisible(true);
        }
    };

    const renderizarElemento = () => {
        if (usuarioRol !== 'AP') {
            return (
                <Container fluid>
                    <Row className="my-3">
                        <Col xs={12} className="my-5">
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Agregar usuario</Accordion.Header>
                                    <Accordion.Body>
                                        <form onSubmit={enviarFormularioAgregar}>
                                            <Row>
                                                <Col md={4}>
                                                    <Form.Group className="my-3">
                                                        <Form.Control
                                                            id="Nombre"
                                                            name="Nombre"
                                                            placeholder="Nombre(s)"
                                                            value={valoresFormularioAgregar.Nombre}
                                                            onChange={manejarCambioInputAgregar}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={4}>
                                                    <Form.Group className="my-3">
                                                        <Form.Control
                                                            placeholder="Apellido paterno"
                                                            id="Apellido_paterno"
                                                            name="Apellido_paterno"
                                                            value={valoresFormularioAgregar.Apellido_paterno}
                                                            onChange={manejarCambioInputAgregar}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={4}>
                                                    <Form.Group className="my-3">
                                                        <Form.Control
                                                            placeholder="Apellido materno"
                                                            id="Apellido_materno"
                                                            name="Apellido_materno"
                                                            value={valoresFormularioAgregar.Apellido_materno}
                                                            onChange={manejarCambioInputAgregar}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={4}>
                                                    <Form.Group className="my-3">
                                                        <Form.Control
                                                            placeholder="Correo electrónico"
                                                            id="Correo"
                                                            name="Correo"
                                                            value={valoresFormularioAgregar.Correo}
                                                            onChange={manejarCambioInputAgregar}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={4} className="my-3">
                                                    <Form.Select
                                                        aria-label="Default select"
                                                        id="Area"
                                                        name="Area"
                                                        value={valoresFormularioAgregar.Area}
                                                        onChange={manejarCambioInputAgregar}
                                                    >
                                                        <option>Seleccionar área</option>
                                                        <option value="A">Administración</option>
                                                        <option value="C">Contabilidad</option>
                                                        <option value="R">Recepción</option>
                                                    </Form.Select>
                                                </Col>
                                                <Col md={4}>
                                                    <Form.Select
                                                        aria-label="Default select"
                                                        className="my-3"
                                                        id="Rol"
                                                        name="Rol"
                                                        value={valoresFormularioAgregar.Rol}
                                                        onChange={manejarCambioInputAgregar}
                                                    >
                                                        <option>Seleccionar rol</option>
                                                        <option value="A">Administrador</option>
                                                        <option value="AP">Administrador de apoyo</option>
                                                        <option value="R">Recepcionista</option>
                                                    </Form.Select>
                                                </Col>
                                            </Row>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <Button type="submit" style={{ width: '100%' }}>Agregar usuario</Button>
                                            </div>
                                        </form>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Col>
                        <Col md={12}>
                            <h3>Recepcionistas</h3>
                            {recepcionistas.length > 0 ? (
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Nombre(s)</th>
                                            <th>Apellido paterno</th>
                                            <th>Apellido Materno</th>
                                            <th>Área</th>
                                            <th>Rol</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recepcionistas.map(usuario => (
                                            <tr
                                                key={usuario.correo}
                                                onClick={() => seleccionarUsuario(usuario)}
                                                style={{
                                                    background: usuarioSeleccionado && usuarioSeleccionado.correo === usuario.correo ? '#d3d3d3' : 'transparent',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <td>{usuario.nombre}</td>
                                                <td>{usuario.apellido_paterno}</td>
                                                <td>{usuario.apellido_materno}</td>
                                                <td>{areas[usuario.area] || usuario.area}</td>
                                                <td>{rol[usuario.rol] || usuario.rol}</td>
                                                <td className="d-flex justify-content-center">
                                                    <OverlayTrigger
                                                        placement="top"
                                                        overlay={
                                                            <Tooltip id="tooltip-top">
                                                                Eliminar al usuario {usuario.nombre}
                                                            </Tooltip>
                                                        }
                                                    >
                                                        <button
                                                            style={{ background: usuarioSeleccionado && usuarioSeleccionado.correo === usuario.correo ? '#ff0000' : '#cccccc', border: 'none', borderRadius: '5px' }}
                                                            onClick={() => eliminarUsuario()}
                                                            disabled={!usuarioSeleccionado || usuarioSeleccionado.correo !== usuario.correo}
                                                        >
                                                            <MdDeleteForever style={{ color: '#FFFFFF', fontSize: '25px' }} />
                                                        </button>
                                                    </OverlayTrigger>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            ) : (
                                <p>No hay datos de recepcionistas disponibles.</p>
                            )}
                        </Col>

                        <Col md={12} className="my-4">
                            <h3>Administradores de Apoyo</h3>
                            {usuarios.length > 0 ? (
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Nombre(s)</th>
                                            <th>Apellido paterno</th>
                                            <th>Apellido Materno</th>
                                            <th>Área</th>
                                            <th>Rol</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {usuarios.map(usuario => (
                                            <tr
                                                key={usuario.correo}
                                                onClick={() => seleccionarUsuario(usuario)}
                                                style={{
                                                    background: usuarioSeleccionado && usuarioSeleccionado.correo === usuario.correo ? '#d3d3d3' : 'transparent',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <td>{usuario.nombre}</td>
                                                <td>{usuario.apellido_paterno}</td>
                                                <td>{usuario.apellido_materno}</td>
                                                <td>{areas[usuario.area] || usuario.area}</td>
                                                <td>{rol[usuario.rol] || usuario.rol}</td>
                                                <td className="d-flex justify-content-center">
                                                    <OverlayTrigger
                                                        placement="top"
                                                        overlay={
                                                            <Tooltip id="tooltip-top">
                                                                Eliminar al usuario {usuario.nombre}
                                                            </Tooltip>
                                                        }
                                                    >
                                                        <button
                                                            style={{ background: usuarioSeleccionado && usuarioSeleccionado.correo === usuario.correo ? '#ff0000' : '#cccccc', border: 'none', borderRadius: '5px' }}
                                                            onClick={() => eliminarUsuario()}
                                                            disabled={!usuarioSeleccionado || usuarioSeleccionado.correo !== usuario.correo}
                                                        >
                                                            <MdDeleteForever style={{ color: '#FFFFFF', fontSize: '25px' }} />
                                                        </button>
                                                    </OverlayTrigger>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            ) : (
                                <p>No hay datos de administradores de apoyo disponibles.</p>
                            )}
                        </Col>
                    </Row>
                    {formularioVisible && usuarioSeleccionado && (
                        <Row className="my-5">
                            <Col md={12}>
                                <h3>Editar usuario</h3>
                                <form onSubmit={editarUsuario}>
                                    <Row>
                                        <Col md={4}>
                                            <Form.Group className="my-3">
                                                <Form.Control
                                                    id="Nombre"
                                                    name="Nombre"
                                                    placeholder="Nombre(s)"
                                                    value={valoresFormularioEditar.Nombre}
                                                    onChange={manejarCambioInputEditar}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group className="my-3">
                                                <Form.Control
                                                    placeholder="Apellido paterno"
                                                    id="Apellido_paterno"
                                                    name="Apellido_paterno"
                                                    value={valoresFormularioEditar.Apellido_paterno}
                                                    onChange={manejarCambioInputEditar}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group className="my-3">
                                                <Form.Control
                                                    placeholder="Apellido materno"
                                                    id="Apellido_materno"
                                                    name="Apellido_materno"
                                                    value={valoresFormularioEditar.Apellido_materno}
                                                    onChange={manejarCambioInputEditar}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={4}>
                                            <Form.Group className="my-3">
                                                <Form.Control
                                                    placeholder="Correo electrónico"
                                                    id="Correo"
                                                    name="Correo"
                                                    value={valoresFormularioEditar.Correo}
                                                    onChange={manejarCambioInputEditar}
                                                    readOnly
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4} className="my-3">
                                            <Form.Select
                                                aria-label="Default select"
                                                id="Area"
                                                name="Area"
                                                value={valoresFormularioEditar.Area}
                                                onChange={manejarCambioInputEditar}
                                            >
                                                <option>Seleccionar área</option>
                                                <option value="A">Administración</option>
                                                <option value="C">Contabilidad</option>
                                                <option value="R">Recepción</option>
                                            </Form.Select>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Select
                                                aria-label="Default select"
                                                className="my-3"
                                                id="Rol"
                                                name="Rol"
                                                value={valoresFormularioEditar.Rol}
                                                onChange={manejarCambioInputEditar}
                                            >
                                                <option>Seleccionar rol</option>
                                                <option value="A">Administrador</option>
                                                <option value="AP">Administrador de apoyo</option>
                                                <option value="R">Recepcionista</option>
                                            </Form.Select>
                                        </Col>
                                        {mostrarAlerta && (
                                            <div className="contenedor-alerta">
                                                <div className="mensaje-alerta">{mensajeAlerta}</div>
                                            </div>
                                        )}
                                    </Row>
                                    <div className="d-flex align-items-center justify-content-center">
                                        <Button type="submit" style={{ width: '100%' }}>Guardar cambios</Button>
                                    </div>
                                </form>
                            </Col>
                        </Row>
                    )}
                </Container>
            );
        }
    }

    return {
        renderizarElemento,
    }
}