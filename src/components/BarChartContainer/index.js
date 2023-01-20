import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

const BarChartContainer = ({ data: parentData, getData }) => {
  const [data, setData] = useState();

  useEffect(() => {
    if (parentData) {
      setData(getData(parentData));
    }
  }, [parentData, getData]);

  return data ? (
    <BarChart width={600} height={400} data={data}>
      <Bar dataKey="value" fill="blue" />
      <XAxis dataKey="key" />
      <YAxis />
    </BarChart>
  ) : (
    <></>
  );
};

export default BarChartContainer;
