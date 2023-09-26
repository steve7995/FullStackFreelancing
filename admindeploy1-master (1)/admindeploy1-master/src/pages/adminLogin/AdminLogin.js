import axios from "axios";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import Navbar1 from "../Landinpage/Navbar";
// import { useDispatch } from "react-redux";
import "./ad.scss";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [usnam, setusnam] = useState("");
  const [eml, seteml] = useState("");
  // const dispatch = useDispatch();
  // const [data, setdata] = useState("admin");
  const addaduser = async (event) => {
    event.preventDefault();
    axios
      .post("https://wbdservicet1.azurewebsites.net/admin/signin", {
        usnam: usnam,
        eml: eml,
      })
      .then((res) => {
        console.log(res);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {/* <Navbar1 /> */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          background: "black",
        }}
      >
        <h2 style={{ color: "white" }}>GigWork Admin</h2>
      </nav>
      <div className="bargav">
        <div id="login-form-wrap">
          <h2 className="h2ead">Login</h2>
          <form id="login-form" onSubmit={addaduser}>
            <p className="parad">
              <input
                className="inptag"
                type="email"
                id="username"
                name="username"
                value={usnam}
                onChange={(e) => {
                  setusnam(e.target.value);
                }}
                placeholder="Email"
                required
              />
              {/* <i className="validation"><span></span><span></span></i> */}
            </p>
            <p className="parad">
              <input
                className="inptag"
                type="password"
                id="email"
                name="email"
                value={eml}
                onChange={(e) => {
                  seteml(e.target.value);
                }}
                placeholder="Password"
                required
              />
              {/* <i className="validation"><span></span><span></span></i> */}
            </p>
            <p className="parad">
              <input
                className="inptag"
                type="submit"
                id="login"
                value="Login"
              />
            </p>
          </form>
          <div id="create-account-wrap">
            <p className="parad"></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
