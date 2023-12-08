import dayjs from "dayjs";
dayjs.locale("ko");

export const tiemBefore = (date: string | Date) => {
  const today = dayjs();
  const updateTime = dayjs(date).format("YYYY-MM-DD HH:mm");

  const betweenTime = today.diff(updateTime, "minute");

  if (betweenTime < 5) return "방금전";
  if (betweenTime < 60) return `${betweenTime}분전`;

  const betweenTimeHour = today.diff(updateTime, "hour");
  if (betweenTimeHour < 24) return `${betweenTimeHour}시간전`;

  const betweenTimeDay = today.diff(updateTime, "day");
  if (betweenTimeDay < 30) return `${betweenTimeDay}일 전`;

  const betweenTimeMonth = today.diff(updateTime, "month");
  if (betweenTimeMonth < 11) return `${betweenTimeMonth + 1}달전`;

  return `${today.diff(updateTime, "year")}년전`;
};
