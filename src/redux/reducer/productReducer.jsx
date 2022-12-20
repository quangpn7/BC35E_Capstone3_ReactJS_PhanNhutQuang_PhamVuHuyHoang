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
  spGioHang: [],
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
    spGioHangAction : (state, action) => { 
      state.spGioHang = action.payload;
    }
  },
});

export const { getProductAction, getProductDetailAction } =
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

// export const addGioHang = (spClick) => { 
//   let spAdd = {...spClick, soLuong: 1};
//   let spGiohang = null; 
//   let checkSp = spGiohang?.find(sp => sp.id ===spClick.id)
//   if(checkSp) { 
//     checkSp.soLuong +=1
//   } else {
//     spGiohang.push(spAdd);
//   }
//   const action = spGioHangAction(spGioHang)
// }