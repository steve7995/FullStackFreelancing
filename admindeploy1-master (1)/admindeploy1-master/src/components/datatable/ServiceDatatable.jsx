import "./serviceDatatable.scss";

import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
const ServiceDatatable = () => {

const [users,setUsers] = useState({});
const [render ,setRender] = useState(false);
  useEffect(()=>{
  axios.get("https://wbdservicet1.azurewebsites.net/getServices")
        .then((result)=>setUsers(result.data))
  },[render])
  console.log(users);


  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        let fid = params.row._id
        
        return (
          <div className="cellAction">
            {/* <Link to={`/users/${fid}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link> */}
            <div
              className="deleteButton"
              onClick={() => {
                axios.get(`https://wbdservicet1.azurewebsites.net/Blockservice/${fid}`).then(()=>{
                  setRender((prev) => !prev)
                })

              }}
            >
              Block
            </div>
            <div
              className="deleteButton"
              onClick={() => {
                axios.get(`https://wbdservicet1.azurewebsites.net/UnBlockservice/${fid}`)
                .then(()=> {
                  setRender((prev) => !prev)
                })
              }}
            >
              UnBlock
            </div>
            <div className="deleteButton" onClick={()=>{
                   axios.delete(`https://wbdservicet1.azurewebsites.net/deleteService/${fid}`).then(()=>{
                    setRender((prev) => !prev)
                  })
            }}>
                Delete
            </div>
            {/* <div className="deleteButton" onClick={()=> console.log(fid)}>
              steve
            </div> */}
          </div>
        );
      },
    },
  ];
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
      field: "title",
      headerName: "title",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            {/* <img className="cellImg" src={params.row.img} alt="avatar" /> */}
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "price",
      width: 230,
    },
    {
      field: "category",
      headerName: "category",
      width: 230,
    },
  
    // {
    //   field: "age",
    //   headerName: "Age",
    //   width: 100,
    // },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div
            className={`cellWithStatus ${
              params.row.isBlock ? "passive" : "active"
            }`}
          >
            {params.row.isBlock ? "blocked" : "active"}
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
         List of Services
        <Link to="/home" className="link">
          Home
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={users}
        columns={userColumns.concat(actionColumn)}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default ServiceDatatable;
