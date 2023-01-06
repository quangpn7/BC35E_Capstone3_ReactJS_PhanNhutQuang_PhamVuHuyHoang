import { Pagination } from "antd";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Favourite } from "../components/Favorite/Favorite";
import { OrderHistoryTable } from "../components/OrderHistory/OrderHistoryTable";

import {
  getFavApi,
  getProfileApi,
  updateProfileApi,
} from "../redux/reducer/userReducer";

const Profile = () => {
  const { userProfile, userFav } = useSelector((state) => state.userReducer);

  const frmProfile = useFormik({
    initialValues: {
      email: userProfile?.email,
      name: userProfile?.name,
      phone: userProfile?.phone,
      gender: String(userProfile?.gender),
      password: userProfile?.password,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("*Invalid email").required("*Required!"),
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
        .matches(/^[0-9]+$/, "*Invalid phone number")
        .min(6, "*Phone is not valid!")
        .max(15, "*Phone is not valid!")
        .required("*Required!"),
    }),
    onSubmit: (values) => {
      const actionAsync = updateProfileApi(values);
      dispatch(actionAsync);
    },
    enableReinitialize: true,
  });

  //Dispatch declare
  const dispatch = useDispatch();

  //Pagination handle
  const [current, setCurrent] = useState(1);

  const [minIndex, setMinIndex] = useState(0);

  const [maxIndex, setMaxIndex] = useState(10);

  const handlePagiChange = (page) => {
    setCurrent(page);
    setMinIndex((page - 1) * 10);
    setMaxIndex(page * 10);
  };
  //useEffect
  useEffect(() => {
    //run at mounting
    const actionAsync = getProfileApi();
    dispatch(actionAsync);
    const actionAsyncFavorite = getFavApi();
    dispatch(actionAsyncFavorite);
  }, []);
  // component return

  return (
    <>
      {/* PROFILE CONTAINER */}
      <section className="profile container">
        <div className="profile__wrap">
          <h1 className="profile__title">Profile</h1>
          <div className="profile__info">
            <div className="row mx-auto align-items-start">
              <div className="col-lg-2 col-12">
                <img src={userProfile?.avatar} alt="..." className="mt-2" />
              </div>
              <form
                className="col-lg-10 col-12 row"
                action="submit"
                onSubmit={frmProfile.handleSubmit}
              >
                <div className="col-12 col-md-6">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    defaultValue={userProfile?.email}
                    onChange={frmProfile.handleChange}
                    name="email"
                  />
                  {frmProfile.errors.email && frmProfile.touched.email && (
                    <p className="text-danger font-italic">
                      {frmProfile.errors.email}
                    </p>
                  )}
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    defaultValue={userProfile?.phone}
                    onChange={frmProfile.handleChange}
                  />
                  {frmProfile.errors.phone && frmProfile.touched.phone && (
                    <p className="text-danger font-italic">
                      {frmProfile.errors.phone}
                    </p>
                  )}
                </div>
                <div className="col-12 col-md-6">
                  <label htmlFor="name">Name</label>
                  <input
                    name="name"
                    type="text"
                    defaultValue={userProfile?.name}
                    onChange={frmProfile.handleChange}
                  />
                  {frmProfile.errors.name && frmProfile.touched.name && (
                    <p className="font-italic text-danger">
                      {frmProfile.errors.name}
                    </p>
                  )}
                  <label htmlFor="password">Password</label>
                  <button
                    className="btn btn-primary btn-lg mb-4"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    type="button"
                    onClick={() =>
                      dispatch({
                        type: "CHANGE_PASS_MODAL",
                      })
                    }
                  >
                    Change password
                  </button>
                  <div className="profile__gender d-lg-flex align-items-center">
                    <div className="d-flex align-items-center">
                      <label htmlFor="gender" className="pb-4">
                        Gender
                      </label>
                      <div className="gender-male text-center">
                        <input
                          type="radio"
                          value={true}
                          name="gender"
                          className="d-block mb-3"
                          defaultChecked={userProfile?.gender}
                          onChange={frmProfile.handleChange}
                        />
                        <label htmlFor="genderMale">Male</label>
                      </div>
                      <div className="gender-female text-center">
                        <input
                          type="radio"
                          value={false}
                          name="gender"
                          defaultChecked={!userProfile?.gender}
                          className="d-block mb-3"
                          onChange={frmProfile.handleChange}
                        />
                        <label htmlFor="genderFemale">Female</label>
                      </div>
                    </div>
                    <button
                      type="submit"
                      onClick={frmProfile.handleSubmit}
                      className="update-btn"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <hr className="mb-0" />
      </section>
      {/* ORDER CONTAINER */}
      <section className="order container">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="home-tab"
              data-toggle="tab"
              data-target="#orderHistory"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Order history
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="profile-tab"
              data-toggle="tab"
              data-target="#favourite"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              Favourite
            </button>
          </li>
        </ul>
        <div className="tab-content mt-5" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="orderHistory"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            {OrderHistoryTable(userProfile?.ordersHistory, minIndex, maxIndex)}
            <Pagination
              className="text-right"
              showSizeChanger={false}
              current={current}
              pageSize={10}
              total={userProfile?.ordersHistory.length}
              onChange={handlePagiChange}
            />
          </div>
          <div
            className="tab-pane fade"
            id="favourite"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div className="product__content">
              <div className="product__grid row" id="productHolder">
                {/* standard card */}
                {Favourite(userFav?.productsFavorite)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
