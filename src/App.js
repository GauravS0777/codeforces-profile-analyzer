import { useState } from "react";
import apiClient from "./apis/apiClient";
import BarChart from "./components/BarChart";
import CalendarHeatMap from "./components/CalendarHeatMap";
import PieChart from "./components/PieChart";
import {
  getProblemRatingDistribution,
  getProblemTagDistribution,
  getDataForCalendarHeatmap,
} from "./utils";

const App = () => {
  const [username, setUsername] = useState("");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchUserInfo = async () => {
    setErrorMsg("");
    setData(null);
    setLoading(true);
    try {
      const response = await apiClient.get(`/user.status?handle=${username}`);
      setData(response.data.result);
    } catch (error) {
      setErrorMsg("Invalid Codeforces Handle");
    }
    setLoading(false);
  };

  return (
    <>
      <input type="text" onChange={(e) => setUsername(e.target.value)} />
      <button onClick={fetchUserInfo}>Submit</button>
      {errorMsg !== "" ? (
        <p>{errorMsg}</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ marginTop: 20 }}>
          <BarChart
            getData={getProblemRatingDistribution}
            data={data}
            axisTitle={["Problem Rating", "Solved Count"]}
          />

          <PieChart
            getData={getProblemTagDistribution}
            data={data}
            axisTitle={["Problem Tag", "Solved Count"]}
          />

          <CalendarHeatMap getData={getDataForCalendarHeatmap} data={data} />
        </div>
      )}
    </>
  );
};

export default App;
