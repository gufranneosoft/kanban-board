import React, { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

import * as boardActions from "../../../Redux/slices/board/boardActions";
import TextField from "../../Common/TextField/TextField";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const initialValues = {
  name: "",
  priority: "",
  deadline: "",
};

const basicInfoSchema = Yup.object().shape({
  name: Yup.string().required("Name is required.").nullable(),
  priority: Yup.string().required("Priority is required."),
  deadline: Yup.string().required("Deadline is required."),
});

function CardInfo(props) {
  const { boardId, onClose, data } = props;
  const [formData, setFormData] = useState(initialValues);
  const { boards } = useSelector(({ board }) => board);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      const { name, priority, deadline } = data;
      setFormData({
        name,
        priority: priority.title,
        deadline,
      });
    }
  }, [data]);

  const getColor = (priority) => {
    if (priority === "high") return "#ff0000";
    if (priority === "medium") return "#747420";
    if (priority === "low") return "#00cb00";
  };

  const handleFormSubmit = (values) => {
    let task;
    let bds = JSON.parse(JSON.stringify(boards));
    if (props.isEditMode) {
      task = {
        ...props.data,
        name: values?.name,
        priority: { title: values.priority, color: getColor(values.priority) },
        deadline: values?.deadline,
      };
      const boardIndex = bds.findIndex((b) => b.id === props.boardId);
      const c_index = bds[boardIndex].cards.findIndex((c) => c.id == task.id);
      bds[boardIndex].cards[c_index] = task;
      dispatch(boardActions.updateBoard(bds));
      onClose();
    } else {
      task = {
        id: Date.now(),
        name: values?.name,
        stage: 0,
        priority: { title: values.priority, color: getColor(values.priority) },
        deadline: values?.deadline,
      };
      const boardIndex = bds.findIndex((board) => board.id === boardId);
      bds[boardIndex].cards = [...bds[boardIndex].cards, task];
      dispatch(boardActions.updateBoard(bds));
      onClose();
    }
    toast.success(props.isEditMode ? "Task updated!" : "Task created!");
  };

  return (
    <Modal show={props?.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          enableReinitialize={true}
          initialValues={formData}
          validationSchema={basicInfoSchema}
          onSubmit={(values) => {
            handleFormSubmit(values);
          }}
        >
          {({ handleSubmit, values, setFieldValue, errors, touched }) => {
            return (
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col} md="12">
                    <Form.Label>Name*</Form.Label>
                    <InputGroup>
                      <TextField
                        name="name"
                        type="text"
                        placeholder="Enter Task Name"
                      />
                    </InputGroup>
                    <ErrorMessage
                      component="div"
                      className="input-error"
                      name="name"
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="12">
                    <Form.Label>Priority*</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      name="priority"
                      onChange={(e) => {
                        setFieldValue("priority", e.target.value);
                      }}
                      value={props?.data?.priority?.title}
                    >
                      <option>Select Priority</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </Form.Select>
                    <ErrorMessage
                      component="div"
                      className="input-error"
                      name="priority"
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="12">
                    <Form.Label>Deadline*</Form.Label>
                    <InputGroup>
                      <Form.Control
                        name="deadline"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => {
                          setFieldValue(
                            "deadline",
                            new Date(e.target.value).toISOString().split("T")[0]
                          );
                        }}
                        value={values.deadline}
                      />
                    </InputGroup>
                    <ErrorMessage
                      component="div"
                      className="input-error"
                      name="deadline"
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Col md="12">
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      {props?.isEditMode ? "Update Task" : "Create Task"}
                    </Button>
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CardInfo;
