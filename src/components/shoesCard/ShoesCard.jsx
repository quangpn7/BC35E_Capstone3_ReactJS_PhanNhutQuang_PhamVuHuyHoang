import React from "react";
import { NavLink } from "react-router-dom";

const ShoesCard = (props) => {
  const { item } = props;

  return (
    // <div className="card h-100">
    //   <div
    //     className="card-head"
    //     style={{
    //       width: "100%",
    //       height: "100%",
    //       backgroundColor: "#F8F8F8",
    //       boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    //     }}
    //   >
    //     <img src={item.image} className="w-100" alt="" />
    //     <div className="card-body">
    //       <div className="h-50">
    //         <h3 className="test-wrap">{item.name}</h3>
    //       </div>

    //       <div className="h-50">
    //         <p>{item.description}</p>
    //         <NavLink
    //           to={`/detail/${item?.id}`}
    //           className="btn btn-success w-50"
    //           onClick={() => {}}
    //         >
    //           Buy Now
    //         </NavLink>
    //         <span className="mx-4 w-50">85$</span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="product__item card shadow ">
      <div className="card-header position-relative">
        <div className="card-icon position-absolute">
          <i className="fa fa-heart" aria-hidden="true" />
        </div>
        <img src={item.image} alt="itemImg" className="w-100" />
      </div>
      <div className="card-body p-0">
        <div className="card-body-upper p-3">
          <h3 className="text-truncate">{item.name}</h3>
          <p className="m-0">{item?.description}</p>
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
