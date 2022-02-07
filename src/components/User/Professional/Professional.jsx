import React, { useState } from "react";
import { Accordion, Button, Col, Container, Row } from "react-bootstrap";
import CreateAdvisory from "./Advisory/CreateAdvisory";
import UpdateAdvisory from "./Advisory/UpdateAdvisory";
import Profile from "./Profile/Profile";

const Professional = () => {
  const [render, setRender] = useState(0);

  const renderList = {
    0: <Profile/>,
    1: <CreateAdvisory/>,
    2: <UpdateAdvisory/>
  };
  return (
    <div>
      <Container className="mt-5">
        <Row>
          <Col sm={3}>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <div className="d-grid gap-2">
                  <Button variant="outline-primary" onClick={() => setRender(0)}>Perfil</Button>
                </div>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Asesoria</Accordion.Header>
                <Accordion.Body>
                  <div className="d-grid gap-2">
                    <Button variant="outline-primary" onClick={() => setRender(1)}>Crear</Button>
                    <Button variant="outline-primary" onClick={() => setRender(2)}>Actualizar</Button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Tareas</Accordion.Header>
                <Accordion.Body>
                  <div className="d-grid gap-2">
                    <Button variant="outline-primary" onClick={() => setRender(3)}>Crear</Button>
                    <Button variant="outline-primary" onClick={() => setRender(4)}>Ver</Button>
                    <Button variant="outline-primary" onClick={() => setRender(5)}>Actualizar</Button>
                    <Button variant="outline-primary" onClick={() => setRender(6)}>Eliminar</Button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Capacitacion</Accordion.Header>
                <Accordion.Body>
                  <div className="d-grid gap-2">
                    <Button variant="outline-primary" onClick={() => setRender(7)}>Crear</Button>
                    <Button variant="outline-primary" onClick={() => setRender(8)}>Ver</Button>
                    <Button variant="outline-primary" onClick={() => setRender(9)}>Actualizar</Button>
                    <Button variant="outline-primary" onClick={() => setRender(10)}>Eliminar</Button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col sm={9}>
            {renderList[render]}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Professional;
