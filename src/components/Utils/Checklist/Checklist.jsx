import React from "react";
import { Button, Modal } from "react-bootstrap";

const Checklist = (props) => {
  return (
    <Modal {...props} size="sm" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Checklist</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.checklist.map((n) =>
          n.s ? (
            <>
              <label>
                <input
                  type="checkbox"
                  id="cbox1"
                  value={n.t}
                  checked={n.s}
                  disabled
                />{" "}
                {n.t}
              </label>
              <br />
            </>
          ) : (
            <>
              <label>
                <input type="checkbox" id="cbox1" value={n.t} /> {n.t}
              </label>
              <br />
            </>
          )
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Guardar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Checklist;
