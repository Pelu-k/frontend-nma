import React, { useEffect, useState } from 'react'
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import { IoIosSend } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import Loading from '../../../Utils/Loading/Loading';
import DashboardProfessional from '../DashboardProfessional';

const EditActivityTraining = () => {
  const { id } = useParams();

  const [state, setState]               = useState(true);
  const [activity, setActivity]         = useState([]);
  const [price, setPrice]               = useState("");
  const [type, setType]                 = useState("");
  const [createDate, setCreateDate]     = useState("");
  const [deadline, setDeadline]         = useState("");
  const [endDate, setEndDate]           = useState("");
  const [descActivity, setDescActivity] = useState("");

  const URL_BASE = "http://localhost:8080/api";
  const OPTIONS_GET = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-type": "appication/json",
      Authorization: localStorage.getItem("token"),
    },
  };
  const OPTIONS_PUT = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify({
      idActividad: id,
      nombre: activity.nombre,
      valor: price,
      estado: activity.estado,
      fechaLimite: deadline,
      descActividad: descActivity,
    }),
  };

  const changeState = () => {
    setState(true);
    setTimeout(() => {
      setState(false);
    }, 3000);
  };

  const getActivityById = async () => {
    try {
      const res  = await fetch(`${URL_BASE}/activity/${id}`, OPTIONS_GET);
      const data = await res.json();
      setActivity(data);
      setPrice(data.valor)
    setType(data.tipo)
    setCreateDate(data.fechaCreacion)
    setDeadline(data.fechaLimite)
    setEndDate(data.fechaTermino)
    setDescActivity(data.descActividad)
    } catch (error) {
      console.log(error);
    }
  };

  const updateActivity = async () => {
    if (
      window.confirm(
        "Esta seguro que quiere actualizar los datos de la actividad"
      )
    ) {
      try {
        const res  = await fetch(`${URL_BASE}/update-activity`, OPTIONS_PUT);
        const data = await res.text();
        alert(data);
        if(res.status === 200) {
          window.location.href = "/user/training/activity";
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const setData = async () => {
    setPrice(activity.valor)
    setType(activity.tipo)
    setCreateDate(activity.fechaCreacion)
    setDeadline(activity.fechaLimite)
    setEndDate(activity.fechaTermino)
    setDescActivity(activity.descActividad)
  }

  useEffect(() => {
    document.title = "Editar actividad";
    getActivityById();
    // setData();
    changeState();
  }, []);

  return (
    <div className="mt-5">
      <Container>
        <Row>
          <Col sm={3}>
            <DashboardProfessional />
          </Col>
          <Col sm={9}>
            <h2 className="text-center mb-5">Editar actividad</h2>
            {state ? (
              <Loading />
            ) : (
              <div>
                <Form>
                  <Form.Group className="mb-3">
                    <FloatingLabel label="Actividad" controlId="activity">
                      <Form.Control
                        type="text"
                        value={activity.nombre}
                        readOnly
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <FloatingLabel label="Valor" controlId="price">
                      <Form.Control
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <FloatingLabel label="Tipo" controlId="type">
                      <Form.Select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                      >
                        <option>Seleccionar tipo</option>
                        <option>normal</option>
                        <option>especial</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <FloatingLabel
                      label="Fecha creacion"
                      controlId="createDate"
                    >
                      <Form.Control
                        type="date"
                        value={createDate}
                        readOnly
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <FloatingLabel label="Fecha limite" controlId="deadline">
                      <Form.Control
                        type="date"
                        min={new Date().toJSON().slice(0,10)}
                        value={deadline}
                        onChange={(e) => setDeadline(new Date(e.target.value))}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <FloatingLabel label="Fecha termino" controlId="endDate">
                      <Form.Control
                        type="date"
                        min={new Date().toJSON().slice(0,10)}
                        value={endDate}
                        onChange={(e) => setEndDate(new Date(e.target.value))}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <FloatingLabel label="Descripcion" controlId="description">
                      <Form.Control
                        type="textarea"
                        value={descActivity}
                        onChange={(e) => setDescActivity(e.target.value)}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <div className="d-grid gap-2">
                    <Button
                      variant="warning"
                      size="lg"
                      onClick={updateActivity}
                    >
                      <strong>Actualizar</strong> <IoIosSend />
                    </Button>
                  </div>
                </Form>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default EditActivityTraining