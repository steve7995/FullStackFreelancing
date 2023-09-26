import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SideBar from "./components/Sidebar";
import sidebar_menu from "./constants/sidebar-menu";
// import Seri

import "./App.css";
import AdminLogin from "./AdminLogin/AdminLogin";
import Services from "./components/Services/Services";
import Users from "./components/Users/Users";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<AdminLogin />} />
      </Routes>
      <div className="dashboard-container">
        <SideBar menu={sidebar_menu} />

        <div className="dashboard-body">
          <Routes>
            {/* <Route exact path="/" element={<AdminLogin />} /> */}
            <Route exact path="/users" element={<Users menu_name="Users" />} />
            <Route
              exact
              path="/services"
              element={<Services menu_name="Services" />}
            />

            <Route path="*" element={<div></div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
