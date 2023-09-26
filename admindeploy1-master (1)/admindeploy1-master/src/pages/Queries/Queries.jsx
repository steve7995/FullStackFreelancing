import "./queries.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";

import axios from "axios";
const Queries = () => {
  const [queries, setQueries] = useState({});
  const [render ,setRender] = useState(false);
  useEffect(()=>{
    axios.get("https://wbdservicet1.azurewebsites.net/userQueries")
          .then((result)=>setQueries(result.data))

    },[render])
  const userColumns = [
    {
      field: "id",
      headerName: "ID",
      width: 250,
      renderCell: (params) => {
        return <div>{params.row._id}</div>;
      },
    },
    {
      field: "Name",
      headerName: "Name",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            {/* <img className="cellImg" src={params.row.img} alt="avatar" /> */}
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "email",
      width: 230,
    },
    {
      field: "message",
      headerName: "message",
      width: 230,
    },

    // {
    //   field: "age",
    //   headerName: "Age",
    //   width: 100,
    // },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 160,
    //   renderCell: (params) => {
    //     return (
    //       <div
    //         className={`cellWithStatus ${
    //           params.row.isBlock ? "passive" : "active"
    //         }`}
    //       >
    //         {params.row.isBlock ? "blocked" : "active"}
    //       </div>
    //     );
    //   },
    // },
  ];
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        let fid = params.row._id;

        return (
          <div className="cellAction">
            {/* <Link to={`/users/${fid}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link> */}
            <div
              className="deleteButton"
              // onClick={() => console.log(params.row._id)}
              onClick={()=>{
                window.location = `mailto:${params.row.email}.com`
              }}
            >
              Reply
            </div>

            <div className="deleteButton" onClick={()=>{
                     axios.delete(`https://wbdservicet1.azurewebsites.net/deleteQuery/${fid}`).then(()=>{
                      setRender((prev) => !prev)
                    })
            }}>
            delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="datatable">
          <div className="datatableTitle">
            List of Queries
            <Link to="/home" className="link">
              Home
            </Link>
          </div>
          <DataGrid
            className="datagrid"
            rows={queries}
            columns={userColumns.concat(actionColumn)}
            getRowId={(row) => row._id}
            rowsPerPageOptions={[9]}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
};

export default Queries;
