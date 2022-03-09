import React, { useEffect, useState } from 'react'
import { Alert, Badge, Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import Loading from '../../../Utils/Loading/Loading';
import { AiOutlineCheck } from "react-icons/ai"
import DashboardProfessional from '../DashboardProfessional';

const ViewRequestP = () => {
  
  const [requests, setRequests] = useState([]);
  const [state, setState] = useState(true);

  const URL_BASE = "http://localhost:8080/api";
  const OPTIONS_GET = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  };

  const getAllRequest = async () => {
    try {
      const res = await fetch(`${URL_BASE}/get-request`, OPTIONS_GET);
      const data = await res.json();
      if (res.status === 200) {
        setRequests(data);
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

  useEffect(() => {
    document.title = "Solicitudes";
    getAllRequest();
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
            <h2 className="text-center mb-5">Solicitudes</h2>
            {state ? (
              <Loading />
            ) : requests.length === 0 ? (
              <Alert variant="danger">No hay solicitudes</Alert>
            ) : (
              <div>
                {requests.map((request) => (
                  <Card className="mb-3">
                    <Card.Body>
                      <Table>
                        <tbody>
                          <tr>
                            <td>
                              <strong>RAZON SOCIAL</strong>: {request.razonSocial}
                            </td>
                            <td>
                              <strong>CATEGORIA</strong>: {request.categoria}
                            </td>
                            <td>
                              {
                                request.estado.toUpperCase() === 'EN APROBACION' ? (
                                  <><strong>ESTADO</strong>: <Badge pill bg="warning" text="dark">{request.estado}</Badge></>
                                ) :
                                request.estado.toUpperCase() === 'APROBADO' ? (
                                  <><strong>ESTADO</strong>: <Badge pill bg="success">{request.estado}</Badge></>
                                ) : null
                              }
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                      <Card.Text>{request.descripcion}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <Button variant='outline-success'><AiOutlineCheck /> Aprobar</Button>
                      </div>
                    </Card.Footer>
                  </Card>
                ))}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ViewRequestP