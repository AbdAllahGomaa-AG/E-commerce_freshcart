import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../BURL/BURL";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Registration() {
  const notify = (msg, type) => {
    toast[type](msg);
  };

  let [loding, setloding] = useState(false);
  let navigate = useNavigate();
  let validationSchema = Yup.object({
    name: Yup.string().min(3).max(15).required(),
    email: Yup.string().email().required(),
    password: Yup.string()
      .matches(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/, "password is required")
      .required(),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "password and rePassword not  math ")
      .required(),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setloding(true);
      console.log(values);
      axios
        .post(`${baseUrl}/auth/signup`, values)
        .then((date) => {
          if (date.status === 201) {
            setloding(false);
            notify("success", "success");
            navigate("/login");
          }
        })
        .catch((error) => {
          if (error.response.status === 409) {
            setloding(false);
            notify("account already exists","error");
            console.log(error);
          }
        });
    },
  });

  return (
    <>
      <div className="w-50 m-auto my-5">
        <h2>Registration</h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            onBlur={formik.handleBlur}
            className="form-control my-y3 mt-2 "
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger">{formik.errors.name}</div>
          ) : (
            ""
          )}

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

          <label htmlFor="rePassword">Repassed</label>
          <input
            onBlur={formik.handleBlur}
            className="form-control my-y3 mt-2 "
            id="rePassword"
            name="rePassword"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.rePassword}
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger">{formik.errors.rePassword}</div>
          ) : (
            ""
          )}
          <button
            disabled={!(formik.isValid && formik.dirty && !loding)}
            type="submit"
            className="btn bg-main text-white my-3"
          >
            {!loding ? (
              "Registration"
            ) : (
              <i className="fas fa-spinner fa-spin"></i>
            )}
          </button>
        </form>
      </div>
    </>
  );
}
