import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

import TextField from "../../Common/TextField/TextField";
import * as authActions from "../../../Redux/slices/auth/authActions";
import "./Login.css";
import axios from "axios";

const initialValues = {
  userName: "",
  password: "",
  isChecked: false,
};

const loginFormSchema = Yup.object().shape({
  userName: Yup.string().required("Username is required."),
  password: Yup.string().required("Password is required."),
});

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [fromData, setFormData] = useState(initialValues);
  const [isVerfied, setIsVerified] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  const { user } = useSelector(({ auth }) => auth);

  useEffect(() => {
    if (user) history.replace("/dashboard");
  }, [user]);

  const handleFormSubmit = (values) => {
    dispatch(
      authActions.loginUser({
        userId: values.userName,
        password: values.password,
      })
    ).then((res) => {
      if (res && res.success) {
        history.push("/dashboard");
      }
    });
  };

  function verifyCaptcha() {
    setIsVerified(true);
  }

  const responseMessage = (response) => {
    var decoded = jwt_decode(response?.credential);
    const { given_name, family_name, email, picture } = decoded;
    const payload = {
      id: email,
      name: `${given_name} ${family_name}`,
      userName: email,
      emailId: email,
      password: "",
      phone: "",
      profileImage: picture,
    };
    dispatch(authActions.loginWithGoogle(payload)).then((res) => {
      if (res && res.success) {
        history.push("/dashboard");
      } else {
        dispatch(authActions.registerUser(payload)).then((res) => {});
      }
    });
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <>
      <Container className="center">
        <Row>
          <Card className="basic-info my-5">
            <Card.Body>
              <div className="line-title">
                <h2>User Login</h2>
              </div>
              <Formik
                enableReinitialize={true}
                initialValues={fromData}
                validationSchema={loginFormSchema}
                onSubmit={(values) => {
                  handleFormSubmit(values);
                }}
              >
                {({ handleSubmit, values, setFieldValue, errors, touched }) => {
                  return (
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <InputGroup>
                          <span
                            // className="password-icons checkemail"
                            className={
                              !errors.userName && values.userName != ""
                                ? " password-icons checkemail"
                                : "password-icons"
                            }
                          >
                            <i className="icon-check"></i>
                          </span>
                          <TextField
                            name="userName"
                            type="text"
                            placeholder="Enter Username"
                            value={values.userName}
                          />
                        </InputGroup>
                        <ErrorMessage
                          component="div"
                          className="input-error"
                          name="userName"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
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
                            value={values.password}
                          />
                        </InputGroup>
                        <ErrorMessage
                          component="div"
                          className="input-error"
                          name="password"
                        />
                      </Form.Group>

                      <div>
                        <ReCAPTCHA
                          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                          onChange={verifyCaptcha}
                        />
                      </div>
                      <Row>
                        <div className="login-button">
                          <Button
                            variant="primary"
                            type="submit"
                            disabled={!isVerfied}
                          >
                            Log In
                          </Button>
                          <div>
                            <Link to="/register">Create account</Link>
                          </div>
                        </div>
                      </Row>
                      <Row className="mt-3">
                        <Col md="3">
                          <GoogleLogin
                            disabled={!isVerfied}
                            onSuccess={responseMessage}
                            onError={errorMessage}
                          />
                        </Col>
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

export default Login;
