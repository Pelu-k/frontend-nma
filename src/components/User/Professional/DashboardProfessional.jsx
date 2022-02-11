import React from "react";
import { Accordion, Button } from "react-bootstrap";
import { CgProfile } from 'react-icons/cg'

const DashboardProfessional = () => {
  return (
    <div>
      <div className="d-grid gap-2 mb-2">
        <Button variant="outline-primary" onClick={() => window.location.href = "/user/profile"}><CgProfile/> Perfil</Button>
      </div>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Asesoria</Accordion.Header>
          <Accordion.Body>
            <div className="d-grid gap-2">
              <Button variant="outline-primary" onClick={() => window.location.href = "/user/advisory/create"}>Crear</Button>
              <Button variant="outline-primary" onClick={() => window.location.href = "/user/advisory/update"}>Actualizar</Button>
              <Button variant="outline-primary" onClick={() => window.location.href = "/user/advisory/activity"}>Actividades</Button>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default DashboardProfessional;
