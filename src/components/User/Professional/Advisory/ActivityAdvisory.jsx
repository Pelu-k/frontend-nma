import React, { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Col,
  Container,
  Row,
  Table,
  Alert,
} from "react-bootstrap";
import Loading from "../../../Utils/Loading/Loading";
import DashboardProfessional from "../DashboardProfessional";
import { AiOutlinePlus } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import { MdModeEditOutline } from "react-icons/md";

const ActivityAdvisory = () => {
  const idUsuario = localStorage.getItem("idUsuario");

  const [state, setState] = useState(true);
  const [consultancies, setConsultancies] = useState([]);
  const [activities, setActivities] = useState([]);

  const changeState = () => {
    setState(true);
    setTimeout(() => {
      setState(false);
    }, 3000);
  };

  const URL = "http://localhost:8080/api";
  const OPTIONS_GET = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  };

  //#region Obtener asesorias
  const getAllConsultanciesByProfessionalId = async () => {
    try {
      const res = await fetch(`${URL}/advisory/${idUsuario}`, OPTIONS_GET);
      const data = await res.json();
      setConsultancies(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllActivities = async () => {
    try {
      const res = await fetch(`${URL}/all-activities`, OPTIONS_GET);
      const data = await res.json();
      setActivities(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Ordenar asesorias por nombre
  const ordered = consultancies.sort((a, b) => {
    if (a.nombre > b.nombre) {
      return 1;
    } else if (a.nombre < b.nombre) {
      return -1;
    } else {
      return 0;
    }
  });

  // Agrupar asesorias por nombre
  const groupBy = ordered.reduce(
    (a, b) => {
      (a[b.nombre] = a[b.nombre] || []).push(b);
      return a;
    },
    [{}]
  );
  // Obtener los nombres de las asesorias
  const keys = Object.keys(groupBy);
  //#endregion

  useEffect(() => {
    document.title = "Actividades";
    getAllConsultanciesByProfessionalId();
    getAllActivities();
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
            <h2 className="text-center mb-5">Actividades</h2>
            {state ? (
              <Loading />
            ) : consultancies.length > 0 ? (
              <div>
                <Accordion defaultActiveKey="0">
                  {consultancies.map((advisory, index) => (
                    <Accordion.Item eventKey={index}>
                      <Accordion.Header>{advisory.nombre}</Accordion.Header>
                      <Accordion.Body>
                        <div>
                          <Table>
                            <thead>
                              <tr>
                                <th>Nombre empresa</th>
                                <th>Estado</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{advisory.nombreEmpresa}</td>
                                <td>{advisory.estado}</td>
                                <td>
                                  <div className="d-grid justify-content-md-end">
                                    <Button
                                      variant="outline-primary"
                                      className="mx-auto mb-2"
                                    >
                                      <AiOutlinePlus /> Agregar
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                          <Table>
                            <thead>
                              <tr>
                                <th>Nombre</th>
                                <th>Estado</th>
                                <th>Tipo</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {activities.map((activity) => activity.idAsesoriaFk.toString() === advisory.id ? (
                                <tr>
                                  <td>{activity.nombre}</td>
                                  <td>{activity.estado}</td>
                                  <td>{activity.tipo}</td>
                                  <td>boton</td>
                                </tr>
                              ) : null)}
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

export default ActivityAdvisory;
