import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

import TextField from "../../Common/TextField/TextField";
import * as authActions from "../../../Redux/slices/auth/authActions";
import "./Register.css";

const initialValues = {
  name: "",
  userName: "",
  emailId: "",
  password: "",
  phone: "",
  profileImage: "",
};

const basicInfoSchema = Yup.object().shape({
  name: Yup.string().required("Name is required."),
  userName: Yup.string()
    .required("Username is required.")
    .min(3, "Minimum three characters required"),
  emailId: Yup.string()
    .email("Please enter a valid email id")
    .required("Email is required.")
    .nullable(),
  password: Yup.string().required("Password is required.").min(4),
});

const Register = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [formData, setFormData] = useState(initialValues);

  const { user } = useSelector(({ auth }) => auth);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (user) history.replace("/dashboard");
  }, []);

  const handleFormSubmit = (values) => {
    const payload = {
      id: values.userName,
      name: values.name,
      userName: values.userName,
      emailId: values.emailId,
      password: values.password,
      phone: values.phone,
      profileImage: values.profileImage,
    };

    dispatch(authActions.registerUser(payload)).then((res) => {
      if (res && res.success) {
        history.push("/dashboard");
      }
    });
  };

  return (
    <>
      <Container className="center">
        <Row>
          <Card className="basic-info my-3">
            <Card.Body>
              <div className="line-title">
                <h2>User Registration</h2>
              </div>
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
                              placeholder="Enter Your Name"
                              maxLength={20}
                            />
                          </InputGroup>
                          <ErrorMessage
                            component="div"
                            className="input-error"
                            name="name"
                          />
                        </Form.Group>
                      </Row>
                      <Row>
                        <Form.Group as={Col} md="12">
                          <Form.Label>Username*</Form.Label>
                          <InputGroup>
                            <TextField
                              name="userName"
                              type="text"
                              placeholder="Enter Username"
                              maxLength={20}
                              oninput={
                                (values.userName = values?.userName?.replace(
                                  /[^a-z0-9]/gi,
                                  ""
                                ))
                              }
                            />
                          </InputGroup>
                          <ErrorMessage
                            component="div"
                            className="input-error"
                            name="userName"
                          />
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group as={Col} md="12">
                          <Form.Label>Email Address*</Form.Label>
                          <InputGroup>
                            <span
                              className={
                                !errors.emailId && values.emailId != ""
                                  ? " password-icons checkemail"
                                  : "password-icons"
                              }
                            >
                              <i className="icon-check"></i>
                            </span>
                            <TextField
                              name="emailId"
                              type="text"
                              placeholder="Enter Your Email"
                            />
                          </InputGroup>

                          <ErrorMessage
                            component="div"
                            className="input-error"
                            name="emailId"
                          />
                        </Form.Group>
                      </Row>

                      <Row className="mb-3">
                        <Form.Group as={Col} md="12">
                          <Form.Label>Contact Number</Form.Label>
                          <InputGroup>
                            <TextField
                              name="phone"
                              type="text"
                              placeholder="Enter Your Phone"
                              maxLength="12"
                              oninput={
                                (values.phone = values?.phone
                                  ?.replace(/[^0-9.]/g, "")
                                  ?.replace(/(\..*?)\..*/g, "$1"))
                              }
                            />
                          </InputGroup>
                        </Form.Group>
                      </Row>

                      <Row className="mb-3">
                        <Form.Group as={Col} md="12">
                          <Form.Label>Password*</Form.Label>
                          <InputGroup>
                            <span
                              className="password-icons"
                              onClick={() =>
                                setPasswordType((prev) =>
                                  prev === "password" ? "text" : "password"
                                )
                              }
                            >
                              <i
                                className={`${
                                  passwordType === "password"
                                    ? "icon-eye-off"
                                    : "icon-eye-on"
                                }`}
                              ></i>
                            </span>
                            <TextField
                              name="password"
                              type={passwordType}
                              placeholder="Enter Your Password"
                              autoComplete="off"
                            />
                          </InputGroup>
                          <ErrorMessage
                            component="div"
                            className="input-error"
                            name="password"
                          />
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group as={Col} md="12">
                          <Form.Label>Profile Image</Form.Label>
                          <InputGroup>
                            <Form.Control
                              name="profileImage"
                              type="file"
                              min={new Date()}
                              onChange={(e) => {
                                setFieldValue(
                                  "profileImage",
                                  URL.createObjectURL(e.target.files[0])
                                );
                              }}
                            />
                          </InputGroup>
                          {values.profileImage && (
                            <img
                              alt="profile_image"
                              src={values.profileImage}
                              style={{ width: "50px", height: "50px" }}
                            />
                          )}
                        </Form.Group>
                      </Row>
                      <Row>
                        <div className="login-button">
                          <Button
                            variant="primary"
                            type="button"
                            onClick={() => {
                              handleSubmit();
                            }}
                          >
                            Register
                          </Button>

                          <div>
                            <Link to="/login" style={{ textAlign: "center" }}>
                              Sign in instead
                            </Link>
                          </div>
                        </div>
                      </Row>
                    </Form>
                  );
                }}
              </Formik>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  );
};

export default Register;
