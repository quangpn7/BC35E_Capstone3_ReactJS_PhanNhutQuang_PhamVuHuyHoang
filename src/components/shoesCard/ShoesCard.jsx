import React from "react";
import { NavLink } from "react-router-dom";

const ShoesCard = (props) => {
  const { item, index } = props;
  return (
    <div className="product__item card shadow" key={index}>
      <div className="card-header position-relative">
        <div className="card-icon position-absolute">
          <i className="fa fa-heart" aria-hidden="true" />
        </div>
        <img src={item.image} alt="itemImg" className="w-100" />
      </div>
      <div className="card-body p-0">
        <div className="card-body-upper p-3">
          <h3 className="text-truncate">{item.name}</h3>
          <p className="m-0">
            {item?.description?.length > 70
              ? `${item?.description.slice(0, 70)}...`
              : item?.description}
          </p>
        </div>
        <div className="card-body-under d-flex align-items-center">
          <NavLink to={`/detail/${item?.id}`} className="w-50 btn-buy">
            Buy Now
          </NavLink>

          <div className="price-wrap w-50 ">
            <p className="font-weight-bold text-right m-0">85$</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoesCard;
