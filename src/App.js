import { useState } from "react";
import apiClient from "./apis/apiClient";
import BarChart from "./components/BarChart";
import CalendarHeatMap from "./components/CalendarHeatMap";
import PieChart from "./components/PieChart";
import LineChart from "./components/LineChart";
import {
  getProblemRatingDistribution,
  getProblemTagDistribution,
  getDataForCalendarHeatmap,
  getContestRatingChanges,
} from "./utils";

import "./App.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [contestData, setContestData] = useState();

  const fetchUserInfo = async () => {
    setErrorMsg("");
    setData(null);
    setLoading(true);
    try {
      let response = await apiClient.get(`/user.status?handle=${username}`);
      setData(response.data.result);

      response = await apiClient.get(`/user.rating?handle=${username}`);
      setContestData(response.data.result);
    } catch (error) {
      setErrorMsg("Invalid Codeforces Handle");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="main-container">
        <h2 className="app-heading">Codeforces Profile Analyzer</h2>
        <input
          className="handle-input"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter codeforces handle"
        />
        <button className="submit-button" onClick={fetchUserInfo}>
          Submit
        </button>
        {errorMsg !== "" ? (
          <p className="error-message">{errorMsg}</p>
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          data && (
            <div style={{ marginTop: 20 }}>
              <div>
                <h3>Solved Problem's Rating Distribution</h3>

                <BarChart
                  getData={getProblemRatingDistribution}
                  data={data}
                  axisTitle={["Problem Rating", "Solved Count"]}
                />
              </div>

              <div>
                <h3>Solved Problem's Tags Distribution</h3>

                <PieChart
                  getData={getProblemTagDistribution}
                  data={data}
                  axisTitle={["Problem Tag", "Solved Count"]}
                />
              </div>

              <div>
                <h3>User contest rating change</h3>

                <LineChart
                  data={contestData}
                  getData={getContestRatingChanges}
                  axisTitle={["Time", "Rating"]}
                />
              </div>

              <div>
                <h3>User Activity Heat Map</h3>

                <CalendarHeatMap
                  getData={getDataForCalendarHeatmap}
                  data={data}
                />
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default App;
