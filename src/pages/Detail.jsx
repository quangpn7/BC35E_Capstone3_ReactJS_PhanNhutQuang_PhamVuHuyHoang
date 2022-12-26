import React from "react";
import ShoesCard from "../components/shoesCard/ShoesCard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import {
  getProductByIdApi,
  addGioHangAction,
} from "../redux/reducer/productReducer";
import { NavLink } from "react-router-dom";
const Detail = () => {
  const { arrProduct, productDetail } = useSelector(
    (state) => state.productReducer
  );
  const params = useParams();
  const dispatch = useDispatch();

  const getproductById = async () => {
    const action = getProductByIdApi(params.id);
    dispatch(action);
  };

  useEffect(() => {
    getproductById();
  }, [params.id]);

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-6 text-center mt-5">
          <img src={productDetail?.image} alt="..." />
        </div>
        <div className="col-6">
          <div className="detail-text ">
            <h3 className="py-2">{productDetail?.name}</h3>
            <p className="py-2">{productDetail?.description}</p>
            <span className="py-2 text-success">available size</span>
            <ul className="py-3 size-list">
              {productDetail?.size?.map((size, index) => {
                return (
                  <li key={index} className="d-inline-block btn">
                    <a className="size-num">{size}</a>
                  </li>
                );
              })}
            </ul>
            <a className="text-danger py-2 price" href="#">
              {productDetail?.price} $
            </a>
            <div className="counter py-3">
              <div className="btn btn-size">+</div>
              <div className="count px-4">2</div>
              <div className="btn btn-size">-</div>
            </div>
            <NavLink
              to="/Carts"
              className="btn btn-danger py-2"
              onClick={() => {
                const itemCart = { ...productDetail, quantity: 1 };
                const action = addGioHangAction(itemCart);
                console.log("action123", action);
                dispatch(action);
              }}
            >
              Add To Cart
            </NavLink>
          </div>
        </div>
      </div>

      <div className="my-5">
        <h2 className="text-center">Realated Product</h2>
        <div className="row mt-5">
          {productDetail?.relatedProducts?.map((item, index) => {
            return (
              <div className="col-4" key={index}>
                <ShoesCard item={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Detail;
