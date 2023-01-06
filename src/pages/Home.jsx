import React, { useState } from "react";
import { Carousel, Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProductApi } from "../redux/reducer/productReducer";
import ShoesCard from "../components/shoesCard/ShoesCard";
import { NavLink } from "react-router-dom";

const contentStyle = {
  margin: 0,
  height: "640px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  maxWidth: "1400px",
  margin: "0 auto",
  padding: "30px",
};

const Home = () => {
  const { arrProduct } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();

  //ham call API:
  const getAllProduct = async () => {
    const action = getAllProductApi();
    dispatch(action);
  };

  useEffect(() => {
    //call API:
    getAllProduct();
  }, []);

  const onChange = (currentSlice) => {};

  //Pagination handle
  const [current, setCurrent] = useState(1);
  // const [minIndex, setMinIndex] = useState((current - 1) * 10);
  const [minIndex, setMinIndex] = useState(0);
  // const [maxIndex, setMaxIndex] = useState(current * 10);
  const [maxIndex, setMaxIndex] = useState(6);

  const handlePagiChange = (page) => {
    setCurrent(page);
    setMinIndex((page - 1) * 6);
    setMaxIndex(page * 6);
  };

  return (
    <div>
      <Carousel afterChange={onChange}>
        {arrProduct?.slice(0, 4).map((item, index) => {
          return (
            <div key={index}>
              <div
                style={contentStyle}
                className="d-lg-flex d-md-flex align-items-center"
                id="carouselHolder"
              >
                <div className="w-75 mx-auto">
                  <img
                    className="w-100 h-100"
                    src={item.image}
                    alt="..."
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className=" mx-auto d-flex flex-column justify-content-center">
                  <div className="p-lg-5">
                    <h1>{item.name}</h1>
                    <h5 className="font-weight-normal">
                      {item.shortDescription}
                    </h5>
                    <NavLink
                      to={`/detail/${item?.id}`}
                      className="w-75 btn btn-lg btn-success d-inline"
                    >
                      Buy Now
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>

      <div className="container">
        <h2 className="text-left py-5">Product Features </h2>
        <div className="row text-center">
          {arrProduct?.slice(minIndex, maxIndex).map((item, index) => {
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
        <Pagination
          className="text-right"
          showSizeChanger={false}
          current={current}
          pageSize={6}
          total={arrProduct.length}
          onChange={handlePagiChange}
        />
      </div>
    </div>
  );
};

export default Home;
