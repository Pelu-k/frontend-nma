import React, { useState } from "react";
import {
  Row,
  Col,
  Container,
  Form,
  FloatingLabel,
  Button,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import DashboardProfessional from "../DashboardProfessional";
import { IoIosSend } from "react-icons/io";


const AddActivityAdvisory = () => {
  //#region NO TOCAR
  const { id } = useParams();

  const [activity, setActivity] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [endDate, setEndDate] = useState("");
  const [descActivity, setDescActivity] = useState("");

  const URL_BASE = "http://localhost:8080/api";
  const OPTIONS_POST = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify({
      nombre: activity,
      valor: price,
      tipo: type,
      fechaCreacion: createDate,
      fechaLimite: deadline,
      fechaTermino: endDate,
      descActividad: descActivity,
      idAsesoria: id,
    }),
  };
  //#endregion
  
  const createActivity = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${URL_BASE}/register-activity`, OPTIONS_POST);
      const data = await res.text();
      alert(data)
      window.location.href = '/user/advisory/activity'
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="mt-5">
      <Container>
        <Row>
          <Col sm={3}>
            <DashboardProfessional />
          </Col>
          <Col sm={9}>
            <h2 className="text-center mb-5">Agregar actividad</h2>
            <div>
              <Form>
                <Form.Group className="mb-3">
                  <FloatingLabel label="Actividad" controlId="activity">
                    <Form.Select onChange={(e) => setActivity(e.target.value)}>
                      <option defaultChecked>Seleccionar actividad</option>
                      <option>CAPACITACION</option>
                      <option>GESTION</option>
                      <option>VISITA</option>
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                  <FloatingLabel label="Valor" controlId="price">
                    <Form.Control
                      type="text"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                  <FloatingLabel label="Tipo" controlId="type">
                    <Form.Select onChange={(e) => setType(e.target.value)}>
                      <option>Seleccionar tipo</option>
                      <option>normal</option>
                      <option>especial</option>
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                  <FloatingLabel label="Fecha creacion" controlId="createDate">
                    <Form.Control
                      type="date"
                      onChange={(e) => setCreateDate(new Date(e.target.value))}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                  <FloatingLabel label="Fecha limite" controlId="deadline">
                    <Form.Control
                      type="date"
                      onChange={(e) => setDeadline(new Date(e.target.value))}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                  <FloatingLabel label="Fecha termino" controlId="endDate">
                    <Form.Control
                      type="date"
                      onChange={(e) => setEndDate(new Date(e.target.value))}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                  <FloatingLabel label="Descripcion" controlId="description">
                    <Form.Control
                      type="textarea"
                      onChange={(e) => setDescActivity(e.target.value)}
                    />
                  </FloatingLabel>
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button
                    variant="outline-primary"
                    size="lg"
                    onClick={createActivity}
                  >
                    <strong>Crear</strong> <IoIosSend />
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

export default AddActivityAdvisory;
