import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../BURL/BURL";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Login() {
  const notify = (msg, type) => {
    toast[type](msg);
  };

  let [loding, setloding] = useState(false);
  let navigate = useNavigate();
  let validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setloding(true);
      console.log(values);
      axios
        .post(`${baseUrl}/auth/signin`, values)
        .then((date) => {
          if (date.status === 200) {
            localStorage.setItem("token", date.data.token);
            console.log();
            setloding(false);
            notify("login success", "success");
            navigate("/");
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setloding(false);
            notify("invalided Email", "error");
            console.log(error);
          }
        });
    },
  });

  return (
    <>
      <div className="w-50 m-auto my-5">
        <h2>Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            onBlur={formik.handleBlur}
            className="form-control my-y3 mt-2 "
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : (
            ""
          )}

          <label htmlFor="password">password</label>
          <input
            onBlur={formik.handleBlur}
            className="form-control my-y3 mt-2 "
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger">{formik.errors.password}</div>
          ) : (
            ""
          )}
          <button
            disabled={!(formik.isValid && formik.dirty && !loding)}
            type="submit"
            className="btn bg-main text-white my-3"
          >
            {!loding ? "Login" : <i className="fas fa-spinner fa-spin"></i>}
          </button>
        </form>
      </div>
    </>
  );
}
