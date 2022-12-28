import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducer/productReducer";
import userReducer from "./reducer/userReducer";
import ModalReducer from "./reducer/modalReducer";
export const store = configureStore({
  reducer: {
    productReducer,
    userReducer,
    ModalReducer: ModalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }), //prevent serializable error
});
