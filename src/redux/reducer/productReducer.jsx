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
      const itemCart = state.spGioHang.find(item => item.id === action.payload.id)
      // if(itemCart) {
      //   itemCart.quantity += 1
      // }else { 
      //   state.spGioHang.push(action.payload);
      // }
      state.spGioHang.push(action.payload);

      },
      deleteItemAction: (state, action) => {
        const id = action.payload;
        state.spGioHang = state.spGioHang.filter(prod => prod.id !== id)
      },
      addItemAction : (state, action) =>{
        const {id, quantity} = action.payload;
        const item = state.spGioHang.find(item => item.id === id);
        if(item) { 
          item.quantity += quantity;
          if(item.quantity<1) { 
            if(window.confirm('delete item ?')) {
              state.spGioHang = state.spGioHang.filter(item => item.id !== id);
            } else {
              item.quantity += quantity;
            }
          }
        }
      },
      getAllProductByCategoryAction: (state, action) => { 
        state.arrProduct = action.payload
      }
     }
});

export const { getProductAction, getProductDetailAction, addGioHangAction, deleteItemAction,addItemAction, getAllProductByCategoryAction } =
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

export const getAllProductByCategory = (keyword) => { 
  return async (dispatch) => { 
    const result = await axios ({
      url: `https://shop.cyberlearn.vn/api/Product/getAllCategory?keyword=` + keyword,
      method: 'GET',
    })
    const action = getAllProductByCategoryAction(result.data.content)
    dispatch(action)
  }
}

