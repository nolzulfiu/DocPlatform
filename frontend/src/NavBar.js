import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { withRouter } from "react-router-dom";

function TopBar() {
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Navbar.Brand href="/">Home</Navbar.Brand>
    </Navbar>
  );
}
export default withRouter(TopBar);