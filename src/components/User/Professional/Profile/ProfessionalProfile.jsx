import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import DashboardProfessional from "../DashboardProfessional";
import Loading from "../../../Utils/Loading/Loading"

const ProfessionalProfile = () => {
  const [state, setState] = useState(true);

  const changeState = () => {
    setState(true);
    setTimeout(() => {
      setState(false)
    }, 2000)
  }
  useEffect(() => {
    document.title = 'Perfil'
    changeState()
  }, []);

  return (
    <div className="mt-5">
      <Container>
        <Row>
          <Col sm={3}>
            <DashboardProfessional />
          </Col>
          <Col>
            <h2 className="text-center">
              Bienvenido {localStorage.getItem("nombre")}
            </h2>
            {state ? (
              <Loading />
            ) : (
              <div>

              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfessionalProfile;
