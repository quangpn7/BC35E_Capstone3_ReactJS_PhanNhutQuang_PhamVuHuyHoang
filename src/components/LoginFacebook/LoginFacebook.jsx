import axios from "axios";
import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useDispatch } from "react-redux";
import { history } from "../..";
import { loginAction } from "../../redux/reducer/userReducer";
import {
  deleteStore,
  eraseCookie,
  http,
  saveStoreJSON,
  setCookie,
  TOKEN,
  USER_LOGIN,
} from "../../utils/config";
const LoginFacebook = () => {
  const dispatch = useDispatch();
  const responseFacebook = (response) => {
    http
      .post("/api/Users/facebookLogin", {
        facebookToken: response?.accessToken,
      })
      .then((res) => {
        const action = loginAction(response);
        dispatch(action);
        setCookie(TOKEN, res.data.content.accessToken);
        saveStoreJSON(USER_LOGIN, response);

        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        eraseCookie(TOKEN);
        deleteStore(USER_LOGIN);
      });
  };
  return (
    <>
      <FacebookLogin
        appId="5792514794164565"
        autoLoad={false}
        callback={responseFacebook}
        render={(renderProps) => (
          <button
            className="btn-login-fb position-relative"
            type="button"
            onClick={renderProps.onClick}
          >
            <img className="position-absolute" src="./img/facebook-icon.png" />
            Continue with Facebook
          </button>
        )}
      />
    </>
  );
};

export default LoginFacebook;
