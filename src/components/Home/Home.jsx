import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import "./css/home.css";
import { ImWhatsapp, ImFacebook2, ImTwitter } from "react-icons/im";
import { AiOutlineMail } from "react-icons/ai";

const Home = () => {
  return (
    <div>
      <Row
        className="parallax-1"
        style={{
          paddingTop: "150px",
          paddingLeft: "50px",
          paddingBottom: "150px",
        }}
      >
        <Col>
          <h1
            className="py-5 ps-5"
            style={{ color: "white", fontSize: "250%" }}
          >
            <strong>Bienvenido a NMA</strong>
          </h1>
        </Col>
      </Row>
      <Container>
        <Row className="my-5">
          <Col sm={12} md={6} lg={4}>
            <Card border="secondary" className="my-2">
              <Card.Body>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas asperiores, delectus quo maiores dolorem perspiciatis
                fuga possimus qui exercitationem officia! Corrupti earum minima
                veniam optio sapiente ipsum dignissimos quaerat facere eligendi
                tempora, sint velit quibusdam explicabo aspernatur corporis quo
                harum et placeat aperiam repudiandae eum sequi. Recusandae
                veniam reiciendis mollitia?
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={6} lg={4}>
            <Card border="secondary" className="my-2">
              <Card.Body>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas asperiores, delectus quo maiores dolorem perspiciatis
                fuga possimus qui exercitationem officia! Corrupti earum minima
                veniam optio sapiente ipsum dignissimos quaerat facere eligendi
                tempora, sint velit quibusdam explicabo aspernatur corporis quo
                harum et placeat aperiam repudiandae eum sequi. Recusandae
                veniam reiciendis mollitia?
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={6} lg={4}>
            <Card border="secondary" className="my-2">
              <Card.Body>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas asperiores, delectus quo maiores dolorem perspiciatis
                fuga possimus qui exercitationem officia! Corrupti earum minima
                veniam optio sapiente ipsum dignissimos quaerat facere eligendi
                tempora, sint velit quibusdam explicabo aspernatur corporis quo
                harum et placeat aperiam repudiandae eum sequi. Recusandae
                veniam reiciendis mollitia?
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Row
        className="parallax-1"
        style={{
          paddingTop: "100px",
          paddingLeft: "50px",
          paddingBottom: "100px",
        }}
      >
        <Col>
          <h2 className="py-5 ps-5" style={{ color: "white" }}>
            Sobre nosotros
          </h2>
        </Col>
      </Row>
      <Container>
        <Row className="my-5">
          <Col sm={12} md={6} lg={4}>
            <Card border="secondary" className="my-2">
              <Card.Body>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas asperiores, delectus quo maiores dolorem perspiciatis
                fuga possimus qui exercitationem officia! Corrupti earum minima
                veniam optio sapiente ipsum dignissimos quaerat facere eligendi
                tempora, sint velit quibusdam explicabo aspernatur corporis quo
                harum et placeat aperiam repudiandae eum sequi. Recusandae
                veniam reiciendis mollitia?
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={6} lg={4}>
            <Card border="secondary" className="my-2">
              <Card.Body>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas asperiores, delectus quo maiores dolorem perspiciatis
                fuga possimus qui exercitationem officia! Corrupti earum minima
                veniam optio sapiente ipsum dignissimos quaerat facere eligendi
                tempora, sint velit quibusdam explicabo aspernatur corporis quo
                harum et placeat aperiam repudiandae eum sequi. Recusandae
                veniam reiciendis mollitia?
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={6} lg={4}>
            <Card border="secondary" className="my-2">
              <Card.Body>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas asperiores, delectus quo maiores dolorem perspiciatis
                fuga possimus qui exercitationem officia! Corrupti earum minima
                veniam optio sapiente ipsum dignissimos quaerat facere eligendi
                tempora, sint velit quibusdam explicabo aspernatur corporis quo
                harum et placeat aperiam repudiandae eum sequi. Recusandae
                veniam reiciendis mollitia?
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Row
        className="parallax-1"
        style={{ paddingTop: "100px", paddingBottom: "100px" }}
      >
        <h3 className="text-center pb-5" style={{ color: "white" }}>
          Contacto
        </h3>
        <Col
          sm={12}
          md={6}
          lg={3}
          style={{
            color: "white",
            paddingBottom: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ImWhatsapp
            size={25}
            color="white"
            style={{ verticalAling: "middle" }}
          />{" "}
          +56 9 3423 9845
        </Col>
        <Col
          sm={12}
          md={6}
          lg={3}
          style={{
            color: "white",
            paddingBottom: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ImFacebook2
            size={25}
            color="white"
            style={{ verticalAling: "middle" }}
          />{" "}
          NMA
        </Col>
        <Col
          sm={12}
          md={6}
          lg={3}
          style={{
            color: "white",
            paddingBottom: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ImTwitter
            size={25}
            color="white"
            style={{ verticalAling: "middle" }}
          />{" "}
          NMA
        </Col>
        <Col
          sm={12}
          md={6}
          lg={3}
          style={{
            color: "white",
            paddingBottom: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <AiOutlineMail
            size={25}
            color="white"
            style={{ verticalAling: "middle" }}
          />{" "}
          contacto@nma.cl
        </Col>
      </Row>
    </div>
  );
};

export default Home;
