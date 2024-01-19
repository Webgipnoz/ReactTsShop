import React from "react";
import { Container } from "react-bootstrap";

const ErrorPage = () => {
  return (
    <Container className="text-center mt-5">
      <h1>Sorry, this page doesn't exist</h1>
      <span
        role="img"
        aria-label="Sad Face"
        style={{ fontSize: "50px", display: "block", marginTop: "20px" }}
      >
        😞
      </span>
    </Container>
  );
};

export default ErrorPage;
