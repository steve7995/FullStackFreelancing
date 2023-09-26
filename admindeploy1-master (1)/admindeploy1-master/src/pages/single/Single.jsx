import "./single.scss";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
const Single = () => {
  // const [user, setUser] = useState({});
  const[rrr,setrrr] = useState([]);
  const [details,setDetails] = useState([]);
  const [username,setUsername] = useState("")
  const [fullname,setFullname] = useState("")
  const [email,setEmail] = useState("")
  const [render ,setRender] = useState(false);
  const {userId} = useParams()

  useEffect(() => {
    axios
      .get(`https://wbdservicet1.azurewebsites.net/userservices/${userId}`)
      .then((result) => {
        const gigs = result.data;
        // console.log(gigs["services"]);
        let ngigs = gigs["services"].map(({_id, title, description}) => ({_id, title, description}));
        setrrr(ngigs);
        // setUser(result);
      });
  }, [render]);
  console.log(rrr)
console.log("--------------------------------------------")
  useEffect(()=>{
    axios.get(`https://wbdservicet1.azurewebsites.net/userDetails/${userId}`)
    .then((result)=> {
      setUsername(result.data.username)
      setEmail(result.data.email)
      setFullname(result.data.fullname)
    })

  })


  const columns = [ { field: 'id', headerName: 'ID', width: 250   ,
  renderCell:(params) =>{
      return(
        <div>
          {params.row._id}
        </div>
      )
    }},
  { field: 'title', headerName: 'title', width: 200 },
  { field: 'description', headerName: 'Description', width: 800},
                  ]


  const actionColumn = [{
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      let fid = params.row._id
      
      return (
        <div className="cellAction">
          <div
            className="deleteButton" onClick={()=>{
              axios.delete(`https://wbdservicet1.azurewebsites.net/deleteService/${fid}`).then(()=>{
               setRender((prev) => !prev)
             })
     }}
          >
          delete 
          </div>
        </div>
      );
    },
  },]



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
                <h1 className="itemTitle"></h1>
                <div className="detailItem">
                  <span className="itemKey">UserName:</span>
                  <span className="itemValue">{username}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">fullname:</span>
                  <span className="itemValue">{fullname}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{email}</span>
                </div>

                {/* <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue"> USA
                  {username}
                  </span>
                </div> */}
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Services Provided by the user</h1>
          {/* <List/> */}
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rrr}
              columns={columns.concat(actionColumn)}
              getRowId={(row) => row._id}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </div>


            <div className="deleteButton">
            <Link to="/users" className="link" style={{ textDecoration: "none" }}>
            Back
            </Link>
   
            </div>

        </div>
      </div>
    </div>
  );
};

export default Single;
