import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});
const initialValues = { email: "", password: "" };

const ExampleLogIn = () => {
  return (
    <>
      <Formik
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={(values) => {
          // Alert the input values of the form that we filled
          alert(JSON.stringify(values));
        }}
      ></Formik>
    </>
  );
};

export default ExampleLogIn;
