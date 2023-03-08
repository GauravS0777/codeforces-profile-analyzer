import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import moment from "moment";

const LineChart = ({ data: parentData, getData, axisTitle }) => {
  const [data, setData] = useState();
  const [hAxisTicks, setHAxisTicks] = useState([]);

  useEffect(() => {
    const temp = [];
    let curr = moment();
    for (let i = 0; i < 12; i++) {
      const t = curr.startOf("month").unix();
      const monthName = curr.format("MMM");
      const year = curr.format("YYYY");
      temp.push({ v: t, f: `${monthName} ${year}` });
      curr = curr.subtract(1, "months");
    }
    setHAxisTicks(temp);
    // console.log(moment().subtract(1, "months").startOf("month").format("MMM"));
  }, []);

  useEffect(() => {
    if (parentData) {
      setData([axisTitle, ...getData(parentData)]);
    }
  }, [parentData, getData, axisTitle]);

  const options = {
    title: "User's Rating Change",
    curveType: "function",
    legend: { position: "bottom" },
    hAxis: { ticks: hAxisTicks },
    pointSize: 8,
  };

  return data ? (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  ) : null;
};

export default LineChart;
