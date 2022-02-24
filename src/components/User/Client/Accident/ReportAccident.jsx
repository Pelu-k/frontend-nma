import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import DashboardClient from "../DashboardClient";

const ReportAccident = () => {
  return (
    <div className="mt-5">
      <Container>
        <Row>
          <Col sm={3}>
            <DashboardClient />
          </Col>
          <Col sm={9}>
            <h2 className="text-center mb-5">Actividades</h2>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ReportAccident;
