import { createSlice } from "@reduxjs/toolkit";

import {
  saveStoreJSON,
  setCookie,
  USER_LOGIN,
  TOKEN,
  getStoreJSON,
  getCookie,
  http,
} from "../../utils/config";
import { history } from "../../index";
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
    updateProfileAction: (state, action) => {},
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
//#region async
export const loginApi = (data) => {
  return async (dispatch) => {
    // let result = await axios({
    //   url: "https://shop.cyberlearn.vn/api/Users/signin",
    //   method: "POST",
    //   data: data,
    // });
    let result = await http.post("/api/Users/signin", data);

    if (result?.status === 200) {
      const action = loginAction(result.data.content);
      dispatch(action);
      //Save user login
      saveStoreJSON(USER_LOGIN, result.data.content);
      //Set cookie
      setCookie(TOKEN, result?.data.content.accessToken);
      history.push("/");
    }
  };
};
//get profile api
export const getProfileApi = () => {
  return async (dispatch) => {
    let result = await http.post("/api/Users/getProfile");

    const action = getProfileAction(result?.data.content);
    dispatch(action);
  };
};
//update profile api
export const updateProfileApi = (data) => {
  return async (dispatch) => {
    let result = await http.post("/api/Users/updateProfile", data);
    //udpate current store at time
    if (result.data.statusCode === 200) {
      const actionUpdateStore = getProfileApi();
      dispatch(actionUpdateStore);
      alert("Update successfully!");
    }
  };
};
//get favorite api
export const getFavApi = () => {
  return async (dispatch) => {
    let result = await http.get("/api/Users/getproductfavorite");
    const action = getFavItemAction(result?.data.content);
    dispatch(action);
  };
};
//#endregion async
