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
  console.log(mp);
  let key;
  let arr = [];
  for (key in mp) {
    console.log(key);
    arr.push({ key: key, value: mp[key] });
  }

  return arr;
};
