import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import fire from "../../fire";

const HomeMenuComponent = () => {
  const handleLogout = () => {
    fire.auth().signOut();
  };

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
              <Link to="/">
                <Button onClick={handleLogout} variant="outline-danger">
                  Logout
                </Button>
              </Link>
            </div>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default HomeMenuComponent;
