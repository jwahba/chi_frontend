import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = async (e) => {
    e.preventDefault();

    try {
      let token = await axios.post("/auth/login", {
        email,
        password,
      });
      await localStorage.setItem("access", token.data.access);
      await localStorage.setItem("refresh", token.data.refresh);
      try {
        const user = await axios.get("/users/me");
        dispatch(setUser(user.data));
        navigate("/");
      } catch (e) {
        setError("خطأ في قراءة البيانات");
        dispatch(setUser(null));
        navigate("/login");
      }
    } catch (e) {
      setError("خطأ في إسم المستخدم أو كلمة السر");
      setPassword("");
    }
  };

  return (
    <div className="container-fluid mt-5 px-5">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="d-none d-sm-block col-md-9 col-lg-6 col-xl-5">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid"
            alt="Sample image"
          />
        </div>
        <div className="col-sm-8 col-lg-6 col-xl-4 offset-xl-1  mt-5">
          <form onSubmit={submit}>
            <div className="d-flex flex-row justify-content-lg-start mb-3">
              <p className="lead fw-normal mb-0 me-3">تسجيل الدخول</p>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="email">
                البريد الالكتروني
              </label>
              <input
                type="email"
                id="email"
                className="form-control form-control-lg"
                placeholder="أدخل البريد الالكتروني"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="form-outline mb-3">
              <label className="form-label" htmlFor="password">
                كلمة السر
              </label>
              <input
                type="password"
                id="password"
                className="form-control form-control-lg"
                placeholder="أدخل كلمة السر"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <a href="#" className="text-body">
                نسيت كلمة السر؟
              </a>
            </div>

            <div className="text-center text-lg-start mt-4 pt-2">
              <button type="submit" className="btn btn-primary btn-lg">
                الدخول
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
