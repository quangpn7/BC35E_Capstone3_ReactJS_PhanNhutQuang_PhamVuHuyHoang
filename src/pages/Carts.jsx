import React from "react";
import ProductItem from "../components/ProductItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductAction } from "../redux/reducer/productReducer";
import { getProductByIdApi } from "../redux/reducer/productReducer";

const Carts = () => {
  const {productDetail, arrProduct, spGioHang } = useSelector(
    (state) => state.productReducer
  );

  const dispatch= useDispatch();






 

  console.log("arrProduct", arrProduct);
  console.log(spGioHang);
  return (
    <div className="container mt-5">
      <h2>Carts</h2>
      <hr />
      <div className="table-responsive">
        <table className="table my-5">
          <thead className="bg-default">
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>id</th>
              <th>image</th>
              <th>name</th>
              <th>price</th>
              <th className="text-center">quantity</th>
              <th>total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {spGioHang?.map((item, index) => {
              return (
                <tr className="mt-2" key={index}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{item?.id}</td>
                  <td>
                    <img
                      src={item?.image}
                      height="50px"
                      width="50px"
                      alt="..."
                    />
                  </td>
                  <td>{item?.name}</td>
                  <td>{item?.price}$</td>
                  <td className="text-center">
                    <button className="cart-addRemove">+</button>
                    <span className="mx-4 cartQuantity-text">1</span>
                    <button className="cart-addRemove">-</button>
                  </td>
                  <td>1000</td>
                  <td className="buttons">
                    <button className="cart_action-btn cart-btnEdit mx-1">
                      Edit
                    </button>
                    <button className="cart_action-btn mx-1 cart-btnDelete">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-end">
        <button className="btn-cartSubmit">Submit Order</button>
      </div>

      <div className="container mt-5 text-center">
        <h2>Related Product</h2>

        <div className="row">
          <div className="col-4">

          </div>
        </div>
      </div>
    </div>
  );
};

export default Carts;
