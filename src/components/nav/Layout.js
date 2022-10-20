import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/authSlice";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout(props) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (!localStorage.getItem("access")) {
        dispatch(setUser(null));
        navigate("/login");
      } else {
        try {
          const user = await axios.get("/users/me/");
          dispatch(setUser(user.data));
        } catch (e) {
          dispatch(setUser(null));
          navigate("/login");
        }
      }
    })();
  }, []);
  if (!user) {
    return (
      <div className="d-flex flex-column vh-100">
        <div className="d-flex justify-content-center vh-100">
          <div className="d-flex align-items-center">
            <div
              className="spinner-border ms-auto mx-3"
              role="status"
              aria-hidden="true"
            ></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container-fluid vh-100 px-0">
      <div>
        <Navbar />
        <div className="row flex-nowrap">
          <Sidebar />
          <div className="col px-3 py-3 me-3 pb-5 mb-5">{props.children}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
  return;
}

export default Layout;
