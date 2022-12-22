import React from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProductApi } from "../redux/reducer/productReducer";
import ShoesCard from "../components/shoesCard/ShoesCard";

const contentStyle = {
  margin: 0,
  height: "400px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
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
    console.log("arrProd", arrProduct);
  }, []);

 

  const onChange = (currentSlice) => {};

  return (
    <div>
      <Carousel afterChange={onChange}>
        {arrProduct.slice(0, 4).map((item, index) => {
          return (
            <div key={index}>
              <div style={contentStyle} className="d-flex">
                <div className="w-50">
                  <img
                    className="w-100 h-100"
                    src={item.image}
                    alt=""
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="w-50">
                  <h3>{item.name}</h3>
                  <p>{item.shortDescription}</p>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>

      <div className="container">
        <h2 className="text-left py-5">Product Features </h2>
        <div className="row">
          {arrProduct.slice(0,6).map((item, index) => {
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

export default Home;
