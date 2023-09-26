import "./single2.scss";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import { Link } from "react-router-dom";
import List from "../../components/table/Table";
import { DataGrid } from "@mui/x-data-grid";
const Single2 = () => {
  const [user, setUser] = useState({});
  const[rrr,setrrr] = useState([]);
  const {userId} = useParams()

  useEffect(() => {
    axios
      .get(`https://wbdservicet1.azurewebsites.net/userservices/${userId}`)
      .then((result) => {
        const gigs = result.data;
        console.log(gigs["services"]);
        let ngigs = gigs["services"].map(({_id, title, description}) => ({_id, title, description}));
        setrrr(ngigs);
        setUser(result);
      });
  }, []);




  const columns = [ { field: 'id', headerName: 'ID', width: 170   ,
  renderCell:(params) =>{
      return(
        <div>
          {params.row._id}
        </div>
      )
    }},
  { field: 'title', headerName: 'title', width: 500 },
  { field: 'description', headerName: 'Description', width: 500},
                  ]
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{user.user}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">janedoe@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+1 2345 67 89</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    Elton St. 234 Garden Yd. NewYork
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">USA</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          {/* <List/> */}
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rrr}
              columns={columns}
              getRowId={(row) => row._id}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </div>
          <div className="cellAction">
            <div className="deleteButton">
            <Link to="/products" className="link">
            Back
        </Link>
   
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single2;
