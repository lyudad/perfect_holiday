export enum TypeRestDay {
  SICK = 'sick',
  VACATION = 'vacation',
  UNPAID = 'unpaid'
}

export type Vacation = {
  startDate: Date;
  endDate: Date;
};
