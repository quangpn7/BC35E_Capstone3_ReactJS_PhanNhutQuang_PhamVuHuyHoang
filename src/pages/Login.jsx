import React from "react";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import { loginApi } from "../redux/reducer/userReducer";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { FacebookLogin } from "react-facebook-login";
import LoginFacebook from "../components/LoginFacebook/LoginFacebook";

const Login = () => {
  const dispatch = useDispatch();
  const frmLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("*Invalid Email!").required("*Required!"),
      password: Yup.string().required("*Required"),
    }),
    onSubmit: (value) => {
      const loginAsync = loginApi(value);
      dispatch(loginAsync);
    },
  });

  return (
    <section className="login">
      <div className="login__wrap container">
        <h1>Login</h1>
        <hr />
        <div className="login__form d-flex justify-content-center">
          <form
            action="submit"
            className="d-flex flex-column justify-content-center"
            onSubmit={frmLogin.handleSubmit}
          >
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={frmLogin.handleChange}
              onBlur={frmLogin.handleBlur}
            />
            {frmLogin.errors.email && frmLogin.touched.email && (
              <span className="mt-2">{frmLogin.errors.email} </span>
            )}
            <label className="mt-4" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={frmLogin.handleChange}
              onBlur={frmLogin.handleBlur}
            />
            {frmLogin.errors.password && frmLogin.touched.password && (
              <span className="mt-2">{frmLogin.errors.password}</span>
            )}
            <div className="d-flex align-items-center justify-content-end login__option">
              <div className="col-4" />
              <a href="#" className="col-4 text-center">
                Register now ?
              </a>
              <button type="submit" className="btn-login col-4">
                Login
              </button>
            </div>
            <LoginFacebook />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
