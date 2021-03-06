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
import {
  AiOutlinePlus,
  AiOutlineCheck,
  AiOutlineCheckSquare,
} from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import { MdModeEditOutline } from "react-icons/md";
import StateType from "../../../Utils/StateType/StateType";
import Checklist from "../../../Utils/Checklist/Checklist";

const ActivityAdvisory = () => {
  //#region no TOCAR
  const idUsuario = localStorage.getItem("idUsuario");

  const [state, setState] = useState(true);
  const [consultancies, setConsultancies] = useState([]);
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
  //#endregion

  //#region Obtener asesorias y actividades
  const getAllConsultanciesByProfessionalId = async () => {
    try {
      const res = await fetch(`${URL_BASE}/advisory/${idUsuario}`, OPTIONS_GET);
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
  //#endregion

  const cancelActivity = async (id) => {
    try {
      if (window.confirm("Esta seguro de cancelar la actividad")) {
        const res = await fetch(
          `${URL_BASE}/delete-activity/${id}`,
          OPTIONS_DELETE
        );
        if (res.status === 200) {
          const data = await res.text();
          alert(data);
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const endActivity = async (id) => {
    try {
      if (window.confirm("Esta seguro que desea finaliar la actividad")) {
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

  const changeState = () => {
    setState(true);
    setTimeout(() => {
      setState(false);
    }, 3000);
  };

  const isShowModal = (check) => {
    setShow(true);
    setChecklist(JSON.parse(check));
  };

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
                      <Accordion.Header>
                        <div>
                          <StateType
                            state={advisory.estado}
                            name={advisory.nombre}
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
                                <td>{advisory.nombreEmpresa}</td>
                                <td>
                                  <StateType state={advisory.estado} />
                                </td>
                                <td>
                                  <div className="d-grid justify-content-md-end">
                                    <Button
                                      variant="outline-primary"
                                      className="mx-auto mb-2"
                                      onClick={() =>
                                        (window.location.href = `/user/advisory/activity/add/${advisory.id}`)
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
                                advisory.id ? (
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
                                            variant="outline-primary"
                                            className="mr-1"
                                            size="sm"
                                            onClick={() =>
                                              isShowModal(activity.checklist)
                                            }
                                          >
                                            <AiOutlineCheckSquare />
                                          </Button>
                                          <Button
                                            variant="outline-success"
                                            className="mr-1"
                                            size="sm"
                                            onClick={() =>
                                              endActivity(activity.idActividad)
                                            }
                                          >
                                            <AiOutlineCheck />
                                          </Button>
                                          <Button
                                            variant="outline-warning"
                                            className="mr-1"
                                            size="sm"
                                            onClick={() =>
                                              (window.location.href = `/user/advisory/activity/edit/${activity.idActividad}`)
                                            }
                                          >
                                            <MdModeEditOutline />
                                          </Button>
                                          <Button
                                            variant="outline-danger"
                                            size="sm"
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
                                        onHide={() => setShow(false)}
                                        checklist={checklist}
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
