import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const MenuComponent = () => {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <div className="container">
          <Navbar.Brand
            className="font-weight-bold"
            href="#home"
            style={{ fontFamily: "Dancing Script" }}
          >
            Double Star
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="ml-auto ">
              <Link className="mr-2" to="/signup">
                <Button variant="outline-primary">Signup</Button>
              </Link>
              <Link to="/">
                <Button variant="outline-success">Login</Button>
              </Link>
            </div>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default MenuComponent;
