import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "../components/TextError";

const initialValues = {
  userName: "",
  email: "",
  password: "",
  file: "",
};
const validationSchema = Yup.object().shape({
  userName: Yup.string().required("Required !"),
  email: Yup.string().email("Invaild Email Address").required("Required !"),
  password: Yup.string().required("Required !"),
});

const Register = () => {
  const navigate = useNavigate();

  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [haserror, setHasError] = useState(false);

  const onSubmit = async (values, submitProps) => {
    console.log("Form data", values);
    setLoading(true);

    const displayName = values.userName;
    const email = values.email;
    const password = values.password;
    const file = values.file;

    try {
      //creating a user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //creating a u storage ref with our storage and with unique image name

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //updating user with displayname and photoURL in storage
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            //creating user collection in firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            setError(err);
            setLoading(false);
            setHasError(true);
          }
        });
      });
    } catch (err) {
      setError(err);
      console.log("from bottom", err);
      setHasError(true);
      setLoading(false);
    }
    submitProps.setSubmitting(false);
    submitProps.resetForm();
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-secondary">
      <div className="w-2/4 h-2/3  ">
        <div className="w-full h-full flex flex-col justify-around bg-gray rounded-lg">
          <div className="flex flex-col ">
            <h1 className="font-bold text-center text-2xl text-navy">
              Let's chat
            </h1>
            <p className="font-bold text-center text-lg">Register</p>

            {haserror && (
              <span className="decoration-solid text-blue">
                {error.message}
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
                <Form className="flex flex-col items-center justify-around  h-3/4">
                  <Field
                    type="text"
                    id="userName"
                    name="userName"
                    className="p-2 rounded-lg w-1/3 "
                    placeholder="User name"
                  />
                  <ErrorMessage name="email" component={TextError} />
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="p-2 rounded-lg w-1/3 "
                    placeholder="Enter email"
                  />
                  <ErrorMessage name="email" component={TextError} />
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="p-2 rounded-lg w-1/3 "
                    placeholder="Enter password"
                  />
                  <ErrorMessage name="email" component={TextError} />
                  <input
                    type="file"
                    id="file"
                    accept=".jpg, .png"
                    className="p-2 rounded-lg w-1/3 "
                    onChange={(e) => {
                      formik.setFieldValue("file", e.target.files[0]);
                    }}
                  />
                  <button
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                    className="p-3 font-bold bg-navy text-white rounded-lg w-1/3 cursor-pointer "
                  >
                    Sign Up
                  </button>
                </Form>
              );
            }}
          </Formik>

          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="underline decoration-solid">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
