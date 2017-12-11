export const dateFilter = (timestamp) => {
  let date = new Date(timestamp);
  return date.toDateString();
};

export const getId = () => {
  let id ="";
  for (var i = 0; i < 6; i++) {
    id +=  Math.floor(Math.random(100, 1000) * 10000).toString(16);
  }
  return id;
};
