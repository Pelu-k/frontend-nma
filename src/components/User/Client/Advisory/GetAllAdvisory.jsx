import React, { useEffect, useState } from "react";
import {
  Accordion,
  Alert,
  Badge,
  Button,
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import { AiOutlineEye } from "react-icons/ai";
import Loading from "../../../Utils/Loading/Loading";
import DashboardClient from "../DashboardClient";

const GetAllAdvisory = () => {
  const idUsuario = localStorage.getItem("idUsuario");

  const [state, setState] = useState(true);
  const [consultancies, setConsultancies] = useState([]);
  const [activities, setActivities] = useState([]);

  const URL_BASE = "http://localhost:8080/api";
  const OPTIONS_GET = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  };

  const getAllConsultanciesByClientId = async () => {
    try {
      const res = await fetch(
        `${URL_BASE}/advisory/client/${idUsuario}`,
        OPTIONS_GET
      );
      const data = await res.json();
      setConsultancies(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllActivities = async () => {
    try {
      const res = await fetch(`${URL_BASE}/all-activities`, OPTIONS_GET);
      const data = await res.json();
      setActivities(data);
    } catch (error) {
      console.log(error);
    }
  };

  const changeState = () => {
    setState(true);
    setTimeout(() => {
      setState(false);
    }, 3000);
  };

  useEffect(() => {
    document.title = "Actividades";
    getAllConsultanciesByClientId();
    getAllActivities();
    changeState();
  }, []);

  return (
    <div className="mt-5">
      <Container>
        <Row>
          <Col sm={3}>
            <DashboardClient />
          </Col>
          <Col sm={9}>
            <h2 className="text-center mb-5">Asesorias</h2>
            {state ? (
              <Loading />
            ) : consultancies.length > 0 ? (
              <div>
                <Accordion defaultActiveKey="0">
                  {consultancies.map((advisory, index) => (
                    <Accordion.Item eventKey={index}>
                      <Accordion.Header>
                        {advisory.estado === "Cancelada" ? (
                          <div>
                            <Badge pill bg="danger">
                              Cancelada
                            </Badge>{" "}
                            {advisory.nombre}
                          </div>
                        ) : advisory.estado === "Aprobado" ? (
                          <div>
                            <Badge pill bg="primary">
                              Aprobado
                            </Badge>{" "}
                            {advisory.nombre}
                          </div>
                        ) : advisory.estado === "En aprobacion" ? (
                          <div>
                            <Badge pill bg="warning" text="dark">
                              En aprobacion
                            </Badge>{" "}
                            {advisory.nombre}
                          </div>
                        ) : advisory.estado === "Finalizada" ? (
                          <div>
                            <Badge pill bg="success">
                              Finalizada
                            </Badge>{" "}
                            {advisory.nombre}
                          </div>
                        ) : null}
                      </Accordion.Header>
                      <Accordion.Body>
                        <div>
                          <Table>
                            <thead>
                              <tr>
                                <th>Razon Social</th>
                                <th>Nombre empresa</th>
                                <th>Estado</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{advisory.razonSocial}</td>
                                <td>{advisory.nombreEmpresa}</td>
                                <td>{advisory.estado}</td>
                              </tr>
                            </tbody>
                          </Table>
                          <Table>
                            <thead>
                              <tr>
                                <th>Nombre</th>
                                <th>Estado</th>
                                <th>Tipo</th>
                                <th>Checklist</th>
                              </tr>
                            </thead>
                            <tbody>
                              {activities.map((activity) =>
                                activity.idAsesoriaFk.toString() ===
                                advisory.id ? (
                                  <tr>
                                    <td>{activity.nombre}</td>
                                    <td>{activity.estado}</td>
                                    <td>{activity.tipo}</td>
                                    <td>
                                      <Button
                                        variant="outline-primary"
                                        size="sm"
                                      >
                                        <AiOutlineEye />
                                        Ver
                                      </Button>
                                    </td>
                                  </tr>
                                ) : null
                              )}
                            </tbody>
                          </Table>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
            ) : (
              <Alert variant="danger">
                No se pudieron obtener las asesorias
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GetAllAdvisory;
