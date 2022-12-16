import React from "react";
import { Outlet } from "react-router-dom";

const Template = () => {
  return (
    <div>
      <header>
        <div className="header__wrap">
          <div className="header__content d-flex justify-content-between align-items-center">
            <div className="header__logo">
              <a href="#">
                <img src="./img/image 3.png" alt="logoCybersoft" />
              </a>
            </div>
            <div className="header__feature d-flex align-items-center">
              <i className="fa fa-shopping-cart" />
              <span id="item_count">(0)</span>
              <span>
                <a href="#" id="btnLogin">
                  Login
                </a>
              </span>
              <span>
                <a href="./register.html" id="btnRegister">
                  Register
                </a>
              </span>
            </div>
          </div>
        </div>
      </header>
      {/* NAV */}
      <section className="navigation">
        <div className="navigation__wrap">
          <ul className="nav">
            <li className="nav-item active">
              <a
                className="nav-link"
                href="#"
                id="btnHome"
             
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                id="btnMen"
                value="men"
                
              >
                Men
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                id="btnWoman"
                value="women"
               
              >
                Woman
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" id="btnKid">
                Kid
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" id="btnSport">
                Sport
              </a>
            </li>
          </ul>
        </div>
      </section>
      <Outlet />
      <footer>
        <div className="footer__wrap mx-auto">
          <div className="row container mx-auto">
            <div className="footer__link footer__help col-lg-4">
              <h3>GET HELP</h3>
              <ul className="list-unstyled">
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Nike</a>
                </li>
                <li>
                  <a href="#">Adidas</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>
            <div className="footer__link footer__support col-lg-4">
              <h3>SUPPORT</h3>
              <ul className="list-unstyled">
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
                <li>
                  <a href="#">Help</a>
                </li>
                <li>
                  <a href="#">Phone</a>
                </li>
              </ul>
            </div>
            <div className="footer__link footer__register col-lg-4">
              <h3>REGISTER</h3>
              <ul className="list-unstyled">
                <li>
                  <a href="#">Register</a>
                </li>
                <li>
                  <a href="#">Login</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer__credit py-4">
          <p className="text-center m-0">
            © 2022 Cybersoft All Rights Reserved | Design Theme by Trương Tấn
            Khải.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Template;
