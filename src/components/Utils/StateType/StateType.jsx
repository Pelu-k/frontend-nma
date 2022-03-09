import React from "react";
import { Badge } from "react-bootstrap";

const StateType = (props) => {
  return (
    <div>
      {props.state.toUpperCase() === "FINALIZADA" ? (
        <>
          <Badge pill bg="success">
            FINALIZADA
          </Badge>{" "}
          {props.name ? props.name : null}
        </>
      ) : props.state.toUpperCase() === "CANCELADA" ? (
        <>
          <Badge pill bg="danger">
            CANCELADA
          </Badge>{" "}
          {props.name ? props.name : null}
        </>
      ) : props.state.toUpperCase() === "APROBADO" ? (
        <>
          <Badge pill bg="primary">
            APROBADO
          </Badge>{" "}
          {props.name ? props.name : null}
        </>
      ) : props.state.toUpperCase() === "EN APROBACION" ? (
        <>
          <Badge pill bg="warning" text="dark">
            EN APROBACION
          </Badge>{" "}
          {props.name ? props.name : null}
        </>
      ) : null}
    </div>
  );
};

export default StateType;
