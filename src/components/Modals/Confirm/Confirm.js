import React, { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";

function ConfirmModal(props) {
  return (
    <Modal show={props?.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <p>Are you sure want to delete?</p>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            props.onSubmit();
            props.onClose();
          }}
        >
          Yes
        </Button>
        <Button variant="secondary" onClick={props.onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
