import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { IoIosSend } from "react-icons/io";
import DashboardClient from "../DashboardClient";

const RequestTraining = () => {
  const category = "CAPACITACION";

  const [desc, setDesc] = useState("");

  const URL_BASE = "http://localhost:8080/api";
  const OPTIONS_POST = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify({
      descripcion: desc,
      estado: "EN APROBACION",
      categoria: category,
      idCliente: localStorage.getItem("idUsuario"),
    }),
  };

  const sendRequest = async () => {
    if (desc.trim()) {
      alert("El campo descripcion no puede estar vacio");
      return;
    }
    try {
      const res = await fetch(`${URL_BASE}/send-request`, OPTIONS_POST);
      const data = await res.text();
      if (res.status === 200) {
        alert(data);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-5">
      <Container>
        <Row>
          <Col sm={3}>
            <DashboardClient />
          </Col>
          <Col sm={9}>
            <h2 className="text-center mb-5">Solicitar capacitacion</h2>
            <div>
              <Form>
                <Form.Group className="mb-3">
                  <FloatingLabel label="Categoria" controlId="category">
                    <Form.Control type="text" value={category} readOnly />
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
                    variant="outline-primary"
                    size="lg"
                    onClick={sendRequest}
                  >
                    <strong>Enviar</strong> <IoIosSend />
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RequestTraining;
