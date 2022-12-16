import React from "react";
import ShoesCard from "../components/shoesCard/ShoesCard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { getProductDetailAction } from "../redux/reducer/productReducer";
const Detail = () => {
  const { productDetail } = useSelector((state) => state.productReducer);
  const params = useParams();
  const dispatch = useDispatch();

  const getproductById = async () => {
    const result = await axios({
      url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${params.id}`,
      method: "GET",
    });

    console.log("data", result.data.content);
    const action = getProductDetailAction(result.data.content);
    dispatch(action);
  };

  useEffect(() => {
    getproductById();
  }, [params.id]);

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-6 text-center mt-5">
          <img src={productDetail.image} alt="..." />
        </div>
        <div className="col-6">
          <div className="detail-text ">
            <h3 className="py-2">{productDetail?.name}</h3>
            <p className="py-2">{productDetail?.description}</p>
            <span className="py-2 text-success">available size</span>
            <ul className="py-3 size-list">
              {productDetail?.size?.map((size, index) => {
                return (
                  <li key={index} className="d-inline-block">
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
            <button className="btn btn-danger py-2">Add To Cart</button>
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
