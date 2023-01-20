import { useState } from "react";
import apiClient from "./apis/apiClient";
import BarChartContainer from "./components/BarChartContainer";
import { getProblemRatingDistribution } from "./utils";

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
      console.log(response.data.result);
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
        <BarChartContainer getData={getProblemRatingDistribution} data={data} />
      )}
    </>
  );
};

export default App;
