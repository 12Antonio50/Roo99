import React from "react";
import Menu from "./Menu";
import { Container } from "react-bootstrap";
import useAgregarUsuarios from "../../Utils/Function/UsuariosAgregarFunction";

const UsuarioAgregar = () => {
    const {
        renderizarElemento
    } = useAgregarUsuarios();

    return (
        <>
            <div style={{ position: 'sticky', top: '0', zIndex: '1000', backgroundColor: '#FFFFFF' }}>
                <Menu />
            </div>
            <Container>
                {renderizarElemento()}
            </Container>
        </>

    );
}

export default UsuarioAgregar;