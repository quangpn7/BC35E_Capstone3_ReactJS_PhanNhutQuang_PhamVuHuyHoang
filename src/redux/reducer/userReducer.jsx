import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  saveStoreJSON,
  setCookie,
  USER_LOGIN,
  TOKEN,
  getStoreJSON,
  getCookie,
} from "../../utils/config";

const initialState = {
  userLogin: getStoreJSON(USER_LOGIN) ? getStoreJSON(USER_LOGIN) : null,
  userProfile: null,
  userFav: null,
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.userLogin = action.payload;
    },
    getProfileAction: (state, action) => {
      state.userProfile = action.payload;
    },
    updateProfileAction: (state, action) => {
      state.userProfile = action.payload;
    },
    getFavItemAction: (state, action) => {
      state.userFav = action.payload;
    },
  },
});

export const {
  loginAction,
  getProfileAction,
  updateProfileAction,
  getFavItemAction,
} = userReducer.actions;

export default userReducer.reducer;

// Async action - api
export const loginApi = (data) => {
  return async (dispatch) => {
    let result = await axios({
      url: "https://shop.cyberlearn.vn/api/Users/signin",
      method: "POST",
      data: data,
    });
    const action = loginAction(result.data.content);
    dispatch(action);
    //Save user login
    saveStoreJSON(USER_LOGIN, result.data.content);
    //Set cookie
    setCookie(TOKEN, result.data.content.accessToken);
  };
};
//get profile api
export const getProfileApi = () => {
  return async (dispatch) => {
    let result = await axios({
      url: "https://shop.cyberlearn.vn/api/Users/getProfile",
      method: "POST",
      headers: {
        Authorization: `Bearer ${getCookie(TOKEN)}`,
      },
    });

    const action = getProfileAction(result.data.content);

    dispatch(action);
  };
};
//update profile api
export const updateProfileApi = (data) => {
  return async (dispatch) => {
    let result = await axios({
      url: "https://shop.cyberlearn.vn/api/Users/updateProfile",
      method: "POST",
      headers: {
        Authorization: `Bearer ${getCookie(TOKEN)}`,
      },
      data: data,
    });

    const action = updateProfileAction(result.data.content);

    dispatch(action);
  };
};
//get favorite api
export const getFavApi = () => {
  return async (dispatch) => {
    let result = await axios({
      url: "https://shop.cyberlearn.vn/api/Users/getproductfavorite",
      method: "GET",
      headers: {
        Authorization: `Bearer ${getCookie(TOKEN)}`,
      },
    });

    const action = getFavItemAction(result.data.content);
    dispatch(action);
  };
};
