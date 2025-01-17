import React from "react";
import Menu from "../../Components/Acciones/Menu";
import { Container, Col, Row, Card, Form, InputGroup, Button, Modal } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import { MdAdd } from "react-icons/md";
import Cookies from "js-cookie";
import useCrearInmueble from "../../Utils/Function/InmuebleFuncion";
import useCrearEspacio from "../../Utils/Function/EspacioFuncion";
import Acciones from "../../Components/Acciones/Acciones";

const EditarEspacios = () => {
    const {
        alternarModal,
        enviarFormulario,
        manejarCambioInput,
        editarInmueble,
        eliminarInmueble,
        setTextoBoton,
        limpiarFormulario,
        setOpcionSeleccionada,
        setColorBoton,
        setValorFormulario,
        setOficinas,
        setNombreInmuebleSeleccionado,
        setInmuebleSeleccionadoFormulario,
        valorFormulario,
        inmuebles,
        modalAbierto,
        mostrarAlerta,
        mensajeAlerta,
        nombreInmuebleSeleccionado,
        opcionSeleccionada,
        oficinas,
        textoBoton,
        estiloButton,
    } = useCrearInmueble();

    const {
        manejarSeleccionInmuebleOficina,
        limpiarFormularioEspacio,
        manejarCambioInputOficina,
        enviarFormularioOficina,
        alternarModalOficina,
        editarOficina,
        eliminarOficina,
        manejarCambioImagen,
        eliminarImagen,
        eliminarImagenExistente,
        modalAbiertoOficina,
        nombreInmuebleSeleccionadoOficina,
        valorFormularioOficina,
        mostrarAlertaOficina,
        mensajeAlertaOficina,
        oficina,
        isLoading,
        setNombreInmuebleSeleccionadoOficina
    } = useCrearEspacio();

    const manejarSeleccionAccion = (e) => {
        const opcionSeleccionada = e.target.value;

        if (opcionSeleccionada === "1") {
            setNombreInmuebleSeleccionado("default");
            limpiarFormulario();
            setNombreInmuebleSeleccionadoOficina("default");
            limpiarFormularioEspacio();
        } else if (opcionSeleccionada === "3") {
            //limpiarFormulario();
        }

        setOpcionSeleccionada(opcionSeleccionada);

        switch (opcionSeleccionada) {
            case '1':
                setTextoBoton("Agregar nuevo");
                setColorBoton("success");
                break;
            case '2':
                setTextoBoton("Editar");
                setColorBoton("warning");
                break;
            case '3':
                setTextoBoton("Eliminar");
                setColorBoton("danger");
                break;
            default:
                setTextoBoton("Selecciona una acción");
                setColorBoton("#007bff");
        }
    };

    const manejarSeleccionInmueble = (e) => {
        const nombreInmuebleSeleccionado = e.target.value;

        if (!nombreInmuebleSeleccionado || nombreInmuebleSeleccionado === "default") {
            limpiarFormulario();
            setInmuebleSeleccionadoFormulario('');
            setNombreInmuebleSeleccionado("default");
            limpiarFormularioEspacio();
            setNombreInmuebleSeleccionadoOficina("default");
            setOficinas([]);
            return;
        }

        const inmuebleSeleccionado = inmuebles.find((inmueble) => {
            return inmueble.nombre === nombreInmuebleSeleccionado;
        });

        if (inmuebleSeleccionado) {
            setValorFormulario({
                ...valorFormulario,
                NombreOriginal: inmuebleSeleccionado.nombre,
                NombreCambio: '',
                Nombre: inmuebleSeleccionado.nombre,
                Direccion: inmuebleSeleccionado.direccion,
                MetrosCuadrados: inmuebleSeleccionado.metrosCuadrados,
                Descripcion: inmuebleSeleccionado.descripcion,
            });

            setNombreInmuebleSeleccionado(nombreInmuebleSeleccionado);

            setOficinas(inmuebleSeleccionado.oficina || []);
        } else {
            limpiarFormulario();
        }

        setInmuebleSeleccionadoFormulario(nombreInmuebleSeleccionado);
    };

    const usuarioRol = Cookies.get('rol');

    const renderizarOpcionEliminar = () => {
        if (usuarioRol !== 'AP') {
            return (
                <option value="3">Eliminar</option>
            );
        }
    }

    const estiloTitulo = {
        backgroundColor: "#f0f0f0",
        color: "#000",
        padding: "20px",
        borderRadius: "5px",
        height: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.5rem",
        fontWeight: "bold",
        marginBottom: "10px"
    };

    const estiloFormLabel = {
        color: '#000'
    };

    const renderFormulario = (opcion, valores, manejarCambio, readOnly = false) => {
        return (
            <div>
                <Form.Group>
                    <Form.Label style={estiloFormLabel}>Nombre del inmueble</Form.Label>
                    <Form.Control
                        placeholder="Nombre"
                        name="Nombre"
                        value={valores.Nombre}
                        onChange={manejarCambio}
                        readOnly={readOnly}
                    />
                </Form.Group>
                <Form.Group className="my-3">
                    <Form.Label style={estiloFormLabel}>Metros cuadrados del inmueble</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type="number"
                            placeholder="Metros cuadrados"
                            name="MetrosCuadrados"
                            value={valores.MetrosCuadrados}
                            onChange={manejarCambio}
                            readOnly={readOnly}
                            min={1}
                        />
                        <InputGroup.Text>m²</InputGroup.Text>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="my-3">
                    <Form.Label style={estiloFormLabel}>Ubicación del espacio</Form.Label>
                    <Form.Select
                        aria-label="Seleccionar Acción"
                        className="config-select"
                        name="Direccion"
                        value={valores.Direccion}
                        onChange={manejarCambio}
                        readOnly={readOnly}
                    >
                        <option value="">Selecciona una ubicación</option>
                        <option value="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.6185896169004!2d-99.1715648253263!3d19.428878840800802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff4a8b03ffff%3A0xd1d9ebc31951c505!2sC.%20R%C3%ADo%20Tiber%20103-Int.%20201%20y%20202%2C%20Cuauht%C3%A9moc%2C%2006500%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses-419!2smx!4v1724700677326!5m2!1ses-419!2smx">Río Tíber #103</option>
                        <option value="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.392887657073!2d-99.15971602532618!3d19.438620440489636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f8ce04433511%3A0xf0bb7e7066930aa0!2sTomas%20Alva%20Edison%20149-Int.%20201%20y%20202%2C%20San%20Rafael%2C%20Cuauht%C3%A9moc%2C%2006470%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses-419!2smx!4v1724699872833!5m2!1ses-419!2smx">Tomas Alva Edison #149</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label style={estiloFormLabel}>Descripción del inmueble</Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder="Descripción general"
                        rows={3}
                        name="Descripcion"
                        value={valores.Descripcion}
                        onChange={manejarCambio}
                        readOnly={readOnly}
                    />
                </Form.Group>
            </div>
        );
    };
    const renderFormularioOficina = (opcion, valores, manejarCambio, readOnly = false) => {
        return (
            <div>
                <Row>
                    <Col xs={12} sm={6} md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label style={estiloFormLabel}>Nombre del espacio</Form.Label>
                            <Form.Control
                                placeholder="Nombre"
                                name="Nombre"
                                value={valores.Nombre}
                                onChange={manejarCambio}
                                readOnly={readOnly}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label style={estiloFormLabel}>Tipo de espacio</Form.Label>
                            <Form.Control
                                placeholder="Tipo"
                                name="TipoEspacio"
                                value={valores.TipoEspacio}
                                onChange={manejarCambio}
                                readOnly={readOnly}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={6} md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label style={estiloFormLabel}>Número máximo</Form.Label>
                            <Form.Control
                                placeholder="Integrantes maximos"
                                type="Number"
                                name="NumeroMaximoIntegrantes"
                                value={valores.NumeroMaximoIntegrantes}
                                onChange={manejarCambio}
                                readOnly={readOnly}
                                min={1}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                {opcion === "2" && (
                    <Form.Group className="mb-3">
                        <Form.Label style={estiloFormLabel}>Nuevo nombre del espacio</Form.Label>
                        <Form.Control
                            placeholder="Nombre cambio"
                            name="NombreCambio"
                            value={valores.NombreCambio || ""}
                            onChange={manejarCambio}
                            readOnly={readOnly}
                        />
                    </Form.Group>
                )}
                <Form.Group className="mb-3">
                    <Form.Label style={estiloFormLabel}>Costos y m²</Form.Label>
                    <Row>
                        <Col xs={12} sm={6} md={6} className="mb-3">
                            <InputGroup>
                                <InputGroup.Text>$</InputGroup.Text>
                                <Form.Control
                                    type="number"
                                    placeholder="Básico"
                                    name="CostoBasico"
                                    value={valores.CostoBasico}
                                    onChange={manejarCambio}
                                    readOnly={readOnly}
                                    min={1}
                                />
                                <InputGroup.Text>Pesos</InputGroup.Text>
                            </InputGroup>
                        </Col>
                        <Col xs={12} sm={6} md={6} className="mb-3">
                            <InputGroup>
                                <InputGroup.Text>$</InputGroup.Text>
                                <Form.Control
                                    type="number"
                                    placeholder="Intermedio"
                                    name="CostoIntermedio"
                                    value={valores.CostoIntermedio}
                                    onChange={manejarCambio}
                                    readOnly={readOnly}
                                    min={1}
                                />
                                <InputGroup.Text>Pesos</InputGroup.Text>
                            </InputGroup>
                        </Col>
                        <Col xs={12} sm={6} md={6} className="mb-3">
                            <InputGroup>
                                <InputGroup.Text>$</InputGroup.Text>
                                <Form.Control
                                    type="number"
                                    placeholder="Premium"
                                    name="CostoPremium"
                                    value={valores.CostoPremium}
                                    onChange={manejarCambio}
                                    readOnly={readOnly}
                                    min={1}
                                />
                                <InputGroup.Text>Pesos</InputGroup.Text>
                            </InputGroup>
                        </Col>
                        <Col xs={12} sm={6} md={6}>
                            <Form.Group className="mb-3">
                                <InputGroup>
                                    <Form.Control
                                        type="number"
                                        placeholder="Metros cuadrados"
                                        name="MetrosCuadrados"
                                        value={valores.MetrosCuadrados}
                                        onChange={manejarCambio}
                                        readOnly={readOnly}
                                        min={1}
                                    />
                                    <InputGroup.Text>m²</InputGroup.Text>
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form.Group>
                {opcion === "1" && (
                    <Form.Group className="mb-3">
                        <Form.Label style={estiloFormLabel}>Inmueble</Form.Label>
                        <Form.Select
                            aria-label="Seleccionar Inmueble"
                            onChange={manejarSeleccionInmuebleOficina}
                            value={nombreInmuebleSeleccionadoOficina}
                            readOnly={readOnly}
                        >
                            <option value="default">Selecciona un inmueble</option>
                            {inmuebles.map((inmueble) => (
                                <option key={inmueble._id} value={inmueble.nombre}>
                                    {inmueble.nombre}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                )}
                <Form.Group className="mb-3">
                    <Form.Label style={estiloFormLabel}>Ubicación del espacio</Form.Label>
                    <Form.Select
                        aria-label="Seleccionar Acción"
                        className="config-select"
                        name="Ubicacion"
                        value={valores.Ubicacion}
                        onChange={manejarCambio}
                        readOnly={readOnly}
                    >
                        <option value="">Selecciona una ubicación</option>
                        <option value="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.6185896169004!2d-99.1715648253263!3d19.428878840800802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff4a8b03ffff%3A0xd1d9ebc31951c505!2sC.%20R%C3%ADo%20Tiber%20103-Int.%20201%20y%20202%2C%20Cuauht%C3%A9moc%2C%2006500%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses-419!2smx!4v1724700677326!5m2!1ses-419!2smx">Río Tíber #103</option>
                        <option value="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.392887657073!2d-99.15971602532618!3d19.438620440489636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f8ce04433511%3A0xf0bb7e7066930aa0!2sTomas%20Alva%20Edison%20149-Int.%20201%20y%20202%2C%20San%20Rafael%2C%20Cuauht%C3%A9moc%2C%2006470%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses-419!2smx!4v1724699872833!5m2!1ses-419!2smx">Tomas Alva Edison #149</option>
                    </Form.Select>
                </Form.Group>
                <Row>
                    <Col xs={12} md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label style={estiloFormLabel}>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Descripción general"
                                rows={3}
                                name="Descripcion"
                                value={valores.Descripcion}
                                onChange={manejarCambio}
                                readOnly={readOnly}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label style={estiloFormLabel}>Características</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Características"
                                rows={3}
                                name="Caracteristicas"
                                value={Array.isArray(valores.Caracteristicas) ? valores.Caracteristicas.join('\n') : ''}
                                onChange={manejarCambio}
                                readOnly={readOnly}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label style={estiloFormLabel}>Servicios</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Servicios"
                                rows={3}
                                name="Servicios"
                                value={Array.isArray(valores.Servicios) ? valores.Servicios.join('\n') : ''}
                                onChange={manejarCambio}
                                readOnly={readOnly}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </div>
        );
    };

    return (
        <>
            <div style={{ position: 'sticky', top: '0', zIndex: '1000', backgroundColor: '#FFFFFF' }}>
                <Menu />
            </div>

            <Container className="config-section">
                <Row>
                    <Col md={12} style={estiloTitulo}>
                        Configuración
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <div className="config-title">Acciones</div>
                        <Form.Select
                            aria-label="Seleccionar Acción"
                            onChange={manejarSeleccionAccion}
                            className="config-select"
                        >
                            <option value="">Selecciona una acción</option>
                            <option value="1">Agregar nuevo</option>
                            <option value="2">Editar</option>
                            {renderizarOpcionEliminar()}
                        </Form.Select>
                    </Col>
                    <Col md={4}>
                        <div className="config-title">Inmuebles</div>
                        <Form.Select
                            aria-label="Seleccionar Inmueble"
                            onChange={manejarSeleccionInmueble}
                            value={nombreInmuebleSeleccionado}
                            className="config-select"
                        >
                            <option value="default">Selecciona un inmueble</option>
                            {inmuebles.length > 0 ? (
                                inmuebles.map((inmueble) => (
                                    <option key={inmueble._id} value={inmueble.nombre}>
                                        {inmueble.nombre}
                                    </option>
                                ))
                            ) : (
                                <option>No hay inmuebles creados</option>
                            )}

                        </Form.Select>
                    </Col>
                    <Col md={4}>
                        <div className="config-title">Oficinas</div>
                        <Form.Select
                            aria-label="Seleccionar Oficina"
                            value={nombreInmuebleSeleccionadoOficina}
                            onChange={manejarSeleccionInmuebleOficina}
                            className="config-select"
                        >
                            <option value="default">Selecciona una opción</option>
                            {oficinas.length > 0 ? (
                                oficinas.map((nombreOficina, index) => (
                                    <option key={index} value={nombreOficina}>
                                        {nombreOficina}
                                    </option>
                                ))
                            ) : (
                                <option>No hay oficinas disponibles</option>
                            )}
                        </Form.Select>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row>
                    <Col md={12} className="my-4">
                        <Row>
                            <Col md={6} className="h-100">
                                {["1", "2", "3"].includes(opcionSeleccionada) &&
                                    renderFormulario(opcionSeleccionada, valorFormulario, manejarCambioInput, opcionSeleccionada === "3")
                                }
                                <Button style={estiloButton} onClick={() => alternarModal(true)}>
                                    {textoBoton}
                                </Button>

                                {mostrarAlerta && (
                                    <div className="contenedor-alerta">
                                        <div className="mensaje-alerta">{mensajeAlerta}</div>
                                    </div>
                                )}
                            </Col>
                            <Col md={6}>
                                {["1", "2", "3"].includes(opcionSeleccionada) &&
                                    renderFormularioOficina(opcionSeleccionada, valorFormularioOficina, manejarCambioInputOficina, opcionSeleccionada === "3")
                                }
                                <Button style={estiloButton} onClick={() => alternarModalOficina(true)}>
                                    {textoBoton}
                                </Button>
                                {mostrarAlertaOficina && (
                                    <div className="contenedor-alerta">
                                        <div className="mensaje-alerta">{mensajeAlertaOficina}</div>
                                    </div>
                                )}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col md={4} className="my-4">
                        <Card>
                            <Card.Body className="d-flex align-items-center justify-content-center" style={{ background: '#F5C618' }}>
                                {opcionSeleccionada === "1" ? (
                                    valorFormularioOficina && valorFormularioOficina.imagenes && valorFormularioOficina.imagenes.length > 0 ? (
                                        <Carousel data-bs-theme="dark" style={{ minHeight: '300px', position: 'relative' }}>
                                            {valorFormularioOficina.imagenes.map((img, index) => (
                                                <Carousel.Item key={index}>
                                                    <img className="d-block w-100" src={URL.createObjectURL(img)} alt={`Imagen ${index + 1}`} />
                                                    <Carousel.Caption>
                                                        <h5>Imagen {index + 1}</h5>
                                                        <Button variant="danger" onClick={() => eliminarImagen(index)}>Eliminar</Button>
                                                    </Carousel.Caption>
                                                </Carousel.Item>
                                            ))}
                                        </Carousel>
                                    ) : (
                                        <div style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <p>No hay imágenes para mostrar.</p>
                                        </div>
                                    )
                                ) : (
                                    (opcionSeleccionada === "2" || opcionSeleccionada === "3") && nombreInmuebleSeleccionadoOficina ? (
                                        oficina && oficina.find(o => o.nombre === nombreInmuebleSeleccionadoOficina)?.imagenes?.length > 0 ? (
                                            <Carousel data-bs-theme="dark" style={{ minHeight: '300px', position: 'relative' }}>
                                                {oficina.find(o => o.nombre === nombreInmuebleSeleccionadoOficina).imagenes.map((img, index) => (
                                                    <Carousel.Item key={index}>
                                                        <img className="d-block w-100"
                                                            src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                                                            alt={`Imagen ${index + 1}`} />
                                                        <Carousel.Caption>
                                                            <h5>Imagen {index + 1}</h5>
                                                            {opcionSeleccionada === '1' && (
                                                                <Button variant="danger" onClick={() => eliminarImagenExistente(index)}>Eliminar</Button>
                                                            )}
                                                        </Carousel.Caption>
                                                    </Carousel.Item>
                                                ))}
                                            </Carousel>
                                        ) : (
                                            <div style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <p>No hay imágenes para mostrar.</p>
                                            </div>
                                        )
                                    ) : (
                                        <p>Selecciona un espacio para ver las imágenes.</p>
                                    )
                                )}
                            </Card.Body>
                            <Card.Footer style={{ backgroundColor: '#C68608' }}>
                                {opcionSeleccionada === '1' && (
                                    <div className="d-flex justify-content-center">
                                        <Button variant="primary" onClick={() => document.getElementById('imagenInput').click()}>
                                            <MdAdd className="img-custom-btn" />
                                        </Button>
                                        <input
                                            type="file"
                                            id="imagenInput"
                                            style={{ display: 'none' }}
                                            multiple
                                            accept="image/*"
                                            onChange={(e) => manejarCambioImagen(e, opcionSeleccionada)}
                                        />
                                    </div>
                                )}
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col md={8}>
                        <Acciones />
                    </Col>
                </Row >
            </Container >
            <Modal
                show={modalAbierto}
                onHide={() => alternarModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirmación</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex align-items-center justify-content-center">
                    {opcionSeleccionada === "1" ? (
                        "¿Está seguro de que desea agregar un nuevo inmueble?"
                    ) : opcionSeleccionada === "2" ? (
                        "¿Está seguro de que desea guardar los cambios editados?"
                    ) : opcionSeleccionada === "3" ? (
                        "¿Está seguro de que desea eliminar el inmueble?"
                    ) : (
                        "Selecciona una acción para continuar."
                    )}
                </Modal.Body>
                <Modal.Footer className="d-flex align-items-center justify-content-between">
                    <Button variant="secondary" onClick={() => alternarModal(false)}>Cancelar</Button>
                    <Button variant="primary" onClick={() => {
                        if (opcionSeleccionada === "1") {
                            enviarFormulario();
                        } else if (opcionSeleccionada === "2") {
                            editarInmueble(nombreInmuebleSeleccionado)
                        } else if (opcionSeleccionada === "3") {
                            eliminarInmueble();
                        }
                        alternarModal(false);
                    }}>Aceptar</Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={modalAbiertoOficina}
                onHide={() => alternarModalOficina(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirmación</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex align-items-center justify-content-center">
                    {opcionSeleccionada === "1" ? (
                        "¿Está seguro de que desea agregar un nuevo espacio?"
                    ) : opcionSeleccionada === "2" ? (
                        "¿Está seguro de que desea guardar los cambios editados?"
                    ) : opcionSeleccionada === "3" ? (
                        "¿Está seguro de que desea eliminar el espacio?"
                    ) : (
                        "Selecciona una acción para continuar."
                    )}
                </Modal.Body>
                <Modal.Footer className="d-flex align-items-center justify-content-between">
                    <Button variant="secondary" onClick={() => alternarModalOficina(false)}>Cancelar</Button>
                    <Button variant="primary" onClick={() => {
                        if (opcionSeleccionada === "1") {
                            enviarFormularioOficina();
                        } else if (opcionSeleccionada === "2") {
                            editarOficina();
                        } else if (opcionSeleccionada === "3") {
                            eliminarOficina();
                        }
                        alternarModalOficina(false);
                    }}>Aceptar</Button>
                </Modal.Footer>
            </Modal>
            {isLoading && <div>Cargando...</div>}
        </>
    );
}

export default EditarEspacios;