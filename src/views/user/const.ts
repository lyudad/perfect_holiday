export const columns = [
  {
    title: 'Start Date',
    dataIndex: 'start_date',
  },
  {
    title: 'End Date',
    dataIndex: 'end_date',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
];

export function addLeadingZero(d: number) {
  return d < 10 ? '0' + d : d;
}
export function showCurrentDate(value: Date) {
  const getCurrentDay = addLeadingZero(value.getDate());
  const getCurrentMonth = addLeadingZero(value.getMonth() + 1);
  const getCurrentYear = value.getFullYear();
  return `${getCurrentYear}-${getCurrentMonth}-${getCurrentDay}`;
}
export const howManyPassSickDays = 30;
export const howManyPassVacationDays = 60;

export function daysIntoYear(date: Date) {
  return (
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
      Date.UTC(date.getFullYear(), 0, 0)) /
    24 /
    60 /
    60 /
    1000
  );
}
