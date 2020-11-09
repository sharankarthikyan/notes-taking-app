import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React from "react";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Enter Below
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          className="form-control col-sm-6"
          onChange={(e) => props.change(e)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
