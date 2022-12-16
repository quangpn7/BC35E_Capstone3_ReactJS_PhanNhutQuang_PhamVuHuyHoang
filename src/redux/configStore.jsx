import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducer/productReducer";
export const store = configureStore({
  reducer: {
    productReducer,
  },
});
