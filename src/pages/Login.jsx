import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import * as Yup from "yup";
import TextError from "../components/TextError";
import { Link, useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required !"),
  password: Yup.string().required("Required !"),
});

const Login = () => {
  const navigate = useNavigate();

  const [err, setErr] = useState(false);
  const [error, setError] = useState("");
  const [haserror, setHasError] = useState(false);
  const onSubmit = async (values, submitProps) => {
    console.log("Form data", values);

    const email = values.email;
    const password = values.password;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err);
      setHasError(true);
    }
    submitProps.setSubmitting(false);
    submitProps.resetForm();
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center  bg-secondary">
      <div className="w-2/4 h-2/4">
        <div className="w-full h-full flex flex-col justify-evenly  bg-gray rounded-lg">
          <div className="flex-4 h-1/4 flex flex-col justify-around">
            <h1 className="font-bold text-center text-2xl text-navy">
              Let's chat
            </h1>
            <p className="font-bold text-center text-lg">Login</p>
            {haserror && (
              <span className="text-center text-red-600 ">
                Something went wrong
              </span>
            )}
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form className="flex flex-col items-center justify-around  h-1/2">
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="p-2 rounded-lg w-1/3"
                    placeholder="Enter email"
                  />
                  <ErrorMessage name="email" component={TextError} />
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="p-2 rounded-lg w-1/3"
                    placeholder="Enter password"
                  />
                  <ErrorMessage name="email" component={TextError} />
                  <button
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                    className="p-3 font-bold bg-navy text-white rounded-lg w-1/3 cursor-pointer "
                  >
                    Submit
                  </button>
                </Form>
              );
            }}
          </Formik>

          <p className="text-center">
            Don't have an account?
            <Link
              to="/register"
              className="underline decoration-solid text-blue"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
