import "./list2.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ServiceDatatable from "../../components/datatable/ServiceDatatable";

const List2 = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <ServiceDatatable/>
      </div>
    </div>
  )
}

export default List2;