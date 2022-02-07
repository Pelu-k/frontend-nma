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
        "margin-right": "auto",
        "margin-left": "auto",
      }}
    />
  );
};

export default Loading;
