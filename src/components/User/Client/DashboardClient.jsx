import React                 from 'react';
import { Accordion, Button } from 'react-bootstrap';

const DashboardClient = () => {
  return (
    <div>
      <div className="d-grid gap-2 mb-2">
        <Button variant="outline-primary" onClick={() => window.location.href = "/user/profile"}>Perfil</Button>
      </div>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Asesoria</Accordion.Header>
          <Accordion.Body>
            <div className="d-grid gap-2">
              <Button variant="outline-primary" onClick={() => window.location.href = "/user/advisory/request"}>Solicitar</Button>
              <Button variant="outline-primary" onClick={() => window.location.href = "/user/advisory/getAll"}>Ver todas</Button>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Capacitacion</Accordion.Header>
          <Accordion.Body>
            <div className="d-grid gap-2">
              <Button variant="outline-primary" onClick={() => window.location.href = "/user/training/request"}>Solicitar</Button>
              <Button variant="outline-primary" onClick={() => window.location.href = "/user/training/getAll"}>Ver todas</Button>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="d-grid gap-2 mt-2">
        <Button variant="outline-danger" onClick={() => window.location.href = "/user/accident/report"}>Reportar accidente</Button>
      </div>
    </div>
  );
};

export default DashboardClient;
