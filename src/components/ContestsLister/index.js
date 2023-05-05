import { useEffect, useState } from "react";
import axios from "axios";
import { ContestTable } from "./ContestTable";
import { Container } from "@mui/material";
import ReactLoading from "react-loading";

export const ContestLister = ({ site = "codeforces" }) => {
  const [loading, setLoading] = useState(false);
  const [contestsList, setContestsList] = useState([]);

  const makeTwoDigit = (d) => {
    if (d < 10) {
      return `0${d}`;
    }

    return d;
  };

  const fetchContestsList = async () => {
    setLoading(true);
    const res = await axios.get(`https://kontests.net/api/v1/${site}`);
    let data = res.data;
    data.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
    data = data.map((value) => {
      let d = parseInt(value.duration) / 3600;
      if (d >= 24) {
        d = parseInt(d / 24);
        d = `${d} days`;
      } else {
        if (d % 0.5 !== 0) {
          d = d.toFixed(2);
        }
        d = `${d} hours`;
      }

      let s = value.site;
      if (!value.site) {
        s = site
          .split("_")
          .map((txt) => txt.charAt(0).toUpperCase() + txt.slice(1))
          .join("");
      }

      let t = new Date(value.start_time);
      const start_date = `${makeTwoDigit(t.getDate())}-${makeTwoDigit(
        t.getMonth() + 1
      )}-${t.getFullYear()}`;
      const start_time = `${makeTwoDigit(t.getHours())}:${makeTwoDigit(
        t.getMinutes()
      )}`;

      t = new Date(value.end_time);
      const end_date = `${makeTwoDigit(t.getDate())}-${makeTwoDigit(
        t.getMonth() + 1
      )}-${t.getFullYear()}`;
      const end_time = `${makeTwoDigit(t.getHours())}:${makeTwoDigit(
        t.getMinutes()
      )}`;

      value = {
        ...value,
        duration: d,
        site: s,
        start_date: start_date,
        start_time: start_time,
        end_date: end_date,
        end_time: end_time,
      };
      return value;
    });
    setContestsList(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchContestsList();
  }, [site]);

  return (
    <>
      {loading ? (
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "200px",
          }}
        >
          <ReactLoading type="spin" color="#000000" height={60} width={60} />
        </Container>
      ) : (
        <>
          <Container
            maxWidth={false}
            sx={{
              marginTop: 5,
            }}
          >
            <ContestTable site={site}>{contestsList}</ContestTable>
          </Container>
        </>
      )}
    </>
  );
};
