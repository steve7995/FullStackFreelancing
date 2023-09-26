import React, { useState, useEffect, useRef } from "react";
import DashboardHeader from "../../components/DashboardHeader";

import all_orders from "../../constants/orders";
import { calculateRange, sliceData } from "../../utils/table-pagination";

import "../Users/styles.css";
import DoneIcon from "../../assets/icons/done.svg";
import CancelIcon from "../../assets/icons/cancel.svg";
import RefundedIcon from "../../assets/icons/refunded.svg";

import axios from "axios";

function Services({ menu_name }) {
  const [services, setServices] = useState(false);
  const [render, setRender] = useState(false);
  let sort = useRef("username");
  let order = useRef("asc");
  let search = useRef("");
  useEffect(() => {
    axios
      .get("https://wbdservicet1.azurewebsites.net/admin/services")
      .then((result) => {
        setServices(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [render]);

  // Search

  async function handleBlockChange(sid, currentStatus) {
    let data = {
      sid: sid,
      isBlock: !currentStatus,
    };
    console.log(data);
    await axios
      .post("https://wbdservicet1.azurewebsites.net/service/blockHandle", data)
      .then((response) => {
        let status = response.data;
        if (status == true) {
          setRender((prev) => !prev);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // setRender((prev) => !prev);
  }

  async function handleFilter() {
    let filter = {
      search: search.current.value,
      sort: sort.current.value,
      order: order.current.value,
    };

    await axios
      .post(
        "https://wbdservicet1.azurewebsites.net/admin/service/filter",
        filter
      )
      .then((result) => {
        setServices((prev) => result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="dashboard-content">
      <DashboardHeader btnText="New Order" />

      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>{menu_name}</h2>
          <div className="dashboard-content-search">
            <input
              type="text"
              placeholder="Search.."
              className="dashboard-content-input"
              ref={search}
            />
            <label htmlFor="">SortBy</label>
            <select
              name=""
              id=""
              className="dashboard-content-input"
              ref={sort}
            >
              <option value="title">Title</option>
              <option value="dateposted">Date Posted</option>
              <option value="price">Price</option>
            </select>
            <label htmlFor="">OrderBy</label>
            <select
              name=""
              id=""
              className="dashboard-content-input"
              ref={order}
            >
              <option value="asc">Ascending</option>
              <option value="dsc">Descending</option>
            </select>
            <button
              type="button"
              className="inp"
              onClick={() => {
                handleFilter();
              }}
            >
              Submit
            </button>
          </div>
        </div>

        <table>
          <thead>
            <th>ID</th>
            <th>TITLE</th>
            <th>SELLER NAME</th>
            <th>STARTING FROM</th>
            <th>BLOCK STATUS</th>
            <th>CHANGE STATUS</th>
          </thead>

          {services && (
            <tbody>
              {services.map((data) => (
                <tr key={data._id}>
                  <td>
                    <span>{data._id}</span>
                  </td>
                  <td>
                    <span>{data.title}</span>
                  </td>
                  <td>
                    <span>{data.seller.fullname}</span>
                  </td>
                  <td>
                    <span>${data.price}</span>
                  </td>
                  <td>
                    <div>
                      {data.isBlock === false ? (
                        <img
                          src={DoneIcon}
                          alt="paid-icon"
                          className="dashboard-content-icon"
                        />
                      ) : (
                        <img
                          src={CancelIcon}
                          alt="canceled-icon"
                          className="dashboard-content-icon"
                        />
                      )}
                    </div>
                  </td>
                  <td>
                    <div>
                      <span>
                        <button
                          className="inp"
                          style={{
                            backgroundColor:
                              data.isBlock === true ? "green" : "red",
                          }}
                          onClick={() => {
                            handleBlockChange(data._id, data.isBlock);
                          }}
                        >
                          {data.isBlock === false ? "Block" : "Unblock"}
                        </button>
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default Services;
