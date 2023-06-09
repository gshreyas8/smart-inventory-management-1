import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import "./Analytics.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  Bar,
  BarChart,
} from "recharts";
import moment from "moment";

import ReceiptIcon from "@mui/icons-material/Receipt";
import { ProductDialog } from "./ProductDialog";

import { useNavigate } from "react-router-dom";
import { OutwardDialog } from "./OutwardDialog";

function ReceiptTable() {
  const [inward, setInward] = useState([]);
  const [outward, setOutwards] = useState([]);

  const [godown, setGodown] = useState([]);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [selectOutward, setSelectOutward] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8080/inward")
      .then((response) => setInward(response.data))
      .catch((error) => console.log(error));

    axios
      .get("http://localhost:8080/godown")
      .then((response) => setGodown(response.data))
      .catch((error) => console.log(error));

    axios
      .get("http://localhost:8080/outward")
      .then((response) => setOutwards(response.data))
      .catch((error) => console.log(error));
  }, []);
  function handleRowClick(inward) {
    setSelectedReceipt(inward);
    navigate(`inward-data/${inward.inwardId}`);
  }
  console.log(selectedReceipt);

  function handleRowClickOutward(outward) {
    setSelectOutward(outward);
    navigate(`outward-data/${outward.outwardId}`);
  }

  function handleClose() {
    setSelectedReceipt(null);
    setSelectOutward(null);
  }

  const inwardCounts = inward.reduce((acc, curr) => {
    const location = curr.godownId;
    if (!acc[location]) {
      acc[location] = 0;
    }
    acc[location]++;
    return acc;
  }, {});

  const outwardCounts = outward.reduce((acc, curr) => {
    const location = curr.godownId;
    if (!acc[location]) {
      acc[location] = 0;
    }
    acc[location]++;
    return acc;
  }, {});

  const data = Object.keys(inwardCounts).map((location) => {
    if (godown.length > 0) {
      console.log("Godown", godown);
      const loc = godown.find((e) => e.godownId === parseInt(location));
      console.log(loc);
      const nameloc = loc.godownLocation; // or null or some default value

      return {
        name: nameloc,
        inward: inwardCounts[location],
        outward: outwardCounts[location] || 0,
      };
    }
  });
  console.log("data", godown);
  const COLORS = [
    "#b8afed",
    "#a99fe2",
    "#998fd8",
    "#897fcd",
    "#796fbf",
    "#6a5fad",
    "#5c4e99",
    "#4d3d85",
    "#3e2d71",
    "#2f1c5d",
    "#211c4e",
    "#181a42",
    "#121836",
    "#0c132a",
    "#060a1d",
  ];

  // const getFillColor = (entry, index) => {
  //   const greyShade = 240 - index * 20;
  //   return `rgb(${greyShade}, ${greyShade}, ${greyShade})`;
  // };

  return (
    // <div>
    //   <h1>Analytics</h1>

    //   <LineChart width={500} height={300} data={receipts}>
    //     <CartesianGrid strokeDasharray="3 3" />
    //     <XAxis dataKey="id" />
    //     <YAxis />
    //     <Tooltip />
    //     <Legend />
    //     <Line type="monotone" dataKey="Amount" stroke="#8884d8" />
    //   </LineChart>

    //   <table>
    //     <thead>
    //       <tr>
    //         <th>Inward ID</th>
    //         <th>Godown ID</th>
    //         <th>DateOfSupply</th>

    //         <th>Supplier Name</th>

    //         <th>View Invoice</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {receipts.map((receipt) => (
    //         <tr key={receipt.id}>
    //           <td>{receipt.id}</td>
    //           <td>{receipt.GodownId}</td>
    //           <td>{receipt.DateOfSupply}</td>

    //           <td>{receipt.SupplierName}</td>

    //           <td>
    //             <ReceiptIcon
    //               key={receipt.id}
    //               onClick={() => handleRowClick(receipt)}
    //             ></ReceiptIcon>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    //   {selectedReceipt && (
    //     <ProductDialog receipt={selectedReceipt} onClose={handleClose} />
    //   )}
    // </div>
    <div class="container-chart" style={{ height: "560px", overflow: "auto" }}>
      <h1>Analytics</h1>
      <div className="charts">
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div className="chart1">
            <h2>Deliveries vs Amount</h2>
            <LineChart width={500} height={300} data={outward}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dateOfDelivery" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="billValue" stroke="#8884d8" />
            </LineChart>
          </div>
          <div className="chart2 ">
            <h2>Godown Capacity</h2>

            <PieChart width={500} height={300}>
              <Pie
                data={godown}
                dataKey="godownCapacity"
                nameKey="godownLocation"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={(entry) => entry.godownLocation}
              >
                {" "}
                {godown.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div className="chart3">
                <h2>Orders count</h2>
                <BarChart width={500} height={300} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="inward" fill="#b8afed" />
                  <Bar dataKey="outward" fill="#6a5fad" />
                </BarChart>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div class="analytics-table-container">
          <h2>Inwards</h2>
          <table>
            <thead>
              <tr>
                <th>Receipt No</th>
                <th>Godown Location</th>
                <th>Date Of Supply</th>

                <th>Supplier Name</th>

                <th>View Invoice</th>
              </tr>
            </thead>
            <tbody style={{}}>
              {inward.map((receipt) => (
                <tr key={receipt.inwardId}>
                  <td>{receipt.invoiceNo}</td>
                  <td>{receipt.receivedBy}</td>
                  <td>{moment(receipt.dateOfSupply).format("YYYY-MM-DD")}</td>

                  <td>{receipt.supplier}</td>

                  <td>
                    <ReceiptIcon
                      key={receipt.inwardId}
                      onClick={() => handleRowClick(receipt)}
                    ></ReceiptIcon>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedReceipt && (
            <ProductDialog receipt={selectedReceipt} onClose={handleClose} />
          )}
        </div>

        <div class="table-container">
          <h2>Outwards</h2>
          <table>
            <thead>
              <tr>
                <th>Godown Location</th>

                <th>DateOfSupply</th>
                <th>Customer Name</th>

                <th>Delivery Location</th>

                <th>View Invoice</th>
              </tr>
            </thead>
            <tbody>
              {outward.map((receipt) => (
                <tr key={receipt.outwardId}>
                  <td>{receipt.outwardId}</td>
                  <td>{receipt.dateOfDelivery}</td>
                  <td>{receipt.deliveredTo}</td>

                  <td>{receipt.destination}</td>

                  <td>
                    <ReceiptIcon
                      key={receipt.outwardId}
                      onClick={() => handleRowClickOutward(receipt)}
                    ></ReceiptIcon>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectOutward && (
            <OutwardDialog receipt={selectOutward} onClose={handleClose} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ReceiptTable;
