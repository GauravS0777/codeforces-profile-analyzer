import moment from "moment/moment";

export const getProblemRatingDistribution = (data) => {
  const mp = {};
  const set = new Set();
  data?.forEach((value) => {
    const rating = value?.problem?.rating;
    const name = value?.problem?.name;
    const verdict = value?.verdict;
    if (rating && !set.has(name) && verdict === "OK") {
      if (mp[rating]) {
        mp[rating] += 1;
      } else {
        mp[rating] = 1;
      }
      set.add(name);
    }
  });

  let arr = [];
  for (let key in mp) {
    arr.push([key, mp[key]]);
  }

  return arr;
};

export const getProblemTagDistribution = (data) => {
  const mp = {};
  const set = new Set();
  data?.forEach((value) => {
    const tags = value?.problem?.tags;
    const name = value?.problem?.name;
    const verdict = value?.verdict;
    if (tags && !set.has(name) && verdict === "OK") {
      tags.forEach((tag) => {
        if (mp[tag]) {
          mp[tag] += 1;
        } else {
          mp[tag] = 1;
        }
      });
      set.add(name);
    }
  });

  let arr = [];
  for (let key in mp) {
    arr.push([`${key}: ${mp[key]}`, mp[key]]);
  }

  return arr;
};

export const getDataForCalendarHeatmap = (data) => {
  const mp = {};
  data.forEach((value) => {
    const t = value?.creationTimeSeconds;
    if (t) {
      const d = moment(new Date(t * 1000)).format("YYYY-MM-DD");
      if (mp[d]) {
        mp[d] += 1;
      } else {
        mp[d] = 1;
      }
    }
  });

  const arr = [];
  for (let key in mp) {
    let value;
    if (mp[key] < 1) {
      value = 0;
    } else if (mp[key] < 3) {
      value = 1;
    } else if (mp[key] < 5) {
      value = 2;
    } else {
      value = 3;
    }
    arr.push({
      date: new Date(key),
      count: value,
      numberOfSubmissions: mp[key],
    });
  }

  return arr;
};
