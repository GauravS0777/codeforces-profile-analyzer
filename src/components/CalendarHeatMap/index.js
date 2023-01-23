import { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import moment from "moment";
import "./index.css";

const CalendarHeatMap = ({ data: parentData, getData }) => {
  const [data, setData] = useState();
  const [startDate, setStartDate] = useState(new Date("2022-01-01"));
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    if (parentData) {
      setEndDate(new Date());
      setStartDate(moment(new Date()).subtract(1, "years").toDate());
      setData(getData(parentData));
    }
  }, [parentData, getData]);

  return data ? (
    <>
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={data}
        classForValue={(value) => {
          if (!value || value < 1) {
            return "color-empty";
          }
          return `color-${value.count}`;
        }}
        showWeekdayLabels={true}
      />
    </>
  ) : (
    <></>
  );
};

export default CalendarHeatMap;
