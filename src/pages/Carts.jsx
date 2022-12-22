import React from "react";

const Carts = () => {
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
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="mt-2">
              <td>
                <input type="checkbox" />
              </td>
              <td>1</td>
              <td>
                <img
                  src="https://i.pravatar.cc"
                  height="50px"
                  width="50px"
                  alt='...'
                />
              </td>
              <td>product 1</td>
              <td>1000$</td>
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
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-end">
        <button className="btn-cartSubmit">Submit Order</button>
      </div>
    </div>
  );
};

export default Carts;
