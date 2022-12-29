import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/scss/main.scss";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  unstable_HistoryRouter as HistoryBrowser,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Carts from "./pages/Carts";
import Template from "./templates/HomeTemplates/Template";
import Modal from "./components/HOC/Modal/Modal";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory(); //history lib init
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <HistoryBrowser history={history}>
      {" "}
      {/** Replaced*/}
      <Modal />
      <Routes>
        <Route path="" element={<Template />}>
          <Route index element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/detail">
            <Route path=":id" element={<Detail />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="carts" element={<Carts />}></Route>
          <Route path="*" element={<Navigate to="" />} />
        </Route>
      </Routes>
    </HistoryBrowser>
  </Provider>
);
