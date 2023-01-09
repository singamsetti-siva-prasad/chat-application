import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "../components/TextError";
import logogreen from "../images/logogreen.png";

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
      setHasError(true);
      setLoading(false);
    }
    submitProps.setSubmitting(false);
    submitProps.resetForm();
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray">
      <div className="w-2/4 h-2/3 md:h-4/5 md:w-4/5  ">
        <div className="w-full h-full flex flex-col justify-around bg-primary rounded-lg p-1">
          <div className="flex flex-col items-center">
            <img className="w-1/2 h-10 object-contain" src={logogreen} />
            <p className="font-bold text-center text-lg md:text-sm">Register</p>

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
                    className="p-2 rounded-lg w-2/5  md:w-3/4 placeholder:text-[12px] "
                    placeholder="User name"
                    autoComplete="off"
                  />
                  <ErrorMessage name="email" component={TextError} />
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="p-2 rounded-lg w-2/5 md:w-3/4 placeholder:text-[12px] "
                    placeholder="Enter email"
                    autoComplete="off"
                  />
                  <ErrorMessage name="email" component={TextError} />
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="p-2 rounded-lg w-2/5 md:w-3/4 placeholder:text-[12px] "
                    placeholder="Enter password"
                    autoComplete="off"
                  />
                  <ErrorMessage name="email" component={TextError} />
                  <input
                    type="file"
                    id="file"
                    accept=".jpg, .png"
                    className="p-2 rounded-lg w-2/5 md:w-3/4 placeholder:text-[12px]"
                    autoComplete="off"
                    onChange={(e) => {
                      formik.setFieldValue("file", e.target.files[0]);
                    }}
                  />
                  <button
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                    className="p-3 font-bold bg-navy text-white rounded-lg w-2/5 cursor-pointer text-xs "
                  >
                    Sign Up
                  </button>
                </Form>
              );
            }}
          </Formik>

          <p className="text-center md:text-sm">
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
