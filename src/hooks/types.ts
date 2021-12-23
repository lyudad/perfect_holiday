export type UserRoleType = 'employee' | 'admin' | 'super';
export type TStatus = 'approved' | 'pending' | 'declined' | 'changed';

export interface IUserId {
  id: string;
}
export interface IUserDay {
  id: string;
  start_date: string,
  end_date: string,
  type: string;
}
export type User = {
  id: string;
  role: UserRoleType;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  is_block: boolean;
  available_vacation: number;
  available_sick_days: number;
  vacations?: Array<THoliday>;
  status: string;
};

export type TBookkHoliday = {
  start_date: string;
  end_date: string;
  type: string;
  status?: string;
};
export type THoliday = {
  start_date: string;
  end_date: string;
  type: string;
  status: TStatus;
  userId: string;
};

export type TApprovedDay = {
  id: string;
  status: TStatus;
  userId: string;
  diffDays: number;
  type: string;
};

export type TEditRestDays = {
  id: string;
  userId: string;
};

export type TVacationRestDays = {
  startDate: Date;
  endDate: Date;
};

export type TDeleteUser = {
  id: string;
  userId: string;
};
