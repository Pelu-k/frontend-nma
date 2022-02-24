import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row, Table } from "react-bootstrap";
import Loading from "../../../Utils/Loading/Loading";
import DashboardProfessional from "../DashboardProfessional";

const UpdateAdvisory = () => {
  const [state, setState]                 = useState(true);
  const [consultancies, setConsultancies] = useState([]);

  const URL_BASE = "http://localhost:8080/api";
  const OPTIONS_GET = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-type": "appication/json",
      Authorization: localStorage.getItem("token"),
    },
  };

  const getAllAdvisory = async (idUsuario) => {
    try {
      const res  = await fetch(`${URL_BASE}/advisory/${idUsuario}`, OPTIONS_GET);
      const data = await res.json();
      setConsultancies(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAdvisory = async (idAsesoria) => {
    try {
      const res  = await fetch(`${URL_BASE}/update-advisory`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          id: idAsesoria,
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
    document.title = "Actualizar asesoria";
    const idUsuario = localStorage.getItem("idUsuario");
    getAllAdvisory(idUsuario);
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
            <h2 className="text-center mb-5">Actualizar asesoria</h2>
            {state ? (
              <Loading />
            ) : (
              <div>
                {consultancies.length > 0 ? (
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
                      {consultancies.map((advisory) => (
                        <tr>
                          <td>{advisory.id}</td>
                          <td>{advisory.nombre}</td>
                          <td>{advisory.numero}</td>
                          <td>{advisory.nombreEmpresa}</td>
                          <td>{advisory.valor}</td>
                          <td>{advisory.estado}</td>
                          <td>
                            <Button
                              variant="outline-danger"
                              onClick={() => deleteAdvisory(advisory.id)}
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
                    No se pudo obtener la lista de asesorias
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

export default UpdateAdvisory;
