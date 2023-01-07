import React from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { useState, useEffect } from "react";
import ShoesCard from "../components/shoesCard/ShoesCard";
const DemoUseSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [arrProduct, setArrProduct] = useState([]);

  let keyword = searchParams.get("k");
  const frm = useFormik({
    initialValues: {
      keyword: "",
    },
    onSubmit: (values) => {
      console.log(values);

      setSearchParams({
        k: values.keyword,
      });
    },
  });

  const getProductByKeyword = async () => {
    if (keyword) {
      const result = await axios({
        url: `https://shop.cyberlearn.vn/api/Product?keyword=${keyword}`,
        method: "GET",
      });
      setArrProduct(result.data.content);
      console.log(result.data.content);
    }
  };

  useEffect(() => {
    // call api
    getProductByKeyword();
  }, [keyword]);

  return (
    <div className="container">
      <h3 className="mt-5">Search</h3>
      <form className="form-group" onSubmit={frm.handleSubmit}>
        <p>Nhap Ten San Pham</p>
        <input
          className="form-control"
          name="keyword"
          onChange={frm.handleChange}
        />
        <button type="submit" className="btn btn-success mt-3">
          Search
        </button>
      </form>
      <h3>Ket Qua Tim Kiem ({arrProduct.length})</h3>
      <div className="row">
        {arrProduct.map((item, index) => {
          return (
            <div
              className="col-xl-4 col-md-6 col-12 mb-4 text-left "
              key={index}
            >
              <ShoesCard item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DemoUseSearchParam;
