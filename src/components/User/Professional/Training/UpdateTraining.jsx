import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row, Table } from "react-bootstrap";
import Loading from "../../../Utils/Loading/Loading";
import DashboardProfessional from "../DashboardProfessional";

const UpdateTraining = () => {
  const [state, setState]                 = useState(true);
  const [trainings, setTrainings] = useState([]);

  const URL_BASE = "http://localhost:8080/api";
  const OPTIONS_GET = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-type": "appication/json",
      Authorization: localStorage.getItem("token"),
    },
  };

  const getAllTrainings = async (idUsuario) => {
    try {
      const res  = await fetch(`${URL_BASE}/training/${idUsuario}`, OPTIONS_GET);
      const data = await res.json();
      setTrainings(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTraining = async (idCapacitacion) => {
    try {
      const res  = await fetch(`${URL_BASE}/update-advisory`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          id: idCapacitacion,
          estado: "Cancelada",
        }),
      });
      const data = await res.text()
      alert(data);
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  const changeState = () => {
    setState(true);
    setTimeout(() => {
      setState(false);
    }, 3000);
  };

  useEffect(() => {
    document.title = "Actualizar capacitacion";
    const idUsuario = localStorage.getItem("idUsuario");
    getAllTrainings(idUsuario);
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
            <h2 className="text-center mb-5">Actualizar capacitacion</h2>
            {state ? (
              <Loading />
            ) : (
              <div>
                {trainings.length > 0 ? (
                  <Table responsive striped bordered hover>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Numero</th>
                        <th>Cliente</th>
                        <th>Valor</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trainings.map((training) => (
                        <tr>
                          <td>{training.id}</td>
                          <td>{training.nombre}</td>
                          <td>{training.numero}</td>
                          <td>{training.nombreEmpresa}</td>
                          <td>{training.valor}</td>
                          <td>{training.estado}</td>
                          <td>
                            <Button
                              variant="outline-danger"
                              onClick={() => deleteTraining(training.id)}
                            >
                              Cancelar
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <Alert variant="danger">
                    No se pudo obtener la lista de capacitacion
                  </Alert>
                )}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UpdateTraining;
