import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  arrProduct: [
    {
      id: 1,
      name: "nikeAir",
      price: 1000,
      image: "https://picsum.photos/id/1/200/200",
    },
  ],
  productDetail: {
    id: 1,
    name: "nikeAir",
    price: 1000,
    image: "https://picsum.photos/id/1/200/200",
  },
  spGioHang: [
    {
      id: 1,
      name: "nikeAir",
      image: "https://picsum.photos/id/1/200/200",
      price: 5000,
      quantity: 5, 
    },
  ],
};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    getProductAction: (state, action) => {
      state.arrProduct = action.payload;
    },

    getProductDetailAction: (state, action) => {
      state.productDetail = action.payload;
    },
    addGioHangAction: (state, action) => {
      console.log('action', action)
      state.spGioHang.push(action.payload);
    },
  },
});

export const { getProductAction, getProductDetailAction, addGioHangAction } =
  productReducer.actions;

export default productReducer.reducer;

//----------------

export const getAllProductApi = () => {
  return async (dispatch) => {
    const result = await axios({
      url: `https://shop.cyberlearn.vn/api/Product`,
      method: "GET",
    });

    const action = getProductAction(result.data.content);
    dispatch(action);
  };
};

export const getProductByIdApi = (id) => {
  return async (dispatch) => {
    const result = await axios({
      url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
      method: "GET",
    });
    const action = getProductDetailAction(result.data.content);
    dispatch(action);
  };
};


