import React from "react";
import { Modal } from "react-bootstrap";

const ModalAlerta = ({ modalAlerta, mostrarAlerta, mensajeAlerta }) => {    
    return (
        <Modal
            show={modalAlerta}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body style={{ background: '#F5C618', color: '#FFFFFF' }} className="d-flex justify-content-center aling-items-center">
                {mostrarAlerta && (
                    <div>
                        <h5>{mensajeAlerta}</h5>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
}

export default ModalAlerta;