import React, { useEffect, useState } from "react";
import {
  Form,
  FloatingLabel,
  Button,
  Alert,
  Row,
  Container,
  Col,
} from "react-bootstrap";
import { IoIosSend } from "react-icons/io";
import Loading from "../../../Utils/Loading/Loading";
import DashboardProfessional from "../DashboardProfessional";

const CreateAdvisory = () => {
  const [state, setState]               = useState(true);
  const [nameAdvisory, setNameAdvisory] = useState("");
  const [checklist, setChecklist]       = useState("");
  const [createDate, setCreateDate]     = useState("");
  const [deadline, setDeadline]         = useState("");
  const [endDate, setEndDate]           = useState("");
  const [price, setPrice]               = useState(0);
  const [idClient, setIdClient]         = useState(0);
  const [customers, setCustomers]       = useState([]);

  const URL_BASE = "http://localhost:8080/api";
  const OPTIONS_POST = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify({
      nombre: nameAdvisory,
      //descChecklist: checklist,
      fechaCreacion: createDate,
      fechaLimite: deadline,
      fechaTermino: endDate,
      valor: price,
      idClienteFk: idClient,
      idProfesionalFk: localStorage.getItem("idUsuario"),
      categoria: "ASESORIA"
    }),
  };
  const OPTIONS_GET = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-type": "appication/json",
      Authorization: localStorage.getItem("token"),
    },
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

  const createAdvisory = async (e) => {
    e.preventDefault();
    // validar campos
    if(!nameAdvisory.trim()) { alert("El campo nombre asesoria no puede estar vacio"); return ;}
    if(!createDate.trim()) { alert("El campo fecha creacion no puede estar vacio"); return ;}
    if(!deadline.trim()) { alert("El campo fecha limite no puede estar vacio"); return ;}
    if(!endDate.trim()) { alert("El campo fecha termino no puede estar vacio"); return ;}
    if(!price.trim()) { alert("El campo valor no puede estar vacio"); return ;}
    if(!idClient.trim()) { alert("El campo cliente no puede estar vacio"); return ;}
    // if(!checklist.trim()) { alert("El campo checklist no puede estar vacio"); return ;}
    try {
      const res  = await fetch(`${URL_BASE}/create-advisory`, OPTIONS_POST);
      const data = await res.text();
      alert(data)
      // Limpiar campos
      setNameAdvisory("");
      setChecklist("");
      setCreateDate("");
      setDeadline("");
      setEndDate("");
      setPrice("");
      setIdClient(0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Crear asesoria";
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
            <h2 className="text-center mb-5">Crear asesoria</h2>
            {state ? (
              <Loading />
            ) : (
              <div>
                <Form>
                  <Form.Group className="mb-3">
                    <FloatingLabel
                      label="Nombre asesoria"
                      controlId="nameAdvisory"
                    >
                      <Form.Control
                        type="text"
                        onChange={(e) => setNameAdvisory(e.target.value)}
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
                    <FloatingLabel label="Checklist" controlId="checklist">
                      <Form.Control
                        type="text"
                        onChange={(e) => setChecklist(e.target.value)}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <FloatingLabel
                      label="Fecha creacion"
                      controlId="createDate"
                    >
                      <Form.Control
                        type="date"
                        onChange={(e) =>
                          setCreateDate(new Date(e.target.value))
                        }
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
                        onClick={createAdvisory}
                      >
                        <strong>Crear</strong> <IoIosSend />
                      </Button>
                    </div>
                  ) : (
                    <Alert variant="danger">
                      No es posible crear una asesoria
                    </Alert>
                  )}
                </Form>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreateAdvisory;
