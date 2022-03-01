import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { IoIosSend } from "react-icons/io";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [typeUser, setTypeUser] = useState();

  const url = "http://localhost:8080/api/login";
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
      typeUser: typeUser,
    }),
  };

  const login = async (e) => {
    e.preventDefault();
    // validar campos
    if (!username.trim()) {
      alert("El campo correo no puede estar vacio");
      return;
    }
    if (!password.trim()) {
      alert("El campo contraseña no puede estar vacio");
      return;
    }
    if (!typeUser) {
      alert("Debe elegir un tipo de usuario");
      return;
    }
    try {
      const res = await fetch(url, options);
      if(res.status === 200) {
        const data = await res.json();
        if(typeUser === 'profesional') {
          localStorage.setItem("token", data.token);
          localStorage.setItem("rol", data.rol);
          localStorage.setItem("idUsuario", data.idUsuario);
          localStorage.setItem("nombre", data.nombre);
        } else {
          localStorage.setItem("token", data.token);
          localStorage.setItem("rol", data.rol);
          localStorage.setItem("idUsuario", data.idUsuario);
          localStorage.setItem("nombre", data.razonSocial);
          localStorage.setItem("nombreRepresentante", data.nombreRepresentante);
        }
        window.location.href = "/user/profile";
      } else {
        alert('Usuario y contraseña incorrecto')
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    document.title = 'Login'
  })

  return (
    <div>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }} className="mt-5">
            <Card>
              <Card.Header className="text-center">
                Inicio de sesion
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="username">
                    <FloatingLabel
                      controlId="username"
                      label="Nombre de usuario"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <FloatingLabel
                      controlId="password"
                      label="Contraseña"
                      className="mb-3"
                    >
                      <Form.Control
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="typeUser" onChange={(e) => setTypeUser(e.target.value)}>
                    <Form.Check inline name="typeUser" type="radio" label="Empresa" value="cliente" id="typeCliente" />
                    <Form.Check inline name="typeUser" type="radio" label="Profesional" value="profesional" id="typeProfesional"/>
                  </Form.Group>
                  <Button onClick={login}>
                    Enviar <IoIosSend />
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
