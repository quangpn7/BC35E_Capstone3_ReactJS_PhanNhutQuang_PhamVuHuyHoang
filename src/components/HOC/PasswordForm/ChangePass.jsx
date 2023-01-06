import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { getCookie, TOKEN } from "../../../utils/config";

const ChangePass = () => {
  //handle change password
  const changePassword = async (newPasswordObj) => {
    let result = await axios({
      url: "https://shop.cyberlearn.vn/api/Users/changePassword",
      method: "POST",
      headers: {
        Authorization: `Bearer ${getCookie(TOKEN)}`,
      },
      data: newPasswordObj,
    }).then(() => {
      toast.success("Updated password!");
    });
  };
  //handle get form input
  const frmUpdatePass = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      newPassword: Yup.string()
        .min(8, "*Minimum 8 characters")
        .max(16, "*Maximum 16 characters")
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/,
          "*At least 1 special characters, Uppercase and lowercase!"
        )
        .required("*Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "*Password is not match!")
        .required("*Required"),
    }),
    onSubmit: (values) => {
      changePassword({ newPassword: values.newPassword });
    },
  });
  //component return
  return (
    <form
      action="submit"
      className="w-50 mx-auto"
      onSubmit={frmUpdatePass.handleSubmit}
    >
      <label htmlFor="newPassword">Insert new password</label>
      <input
        type="password"
        name="newPassword"
        className="form-control"
        onChange={frmUpdatePass.handleChange}
      />
      {frmUpdatePass.errors.newPassword &&
        frmUpdatePass.touched.newPassword && (
          <p className="mt-1 text-danger font-italic">
            {frmUpdatePass.errors.newPassword}
          </p>
        )}
      <label htmlFor="newPassword" className="mt-4">
        Confirm your new password
      </label>
      <input
        type="password"
        name="confirmPassword"
        className="form-control"
        onChange={frmUpdatePass.handleChange}
      />
      {frmUpdatePass.errors.confirmPassword &&
        frmUpdatePass.touched.confirmPassword && (
          <p className="mt-1 text-danger font-italic">
            {frmUpdatePass.errors.confirmPassword}
          </p>
        )}
      <button
        type="submit"
        className="btn btn-primary mt-3 px-4 d-block mr-0 ml-auto"
      >
        Save
      </button>
    </form>
  );
};

export default ChangePass;
