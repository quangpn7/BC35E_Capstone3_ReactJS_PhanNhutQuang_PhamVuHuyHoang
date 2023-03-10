import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ShoesCard from "../components/shoesCard/ShoesCard";
import {
  addItemAction,
  deleteItemAction,
} from "../redux/reducer/productReducer";

const Carts = () => {
  const { productDetail, arrProduct, spGioHang } = useSelector(
    (state) => state.productReducer
  );

  const dispatch = useDispatch();

  return (
    <div className="mt-5 container">
      <h2>Carts</h2>
      <hr />
      <div className="table-responsive-sm">
        <table className="table my-5">
          <thead className="bg-default">
            <tr>
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
                  <td>{item?.id}</td>
                  <td>
                    <img src={item?.image} width={100} alt="..." />
                  </td>
                  <td>{item?.name}</td>
                  <td>{item?.price}$</td>
                  <td className="text-center">
                    <button
                      className="cart-addRemove"
                      onClick={() => {
                        const itemAdd = {
                          id: item?.id,
                          quantity: 1,
                        };
                        const action = addItemAction(itemAdd);
                        dispatch(action);
                      }}
                    >
                      +
                    </button>
                    <span className="mx-4 cartQuantity-text">
                      {item.quantity}
                    </span>
                    <button
                      className="cart-addRemove"
                      onClick={() => {
                        const itemAdd = {
                          id: item?.id,
                          quantity: -1,
                        };
                        const action = addItemAction(itemAdd);
                        dispatch(action);
                      }}
                    >
                      -
                    </button>
                  </td>
                  <td>{item.price * item.quantity} $</td>
                  <td className="buttons">
                    <button className="cart_action-btn cart-btnEdit mx-1">
                      Edit
                    </button>
                    <button
                      className="cart_action-btn mx-1 cart-btnDelete"
                      onClick={() => {
                        const action = deleteItemAction(item?.id);
                        dispatch(action);
                      }}
                    >
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

        <div className="row mt-5">
          {productDetail?.relatedProducts?.map((item, index) => {
            return (
              <div
                className="col-xl-4 col-md-6 col-12 mb-4 text-left"
                key={index}
              >
                <ShoesCard item={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carts;
