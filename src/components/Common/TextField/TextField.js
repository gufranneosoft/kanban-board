import React from "react";
import { useField } from "formik";
import { Form } from "react-bootstrap";

const TextField = ({ label, isRequired = true, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Form.Control
      className="inputField"
      {...field}
      {...props}
      autoComplete="off"
    />
  );
};

export default TextField;
