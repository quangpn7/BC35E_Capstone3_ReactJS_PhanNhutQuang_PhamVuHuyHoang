import React from "react";
import { NavLink } from "react-router-dom";

const ShoesCard = (props) => {
  const { item } = props;

  return (
    <div className="card h-100 ">
      <div
        className="card-head"
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#F8F8F8",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        <img src={item?.image} className="w-100" alt="" />
        <div className="card-body">
          <div className="h-50">
            <h3>{item.name}</h3>
          </div>

          <div className="h-50">
            <p>
              {item?.description?.length > 10 ? item?.description.substring(0,10) + "..." : item?.description }
            </p>
            <NavLink
              to={`/detail/${item?.id}`}
              className="btn btn-success w-50"
              onClick={() => {}}
            >
              Buy Now
            </NavLink>
            <span className="mx-4 w-50">85$</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoesCard;
