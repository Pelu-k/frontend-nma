import React, { useState } from 'react'
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import { IoIosSend } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import DashboardProfessional from '../DashboardProfessional';

const AddActivityTraining = () => {
  const { id } = useParams();

  const [activity, setActivity]         = useState("");
  const [price, setPrice]               = useState("");
  const [type, setType]                 = useState("");
  const [createDate, setCreateDate]     = useState("");
  const [deadline, setDeadline]         = useState("");
  const [endDate, setEndDate]           = useState("");
  const [descActivity, setDescActivity] = useState("");
  const [checklist, setChecklist]       = useState("");

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
      checklist: JSON.stringify(checklist.split(",").map(c => ({task: c, state: false}))),
      idAsesoria: id,
    }),
  };
  //#endregion
  
  const createActivity = async (e) => {
    e.preventDefault();
    try {
      const res  = await fetch(`${URL_BASE}/register-activity`, OPTIONS_POST);
      if(res.status === 200) {
        const data = await res.text();
        alert(data)
        window.location.href = '/user/training/activity'
      } else {
        alert("No se pudo crear la actividad")
      }
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
                      <option defaultChecked key='0'>Seleccionar actividad</option>
                      <option key='1'>CAPACITACION</option>
                      <option key='2'>GESTION</option>
                      <option key='3'>VISITA</option>
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
                      <option defaultChecked key='1'>Seleccionar tipo</option>
                      <option key='2'>normal</option>
                      <option key='3'>especial</option>
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                  <FloatingLabel label="Fecha creacion" controlId="createDate">
                    <Form.Control
                      type="date"
                      min={new Date().toJSON().slice(0,10)}
                      onChange={(e) => setCreateDate(new Date(e.target.value))}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                  <FloatingLabel label="Fecha limite" controlId="deadline">
                    <Form.Control
                      type="date"
                      min={new Date().toJSON().slice(0,10)}
                      onChange={(e) => setDeadline(new Date(e.target.value))}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                  <FloatingLabel label="Fecha termino" controlId="endDate">
                    <Form.Control
                      type="date"
                      min={new Date().toJSON().slice(0,10)}
                      onChange={(e) => setEndDate(new Date(e.target.value))}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                  <FloatingLabel label="Tareas a realizar (separadas por ,)" controlId="checklist">
                    <Form.Control
                      type="text"
                      onChange={(e) => setChecklist(e.target.value)}
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
}

export default AddActivityTraining