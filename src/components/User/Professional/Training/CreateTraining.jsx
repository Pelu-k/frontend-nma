import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import Loading from "../../../Utils/Loading/Loading";
import DashboardProfessional from "../DashboardProfessional";
import { IoIosSend } from "react-icons/io";

const CreateTraining = () => {
  const request = JSON.parse(localStorage.getItem('request'));

  const [state, setState]               = useState(true);
  const [customers, setCustomers]       = useState([]);
  const [nameTraining, setNameTraining] = useState("");
  // const [checklist, setChecklist]       = useState("");
  const [createDate, setCreateDate]     = useState("");
  const [deadline, setDeadline]         = useState("");
  const [endDate, setEndDate]           = useState("");
  const [price, setPrice]               = useState(0);
  const [idClient, setIdClient]         = useState(0);
 
  const URL_BASE = "http://localhost:8080/api";
  const OPTIONS_GET = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-type": "appication/json",
      Authorization: localStorage.getItem("token"),
    },
  };
  const OPTIONS_POST = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify({
      nombre: nameTraining,
      //descChecklist: checklist,
      fechaCreacion: createDate,
      fechaLimite: deadline,
      fechaTermino: endDate,
      valor: price,
      idClienteFk: idClient,
      idProfesionalFk: localStorage.getItem("idUsuario"),
      categoria: "CAPACITACION"
    }),
  };

  const changeState = () => {
    setState(true);
    setTimeout(() => {
      setState(false);
    }, 3000);
  };

  const getAllCustomers = async () => {
    try {
      const res  = await fetch(`${URL_BASE}/customers`, OPTIONS_GET);
      const data = await res.json();
      setCustomers(data);
    } catch (error) {
      setCustomers([]);
    }
  };

  const createTrainig = async (e) => {
    e.preventDefault();
    if(!nameTraining.trim()) { alert("El campo nombre capacitacion no puede estar vacio"); return ;}
    // if(!createDate.trim()) { alert("El campo fecha creacion no puede estar vacio"); return ;}
    // if(!deadline.trim()) { alert("El campo fecha limite no puede estar vacio"); return ;}
    // if(!endDate.trim()) { alert("El campo fecha termino no puede estar vacio"); return ;}
    if(!price.trim()) { alert("El campo valor no puede estar vacio"); return ;}
    if(!idClient.trim()) { alert("El campo cliente no puede estar vacio"); return ;}
    // if(!checklist.trim()) { alert("El campo checklist no puede estar vacio"); return ;}
    try {
      const res  = await fetch(`${URL_BASE}/create-advisory`, OPTIONS_POST);
      if(res.status === 200) {
        const data = await res.text();
        alert(data);
        if(request) { localStorage.removeItem("request"); }
        window.location.href = "/user/training/activity"
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Crear capacitacion";
    getAllCustomers();
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
            <h2 className="text-center mb-5">Crear capacitacion</h2>
            {state ? (
              <Loading />
            ) : (
              <>
                {
                  !request ? null : (
                    <Card body className="mb-3">
                      <p><strong>Razon Social:</strong> {request.razonSocial}</p>
                      <p><strong>Categoria:</strong> {request.categoria}</p>
                      <p><strong>Descripcion:</strong> {request.descripcion}</p>
                    </Card>
                  ) 
                }
                <div>
                  <Form>
                    <Form.Group className="mb-3">
                      <FloatingLabel
                        label="Nombre capacitacion"
                        controlId="nameTraining"
                      >
                        <Form.Control
                          type="text"
                          onChange={(e) => setNameTraining(e.target.value)}
                        />
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      {customers.length > 0 ? (
                        <FloatingLabel label="Cliente" controlId="idClient">
                          <Form.Select
                          onChange={(e) => setIdClient(e.target.value)}
                          >
                            <option disable>Seleccionar cliente</option>
                            {customers.map((client) => (
                              <option key={client.id} value={client.id}>
                                {client.nombre}
                              </option>
                            ))}
                          </Form.Select>
                        </FloatingLabel>
                      ) : (
                        <Alert variant="danger">
                          Error al obtener la lista de clientes
                        </Alert>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <FloatingLabel
                        label="Fecha creacion"
                        controlId="createDate"
                      >
                        <Form.Control
                          type="date"
                          min={new Date().toJSON().slice(0,10)}
                          onChange={(e) => setCreateDate(e.target.value)}
                        />
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <FloatingLabel label="Fecha limite" controlId="deadline">
                        <Form.Control
                          type="date"
                          min={new Date().toJSON().slice(0,10)}
                          onChange={(e) => setDeadline(e.target.value)}
                        />
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <FloatingLabel label="Fecha termino" controlId="endDate">
                        <Form.Control
                          type="date"
                          min={new Date().toJSON().slice(0,10)}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
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
                    {customers.length > 0 ? (
                      <div className="d-grid gap-2">
                        <Button
                          variant="outline-primary"
                          size="lg"
                          onClick={createTrainig}
                        >
                          <strong>Crear</strong> <IoIosSend />
                        </Button>
                      </div>
                    ) : (
                      <Alert variant="danger">
                        No es posible crear una capacitacion
                      </Alert>
                    )}
                  </Form>
                </div>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreateTraining;
