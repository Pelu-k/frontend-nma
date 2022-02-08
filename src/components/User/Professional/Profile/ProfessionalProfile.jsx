import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import DashboardProfessional from "../DashboardProfessional";

const ProfessionalProfile = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col sm={3}>
            <DashboardProfessional />
          </Col>
          <Col>
            <h2 className="text-center">
              Bienvenido {localStorage.getItem("nombre")}
            </h2>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfessionalProfile;
