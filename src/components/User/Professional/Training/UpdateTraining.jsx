import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import DashboardProfessional from "../DashboardProfessional";

const UpdateTraining = () => {
  return (
    <div className="mt-5">
      <Container>
        <Row>
          <Col sm={3}>
            <DashboardProfessional />
          </Col>
          <Col sm={9}>
            <h2 className="text-center mb-5">Actualizar capacitacion</h2>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UpdateTraining;
