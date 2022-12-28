import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoesCard from "../components/shoesCard/ShoesCard";

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
      gender: userProfile?.gender,
      password: userProfile?.password,
    },
    onSubmit: (values) => {
      const actionAsync = updateProfileApi(values);
      dispatch(actionAsync);
    },
    enableReinitialize: true,
  });
  //Dispatch declare
  const dispatch = useDispatch();

  useEffect(() => {
    const actionAsync = getProfileApi();
    dispatch(actionAsync);
    const actionGetFav = getFavApi();
    dispatch(actionGetFav);
  }, []);
  //render order table
  const renderOrderTable = () => {
    const ordersHistory = userProfile?.ordersHistory;
    return ordersHistory?.map((order, index) => {
      const { date, orderDetail } = order;

      return (
        <div className="order__table mt-5">
          <p className="order__time">
            + Orders have been placed on {date.split("T")[0]}
          </p>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>
                  ID: <span className="text-danger">{order?.id}</span>
                </th>
                <th>IMG</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderDetail?.map((row, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={row.image} width={60} />
                    </td>
                    <td>{row.name}</td>
                    <td>{row.price}</td>
                    <td>{row.quantity}</td>
                    <td>{(row.price * row.quantity).toLocaleString()}</td>
                  </tr>
                );
              })}

              <tr>
                <td />
                <td />
                <td />
                <td />
                <td>
                  <b>Total: </b>
                </td>
                <td>
                  <b className="text-danger">
                    {orderDetail
                      .reduce((init, current) => {
                        let totalPerItem = current.price * current.quantity;
                        return (init += totalPerItem);
                      }, 0)
                      .toLocaleString()}
                  </b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    });
  };
  //render favorite item
  const renderFav = (data) => {
    return data?.map((item, index) => {
      return <ShoesCard item={item} />;
    });
  };
  // component return
  return (
    <>
      {/* PROFILE CONTAINER */}
      <section className="profile container">
        <div className="profile__wrap">
          <h1 className="profile__title">Profile</h1>
          <div className="profile__info">
            <div className="row mx-auto align-items-start">
              <div className="col-2">
                <img src={userProfile?.avatar} alt="..." className="mt-2" />
              </div>
              <form
                className="col-10 row"
                action="submit"
                onSubmit={frmProfile.handleSubmit}
              >
                <div className="col-6">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    defaultValue={userProfile?.email}
                    onChange={frmProfile.handleChange}
                    name="email"
                  />
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    defaultValue={userProfile?.phone}
                    onChange={frmProfile.handleChange}
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="name">Name</label>
                  <input
                    name="name"
                    type="text"
                    defaultValue={userProfile?.name}
                    onChange={frmProfile.handleChange}
                  />
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
                  <div className="profile__gender d-flex align-items-center">
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
                    <button type="submit" className="update-btn">
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
            {renderOrderTable()}
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
                {renderFav(userFav?.productsFavorite)}
                <div className="product__item card shadow">
                  <div className="card-header position-relative">
                    <div className="card-icon position-absolute">
                      <i className="fa fa-heart" aria-hidden="true" />
                    </div>
                    <img
                      src="./assets/img/image 5.png"
                      alt="itemImg"
                      className="w-100"
                    />
                  </div>
                  <div className="card-body p-0">
                    <div className="card-body-upper p-3">
                      <h3>Adidas Prophere</h3>
                      <p className="m-0">Short discription</p>
                    </div>
                    <div className="card-body-under d-flex align-items-center">
                      <button className="w-50 btn-buy">Buy now</button>
                      <div className="price-wrap w-50">
                        <p className="font-weight-bold text-right m-0">85$</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
