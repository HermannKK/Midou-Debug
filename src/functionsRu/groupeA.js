import moment from "moment";
const convertToDate = datefull => {
  var months = [
    "jan",
    "feb",
    "mar",
    "avr",
    "mai",
    "jun",
    "jul",
    "aoü",
    "sep",
    "oct",
    "nov",
    "dec"
  ];
  var year = datefull.getFullYear();
  var month = months[datefull.getMonth()];
  var date = datefull.getDate();
  const hours = datefull.getHours();
  const minutes = "0" + datefull.getMinutes();
  const seconds = "0" + datefull.getSeconds();
  const formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  const formattedDate = date + " " + month + " " + year;
  return { formattedDate, formattedTime };
};

export const convertDate = dateObject => {
  const now = moment().format();
  const datefull = new Date(dateObject);
  const formatdate = convertToDate(datefull);
  let time_des = null;
  let isRecent = false;

  const diff_sec = moment
    .duration(
      moment(now, "YYYY/MM/DD HH:mm").diff(moment(datefull, "YYYY/MM/DD HH:mm"))
    )
    .asSeconds();
  const diff_min = moment
    .duration(
      moment(now, "YYYY/MM/DD HH:mm").diff(moment(datefull, "YYYY/MM/DD HH:mm"))
    )
    .asMinutes();
  const diff_hr = moment
    .duration(
      moment(now, "YYYY/MM/DD HH:mm").diff(moment(datefull, "YYYY/MM/DD HH:mm"))
    )
    .asHours();
  const diff_jr = moment
    .duration(
      moment(now, "YYYY/MM/DD HH:mm").diff(moment(datefull, "YYYY/MM/DD HH:mm"))
    )
    .asDays();
  if (diff_hr < 24) isRecent = true;
  if (diff_sec < 60) {
    time_des = "a l'instant";
  } else if (diff_min < 60) {
    time_des = "il y a " + Math.ceil(diff_min);
    if (diff_min <= 1) {
      time_des = time_des + " minute";
    } else time_des = time_des + " minutes";
  } else if (diff_hr < 24) {
    time_des = "il y a " + Math.ceil(diff_hr);
    if (diff_hr <= 1) {
      time_des = time_des + " heure";
    } else time_des = time_des + " heures";
  } else if (diff_jr < 7) {
    time_des = "il y a " + Math.ceil(diff_jr);
    if (diff_jr <= 1) {
      time_des = time_des + " jour";
    } else time_des = time_des + " jours";
  } else time_des = formatdate.formattedDate;
  return { time_des, ...formatdate, isRecent,datefull };
};
