import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
// import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
const Datatable = () => {
const [users,setUsers] = useState({});
const[bad,setbad] = useState(false);
const[render,Setrender] = useState(false);

  useEffect(()=>{
  axios.get("https://wbdservicet1.azurewebsites.net/getUsers")
        .then((result)=>setUsers(result.data))
  },[render])
  // console.log(users);
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
      field: "user",
      headerName: "User",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            {/* <img className="cellImg" src={params.row.img} alt="avatar" /> */}
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
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
  

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        let fid = params.row._id
        
        return (
          <div className="cellAction">
            <Link to={`/users/${fid}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton" onClick={()=>{
                axios.get(`https://wbdservicet1.azurewebsites.net/BlockUsers/${fid}`).then(()=>{
                  setbad(true)
                  Setrender((prev)=> !prev)
                                })

              }}
            >
              Block
            </div>
            <div
              className="deleteButton"

              onClick={()=>{
                axios.get(`https://wbdservicet1.azurewebsites.net/UnBlockUsers/${fid}`).then(()=>{
                  setbad(false)
                  Setrender((prev)=> !prev) 

                })
              }}
            >
              Unblock
            </div>
            <div className="deleteButton" onClick={()=>{
                   axios.delete(`https://wbdservicet1.azurewebsites.net/deleteUser/${fid}`).then(()=>{
                    Setrender((prev) => !prev)
                  })
            }}>
                Delete
            </div>


          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        User's List
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

export default Datatable;
