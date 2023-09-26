import { useState,useEffect} from "react";
import axios from "axios";
import "./widget.scss";
import { Link } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";


const Widget = ({ type }) => {
let data;
const [numberofusers,setNumberofusers] = useState(0);
const [numberofservices,setnumberofservices] = useState(0);
const [numberofqueries,setnumberofqueries] = useState(0);
useEffect(()=>{
axios.get("https://wbdservicet1.azurewebsites.net/getUsers")
      .then((res)=> setNumberofusers(res.data.length))
},[]);
useEffect(()=>{
axios.get("https://wbdservicet1.azurewebsites.net/getServices")
      .then((res)=> setnumberofservices(res.data.length))
});
useEffect(()=>{
  axios.get("https://wbdservicet1.azurewebsites.net/userQueries")
        .then((res)=> setnumberofqueries(res.data.length))
  });


//temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: ( <Link to="/users" className="link" style={{ textDecoration: "none" }}>
        users
      </Link>),
        number: numberofusers,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "SERVICES",
        isMoney: false,
        link: ( <Link to="/products" className="link" style={{ textDecoration: "none" }}>
        services
      </Link>),
        number: numberofservices,
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,

        number: numberofusers,
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "QUERIES",
        isMoney: false,
        link: ( <Link to="/queries" className="link" style={{ textDecoration: "none" }}>
        queries
      </Link>),
        number: numberofqueries,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.number}
        </span>
        <span>{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
