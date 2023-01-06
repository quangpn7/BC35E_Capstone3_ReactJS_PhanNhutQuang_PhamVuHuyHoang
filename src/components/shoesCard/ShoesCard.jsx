import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { getFavApi } from "../../redux/reducer/userReducer";
import { getCookie, http, TOKEN } from "../../utils/config";

const ShoesCard = (props) => {
  const { item, index } = props;
  const { userFav } = useSelector((state) => state.userReducer);
  const [userFavList, setUserFavList] = useState(userFav);
  const dispatch = useDispatch();
  //Check fav
  const likeClick = (id) => {
    if (!getCookie(TOKEN)) {
      toast.warn("Not logged in!", { position: toast.POSITION.BOTTOM_CENTER });

      return;
    }
    http.get(`/api/Users/like?productId=${id}`).then(() => {
      const updateFav = getFavApi();
      dispatch(updateFav);
      toast.success("Added to favourite!");
    });
  };
  const unlikeClick = (id) => {
    http.get(`/api/Users/unlike?productId=${id}`).then(() => {
      const updateFav = getFavApi();
      dispatch(updateFav);
      toast.success("Removed from favourite!");
    });
  };
  const checkLiked = (id) => {
    //in case not login
    if (!userFav?.productsFavorite) {
      // return "fa fa-heart";
      return (
        <i
          className={"fa fa-heart"}
          aria-hidden="true"
          onClick={() => likeClick()}
        />
      );
    }
    //in case login
    let index = userFav?.productsFavorite.findIndex((item) => item.id === id);
    if (index !== -1) {
      // return "fa fa-heart isLiked";
      return (
        <i
          className={"fa fa-heart isLiked"}
          aria-hidden="true"
          onClick={() => unlikeClick(id)}
        />
      );
    }
    return (
      <i
        className={"fa fa-heart"}
        aria-hidden="true"
        onClick={() => likeClick(id)}
      />
    );
  };

  //Component return
  return (
    <div
      className="product__item card shadow 
    "
      key={index}
    >
      <div className="card-header position-relative">
        <div className="card-icon position-absolute">{checkLiked(item.id)}</div>
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
