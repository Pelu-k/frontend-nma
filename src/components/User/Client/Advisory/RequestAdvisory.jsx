import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import DashboardClient from "../DashboardClient";

const RequestAdvisory = () => {
  return (
    <div className="mt-5">
      <Container>
        <Row>
          <Col sm={3}>
            <DashboardClient />
          </Col>
          <Col sm={9}>
            <h2 className="text-center mb-5">Solicitar asesoria</h2>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RequestAdvisory;
