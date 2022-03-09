import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { BiLogIn, BiHome } from "react-icons/bi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";

const NavBar = () => {
  const rol = localStorage.getItem("rol");

  const [token, setToken]   = useState(null);
  const [nombre, setNombre] = useState("Jaimico");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (localStorage.getItem("nombre")) {
      setNombre(localStorage.getItem("nombre"));
    }
  }, []);

  const OPTIONS = {
    2: // Professional
      <>
        <NavDropdown.Item href="/user/advisory/create">Crear asesoria</NavDropdown.Item>
        <NavDropdown.Item href="/user/training/create">Crear capacitacion</NavDropdown.Item>
        <NavDropdown.Item href="/user/request/all">Solicitudes</NavDropdown.Item>
      </>,
    3: // Cliente
      <>
        <NavDropdown.Item href="/user/advisory/request">Solicitar asesoria</NavDropdown.Item>
        <NavDropdown.Item href="/user/training/request">Solicitar capacitacion</NavDropdown.Item>
        <NavDropdown.Item href="/user/accident/report">Reportar accidente</NavDropdown.Item>
      </>
  }

  return (
    <div>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">NO MAS ACCIDENTES</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/" style={{ color: "white", verticalAlign:'middle' }}>
                  <BiHome /> Inicio
                </Nav.Link>
                <Nav.Link href="/#sobre-nosotros" style={{ color: "white", verticalAlign:'middle' }}>
                  <HiOutlineOfficeBuilding /> Quienes somos
                </Nav.Link>
                <Nav.Link href="/#contacto" style={{ color: "white", verticalAlign:'middle' }}>
                  <AiOutlineMail /> Contacto
                </Nav.Link>
              </Nav>
            </Nav>
            <Nav>
              {token ? (
                <NavDropdown
                  title={nombre}
                  id="collasible-nav-dropdown"
                  style={{ color: "white" }}
                >
                  <NavDropdown.Item href="/user/profile">Perfil</NavDropdown.Item>
                  {OPTIONS[rol]}
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#!" onClick={logout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link href="login" style={{ color: "white", verticalAlign:'middle'}}>
                  <BiLogIn /> Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
