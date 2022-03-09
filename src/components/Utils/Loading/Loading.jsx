import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <Spinner
      animation="border"
      variant="primary"
      className="mt-5"
      style={{
        display: "block",
        "marginRight": "auto",
        "marginLeft": "auto",
      }}
    />
  );
};

export default Loading;
