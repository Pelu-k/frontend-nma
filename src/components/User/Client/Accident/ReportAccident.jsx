import React, { useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { IoIosSend } from "react-icons/io";
import DashboardClient from "../DashboardClient";

const ReportAccident = () => {
  const [desc, setDesc] = useState();

  const URL_BASE = "http://localhost:8080/api";
  const OPTIONS_POST = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify({
      fecha: new Date(),
      descripcion: desc,
      idCliente: localStorage.getItem('idUsuario')
    }),
  };

  const createReport = async () => {
    try {
      const res = await fetch(`${URL_BASE}/report-accident`, OPTIONS_POST);
      const data = await res.text();
      alert(data)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="mt-5">
      <Container>
        <Row>
          <Col sm={3}>
            <DashboardClient />
          </Col>
          <Col sm={9}>
            <h2 className="text-center mb-5">Reportar accidente</h2>
            <Form>
              <Form.Group className="mb-3">
                <FloatingLabel label="Fecha" controlId="date">
                  <Form.Control
                    type="date"
                    value={new Date().toJSON().slice(0, 10)}
                    readOnly
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3">
                <FloatingLabel label="Descripcion" controlId="description">
                  <Form.Control
                    as="textarea"
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </FloatingLabel>
              </Form.Group>
              <div className="d-grid gap-2">
                <Button
                  variant="outline-danger"
                  size="lg"
                  onClick={createReport}
                >
                  <strong>Enviar reporte</strong> <IoIosSend />
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ReportAccident;
