import React                 from "react";
import { Accordion, Button } from "react-bootstrap";
import { CgProfile }         from 'react-icons/cg'

const DashboardProfessional = () => {
  return (
    <div>
      <div className="d-grid gap-2 mb-2">
        <Button variant="outline-primary" onClick={() => window.location.href = "/user/profile"}><CgProfile/> Perfil</Button>
      </div>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Asesoria</Accordion.Header>
          <Accordion.Body>
            <div className="d-grid gap-2">
              <Button variant="outline-primary" onClick={() => window.location.href = "/user/advisory/create"}>Crear</Button>
              <Button variant="outline-danger"  onClick={() => window.location.href = "/user/advisory/update"}>Cancelar</Button>
              <Button variant="outline-primary" onClick={() => window.location.href = "/user/advisory/activity"}>Actividades</Button>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Capacitacion</Accordion.Header>
          <Accordion.Body>
            <div className="d-grid gap-2">
              <Button variant="outline-primary" onClick={() => window.location.href = "/user/training/create"}>Crear</Button>
              <Button variant="outline-danger"  onClick={() => window.location.href = "/user/training/update"}>Cancelar</Button>
              <Button variant="outline-primary" onClick={() => window.location.href = "/user/training/activity"}>Actividades</Button>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="d-grid gap-2 mt-2">
        <Button variant="outline-primary" onClick={() => window.location.href = "/user/request/all"}>Ver solicitudes</Button>
      </div>
    </div>
  );
};

export default DashboardProfessional;
