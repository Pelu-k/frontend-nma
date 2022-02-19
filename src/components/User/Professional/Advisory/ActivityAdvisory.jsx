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

  const [state, setState] = useState(false);
  const [consultancies, setConsultancies] = useState([]);

  const changeState = () => {
    setState(false);
    setTimeout(() => {
      setState(false);
    }, 3000);
  };

  const URL = "http://localhost:8080/api/advisory";
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
      const res = await fetch(`${URL}/${idUsuario}`, OPTIONS_GET);
      const data = await res.json();
      setConsultancies(data);
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
                  {keys.map((key, index) =>
                    key === "0" ? null : (
                      <Accordion.Item eventKey={index}>
                        <Accordion.Header>{key}</Accordion.Header>
                        <Accordion.Body>
                          <div className="d-grid justify-content-md-end">
                            <Button
                              variant="outline-primary"
                              className="mx-auto mb-2"
                            >
                              <AiOutlinePlus /> Agregar
                            </Button>
                          </div>
                          <Table>
                            <thead>
                              <tr>
                                <th>Nombre Empresa</th>
                                <th>Valor </th>
                                <th>Estado</th>
                                <th className="d-grid gap-2 d-md-flex justify-content-md-end">
                                  Acciones
                                </th>
                              </tr>
                            </thead>
                            {groupBy[key].map((advisory) => (
                              <tbody>
                                <tr>
                                  <td>{advisory.nombreEmpresa}</td>
                                  <td>{advisory.valor}</td>
                                  <td>{advisory.estado}</td>
                                  <td className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <Button
                                      variant="outline-warning"
                                      className="me-1"
                                    >
                                      <MdModeEditOutline /> Editar
                                    </Button>
                                    <Button variant="outline-danger">
                                      <BsTrashFill /> Cancelar
                                    </Button>
                                  </td>
                                </tr>
                              </tbody>
                            ))}
                          </Table>
                        </Accordion.Body>
                      </Accordion.Item>
                    )
                  )}
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
