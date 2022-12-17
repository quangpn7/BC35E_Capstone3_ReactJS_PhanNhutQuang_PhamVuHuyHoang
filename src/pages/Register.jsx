import React from "react";
import axios from "axios";
import { useFormik } from "formik";

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
    //handle submit event
    onSubmit: (value) => {
      const { ["confirmPassword"]: remove, ...userData } = value; //remove unwanted data
      console.log(userData);
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
              />
              <span id="emailRequired" className="inputRequired">
                (*)
              </span>
            </div>
            <p className="register__invalid" id="emailErr">
              No valid
            </p>
            {/* PASSWORD */}
            <div className="register__password input-field">
              <input
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                onChange={frmSignup.handleChange}
              />
              <span id="passRequired" className="inputRequired">
                (*)
              </span>
            </div>
            <p className="register__invalid" id="passErr">
              * Mật khẩu không hợp lệ
            </p>
            <div className="register__password input-field">
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                onChange={frmSignup.handleChange}
              />
              <span id="passConRequired" className="inputRequired">
                (*)
              </span>
            </div>
            <p className="register__invalid" id="confirmPassErr">
              * Mật khẩu không trùng khớp
            </p>
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
              />
              <span id="nameRequired" className="inputRequired">
                (*)
              </span>
            </div>
            <p id="nameErr" className="register__invalid">
              * Tên không hợp lệ
            </p>
            {/* PHONE */}
            <div className="register__phoneNumber input-field">
              <input
                id="phone"
                type="text"
                placeholder="Phone"
                name="phone"
                onChange={frmSignup.handleChange}
              />
              <span id="phoneRequired" className="inputRequired">
                (*)
              </span>
            </div>
            <p id="phoneErr" className="register__invalid">
              * Số điện thoại không hợp lệ
            </p>
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
              <p id="genderErr" className="register__invalid">
                * Vui lòng chọn giới tính
              </p>
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
