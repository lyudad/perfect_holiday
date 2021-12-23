export enum TypeRestDay {
  SICK = 'sick',
  VACATION = 'vacation',
}

export type Vacation = {
  startDate: Date;
  endDate: Date;
};
