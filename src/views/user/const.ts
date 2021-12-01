export const columns = [
  {
    title: 'Start Date',
    dataIndex: 'startDate',
  },
  {
    title: 'End Date',
    dataIndex: 'endDate',
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
