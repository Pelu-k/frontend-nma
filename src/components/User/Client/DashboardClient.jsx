import React from 'react';
import { Accordion, Button } from 'react-bootstrap';

const DashboardClient = () => {
  return (
    <div>
      <div className="d-grid gap-2 mb-2">
        <Button variant="outline-primary" onClick={() => window.location.href = "/user/profile"}>Perfil</Button>
      </div>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Asesoria</Accordion.Header>
          <Accordion.Body>
            <div className="d-grid gap-2">
              <Button variant="outline-primary" onClick={() => window.location.href = "#!"}>Crear</Button>
              <Button variant="outline-primary" onClick={() => window.location.href = "#!"}>Actualizar</Button>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default DashboardClient;
