const formatDate = (d) => {
  if (!d) return "";
  const date = new Date(d);
  if (!date) return "";

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Aprl",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  return day + " " + month;
};

export { formatDate };
