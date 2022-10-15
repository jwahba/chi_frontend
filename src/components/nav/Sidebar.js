import React, { Fragment } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="col-auto px-sm-0 navbar-light bg-light vh-100 px-3 ps-4">
      <div className="d-flex flex-column navbar-nav align-items-center align-items-sm-start px-3 px-lg-5 px-md-4 px-sm-3 pt-2">
        <Link
          to="/"
          className="d-flex align-items-center pb-3 mb-md-0 mx-auto px-auto"
        >
          <img src="/logo.jpeg" width="100" className="d-none d-sm-block" />
        </Link>
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-center px-0"
          id="menu"
        >
          <li className="nav-item">
            <Link to="/" className="nav-link align-middle px-0">
              <i className="fs-4 bi-house"></i>{" "}
              <span className="ms-1 d-none d-sm-inline">الصفحة الرئيسية</span>
            </Link>
          </li>
          <li>
            <Link to="/library" className="nav-link px-0 align-middle">
              <i className="fs-4 bi-book"></i>{" "}
              <span className="ms-1 d-none d-sm-inline">
                المكتبة الألكترونية
              </span>
            </Link>
          </li>
        </ul>
        <hr />
      </div>
    </div>
  );
}

export default Sidebar;
