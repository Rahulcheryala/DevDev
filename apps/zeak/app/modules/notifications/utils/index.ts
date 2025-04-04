import moment from "moment";

export const buildDateTime = (date?: string, time?: string) => {
  if (!date) return;
  const dateTime = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm:ss");
  return dateTime.format();
};

export const getTime = (datetime?: Date) => {
  if (!datetime) return;
  return moment(datetime).format("HH:mm:ss");
};

export const getDate = (datetime?: Date) => {
  if (!datetime) return;
  return moment(datetime).format("YYYY-MM-DD");
};
