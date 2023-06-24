import React, { useContext } from "react";
import log from "../../image/freshcart-logo.svg";
import { Link, NavLink } from "react-router-dom";
import { storeContext } from "../../context/StoreContext";

export default function NavBar() {
  let { count } = useContext(storeContext);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-main-light ">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img src={log} alt="/" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse mt-3 mb-2"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0  ">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  product
                </NavLink>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
              <Link
                to="/cart"
                type="button"
                className="btn  position-relative "
              >
                <i className="fa-solid fa-cart-shopping"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                  {count}
                  <span className="visually-hidden">unread messages</span>
                </span>
              </Link>
              <li className="nav-item ">
                <Link
                  className="nav-link active ms-2"
                  aria-current="page"
                  to="Login"
                >
                  Login
                </Link>
              </li>
              <li className="nav-item ">
                <Link
                  className="nav-link active ms-2"
                  aria-current="page"
                  to="Registration"
                >
                  Registration
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="#">
                  logout
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
