import React, { useEffect } from "react";
import axios from "axios";
import { ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";

const Register = () => {
  //POST user input function
  const handleSignUp = async (data) => {
    const promise = await axios({
      url: "https://shop.cyberlearn.vn/api/Users/signup",
      method: "POST",
      data: data,
    })
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //Setup formik
  const frmSignup = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "", // this prop will not be sent
      name: "",
      gender: true,
      phone: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email").required("*Required!"),
      password: Yup.string()
        .min(8, "*Minimum 8 characters")
        .max(16, "*Maximum 16 characters")
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/,
          "*At least 1 special characters, Uppercase and lowercase!"
        )
        .required("*Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "*Password is not match!")
        .required("*Required"),
      name: Yup.string()
        .matches(
          "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
          "*Name is not valid!"
        )
        .required("*Required!"),
      gender: Yup.boolean().required("*Required"),
      phone: Yup.string()
        .matches(/^[0-9]+$/)
        .min(6, "*Phone is not valid!")
        .max(15, "*Phone is not valid!")
        .required("*Required!"),
    }),
    //handle submit event
    onSubmit: (value) => {
      const { ["confirmPassword"]: remove, ...userData } = value; //remove un-wanted data
      console.log(userData);
      handleSignUp(userData);
      let frm = document.getElementsByName("formRegister")[0];
      frm.reset();
    },
  });

  return (
    <section className="register">
      <h1 className="register__title">Register</h1>
      <form
        name="formRegister"
        action="submit"
        onSubmit={frmSignup.handleSubmit}
      >
        <div className="register__form register__wrap row justify-content-between">
          {/* LEFT */}

          <div className="register__left col-md-6 col-lg-6>">
            {/* EMAIL */}
            <div className="register__email input-field">
              <input
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                onChange={frmSignup.handleChange}
                onBlur={frmSignup.handleBlur}
              />
            </div>
            {frmSignup.errors.email && frmSignup.touched.email && (
              <p className="register__invalid">{frmSignup.errors.email}</p>
            )}
            {/* PASSWORD */}
            <div className="register__password input-field">
              <input
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                onChange={frmSignup.handleChange}
                onBlur={frmSignup.handleBlur}
              />
            </div>
            {frmSignup.errors.password && frmSignup.touched.password && (
              <p className="register__invalid">{frmSignup.errors.password}</p>
            )}
            <div className="register__password input-field">
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                onChange={frmSignup.handleChange}
                onBlur={frmSignup.handleBlur}
              />
            </div>
            {frmSignup.errors.confirmPassword &&
              frmSignup.touched.confirmPassword && (
                <p className="register__invalid">
                  {frmSignup.errors.confirmPassword}
                </p>
              )}
          </div>
          {/* RIGHT */}
          <div className="register__right col-md-6 col-lg-6">
            {/* NAME */}
            <div className="register__name input-field">
              <input
                id="name"
                type="text"
                placeholder="Name"
                name="name"
                onChange={frmSignup.handleChange}
                onBlur={frmSignup.handleBlur}
              />
            </div>
            {frmSignup.errors.name && frmSignup.touched.name && (
              <p className="register__invalid">{frmSignup.errors.name}</p>
            )}
            {/* PHONE */}
            <div className="register__phoneNumber input-field">
              <input
                id="phone"
                type="text"
                placeholder="Phone"
                name="phone"
                onChange={frmSignup.handleChange}
                onBlur={frmSignup.handleBlur}
              />
            </div>
            {frmSignup.errors.phone && frmSignup.touched.phone && (
              <p className="register__invalid">{frmSignup.errors.phone}</p>
            )}
            {/* GENDER */}
            <div className="register__gender d-flex align-items-center input-field justify-content-center">
              <span className="labelGender">Gender</span>
              <input
                type="radio"
                id="genderMale"
                name="gender"
                defaultValue="true"
                defaultChecked
                onChange={frmSignup.handleChange}
              />
              <label htmlFor="genderMale">Male</label>
              <input
                type="radio"
                id="genderFemale"
                name="gender"
                defaultValue="false"
                onChange={frmSignup.handleChange}
              />
              <label htmlFor="genderFemale">Female</label>
              <br />
            </div>
            <button type="submit" className="btn btn-submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Register;
