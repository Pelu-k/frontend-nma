import React from "react";
import { Button, Modal } from "react-bootstrap";

const Checklist = (props) => {
  return (
    <Modal {...props} size="sm" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Checklist</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.checklist !== null ? (
          <>
            {props.checklist.map((n, index) => (
              <>
                <label key={index}>
                  <input
                    type="checkbox"
                    id="cbox1"
                    value={n.task}
                  />{" "}
                  {n.task}
                </label>
                <br />
              </>
            ))}
          </>
        ) : (
          <>
            <p>No hay actividades registradas</p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        {props.checklist !== null ? (
          <>
            <Button variant="danger" onClick={props.onHide}>
              Cancelar
            </Button>
            <Button variant="primary">Guardar</Button>
          </>
        ) : (
          <>
            <Button variant="danger" onClick={props.onHide}>
              Cerrar
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default Checklist;
