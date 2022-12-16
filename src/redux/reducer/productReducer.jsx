import { createSlice } from '@reduxjs/toolkit'

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
}

const productReducer = createSlice({
  name: 'productReducer',
  initialState,
  reducers: {

    getProductDetailAction: (state, action) => { 
      state.productDetail = action.payload
    }
    
  }
});

export const {getProductDetailAction} = productReducer.actions

export default productReducer.reducer