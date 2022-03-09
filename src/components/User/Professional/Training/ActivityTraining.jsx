import React, { useState, useEffect } from "react";
import {
  Accordion,
  Alert,
  Button,
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import {
  AiOutlineCheck,
  AiOutlineCheckSquare,
  AiOutlinePlus,
} from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import { MdModeEditOutline } from "react-icons/md";
import Checklist from "../../../Utils/Checklist/Checklist";
import Loading from "../../../Utils/Loading/Loading";
import StateType from "../../../Utils/StateType/StateType";
import DashboardProfessional from "../DashboardProfessional";

const ActivityTraining = () => {
  const idUsuario = localStorage.getItem("idUsuario");

  const [state, setState] = useState(true);
  const [trainings, setTrainings] = useState([]);
  const [activities, setActivities] = useState([]);
  const [show, setShow] = useState(false);
  const [checklist, setChecklist] = useState([]);

  const URL_BASE = "http://localhost:8080/api";
  const OPTIONS_GET = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  };
  const OPTIONS_DELETE = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
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
  };

  const changeState = () => {
    setState(true);
    setTimeout(() => {
      setState(false);
    }, 2000);
  };

  const getAllTrainingsByProfessionalId = async () => {
    try {
      const res = await fetch(
        `${URL_BASE}/trainings/${idUsuario}`,
        OPTIONS_GET
      );
      const data = await res.json();
      setTrainings(data);
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

  const cancelActivity = async (id) => {
    try {
      if (window.confirm("Esta seguro de cancelar la actividad")) {
        const res = await fetch(
          `${URL_BASE}/delete-activity/${id}`,
          OPTIONS_DELETE
        );
        const data = await res.text();
        if (res.status === 200) {
          alert(data);
          window.location.reload();
        } else {
          alert("La actividad no pudo ser cancelada");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const endActivity = async (id) => {
    try {
      if (window.confirm("Esta seguro que desea finalizar la actividad")) {
        const res = await fetch(`${URL_BASE}/end-activity/${id}`, OPTIONS_PUT);
        if (res.status === 200) {
          const data = await res.text();
          alert(data);
          window.location.reload();
        } else {
          alert("La actividad no pudo ser finalizada");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isShowModal = (check) => {
    setShow(true);
    setChecklist(JSON.parse(check));
  };

  useEffect(() => {
    document.title = "Actividades";
    getAllTrainingsByProfessionalId();
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
            ) : trainings.length > 0 ? (
              <div>
                <Accordion>
                  {trainings.map((training, index) => (
                    <Accordion.Item eventKey={index}>
                      <Accordion.Header>
                        <div>
                          <StateType
                            state={training.estado}
                            name={training.nombre}
                          />
                        </div>
                      </Accordion.Header>
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
                                <td>{training.nombreEmpresa}</td>
                                <td>{training.estado}</td>
                                <td>
                                  <div className="d-grid justify-content-md-end">
                                    <Button
                                      variant="outline-primary"
                                      className="mx-auto mb-2"
                                      onClick={() =>
                                        (window.location.href = `/user/training/activity/add/${training.id}`)
                                      }
                                    >
                                      <AiOutlinePlus /> Agregar
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                          <Table borderless>
                            <thead>
                              <tr>
                                <th>Nombre</th>
                                <th>Estado</th>
                                <th>Tipo</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {activities.map((activity, index) =>
                                activity.idAsesoriaFk.toString() ===
                                training.id ? (
                                  <tr>
                                    <td>{activity.nombre}</td>
                                    <td>
                                      <StateType state={activity.estado} />
                                    </td>
                                    <td>{activity.tipo}</td>
                                    <td className="d-grid gap-2 d-md-flex justify-content-md-end">
                                      {activity.estado.toUpperCase() ===
                                      "CANCELADA" ? null : activity.estado.toUpperCase() ===
                                        "FINALIZADA" ? null : (
                                        <>
                                          <Button
                                            size="sm"
                                            variant="outline-primary"
                                            className="mr-1"
                                            onClick={() =>
                                              isShowModal(activity.checklist)
                                            }
                                          >
                                            <AiOutlineCheckSquare />
                                          </Button>
                                          <Button
                                            size="sm"
                                            variant="outline-success"
                                            className="mr-1"
                                            onClick={() =>
                                              endActivity(activity.idActividad)
                                            }
                                          >
                                            <AiOutlineCheck />
                                          </Button>
                                          <Button
                                            size="sm"
                                            variant="outline-warning"
                                            className="mr-1"
                                            onClick={() =>
                                              (window.location.href = `/user/training/activity/edit/${activity.idActividad}`)
                                            }
                                          >
                                            <MdModeEditOutline />
                                          </Button>
                                          <Button
                                            size="sm"
                                            variant="outline-danger"
                                            onClick={() =>
                                              cancelActivity(
                                                activity.idActividad
                                              )
                                            }
                                          >
                                            <BsTrashFill />
                                          </Button>
                                        </>
                                      )}
                                    </td>
                                    {activity.checklist !== null ? (
                                      <Checklist
                                        show={show}
                                        checklist={checklist}
                                        onHide={() => setShow(false)}
                                        key={index}
                                      />
                                    ) : null}
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
                No se pudieron obtener las capacitaciones
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ActivityTraining;
