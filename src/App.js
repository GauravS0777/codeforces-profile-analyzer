import { useEffect, useState } from "react";
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
  getProblemsCount,
  getUnsolvedProblems,
} from "./utils";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

const App = () => {
  const [username, setUsername] = useState("");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [contestData, setContestData] = useState();
  const [problemsCount, setProblemsCount] = useState(0);
  const [unsolvedProblemsList, setUnsolvedProblemsList] = useState([]);

  const fetchUserInfo = async () => {
    setData(null);
    setLoading(true);
    try {
      let response = await apiClient.get(`/user.status?handle=${username}`);
      setData(response.data.result);

      response = await apiClient.get(`/user.rating?handle=${username}`);
      setContestData(response.data.result);
    } catch (error) {
      console.log("Error: ", error);
      if (error?.response?.status === 400) {
        toast("Invalid Codeforces Handle");
      } else {
        toast("Something went wrong");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (data) {
      setProblemsCount(getProblemsCount(data));
      setUnsolvedProblemsList(getUnsolvedProblems(data));
    }
  }, [data]);

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
          Search
        </button>
        {loading ? (
          <p>Loading...</p>
        ) : (
          data && (
            <div style={{ marginTop: 20 }}>
              <div className="section-container">
                <h3>Solved Problem's Rating Distribution</h3>

                <BarChart
                  getData={getProblemRatingDistribution}
                  data={data}
                  axisTitle={["Problem Rating", "Solved Count"]}
                />
              </div>

              <div className="section-container">
                <h3>Solved Problem's Tags Distribution</h3>

                <PieChart
                  getData={getProblemTagDistribution}
                  data={data}
                  axisTitle={["Problem Tag", "Solved Count"]}
                />
              </div>

              <div className="section-container">
                <h3>User contest rating change</h3>

                <LineChart
                  data={contestData}
                  getData={getContestRatingChanges}
                  axisTitle={["Time", "Rating"]}
                />
              </div>

              <div className="section-container">
                <h3>Stats</h3>

                <p>Number of contests: {contestData.length}</p>
                <p>Number of problems tried: {problemsCount.tried}</p>
                <p>Number of problems solved: {problemsCount.solved}</p>
                <p>Number of problems unsolved: {problemsCount.unsolved}</p>
              </div>

              {unsolvedProblemsList.length && (
                <div className="section-container">
                  <h3>Unsolved Problems</h3>

                  <div className="unsolved-problems-container">
                    {unsolvedProblemsList.map((value) => (
                      <p>
                        <a href={value.link} target="_blank">
                          {value.name}
                        </a>
                      </p>
                    ))}
                  </div>
                </div>
              )}

              <div className="section-container">
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

      <ToastContainer />
    </>
  );
};

export default App;
