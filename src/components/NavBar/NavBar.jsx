import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { BiLogIn, BiHome } from "react-icons/bi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

const NavBar = () => {
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
                <Nav.Link href="/about-us" style={{ color: "white", verticalAlign:'middle' }}>
                  <HiOutlineOfficeBuilding /> Quienes somos
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
                  <NavDropdown.Item href="#!">Dashboard</NavDropdown.Item>
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
