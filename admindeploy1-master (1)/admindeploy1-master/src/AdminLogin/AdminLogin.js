import axios from "axios";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import Navbar1 from "../Landinpage/Navbar";
// import { useDispatch } from "react-redux";
import "./ad.css";

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
        navigate("/users");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {/* <Navbar1 /> */}
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
