export const isDeadLine = (deadLineDate: number): boolean => {
  const today = new Date();
  const curDate = new Date(today.setDate(today.getDate() - 1)).getTime();
  return curDate > deadLineDate;
};
