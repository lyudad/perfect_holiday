export type UserRoleType = 'employee' | 'admin' | 'super';
export type TStatus = 'approved' | 'pending' | 'declined' | 'changed';

export interface IUserId {
  id: string;
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
};

export type TBookkHoliday = {
  start_date: string;
  end_date: string;
  type: string;
};

export type TApprovedDay = {
  id: string;
  status: TStatus;
  userId: string;
};

export type TEditRestDays = {
  id: string;
  status: TStatus;
  start_date: string;
  end_date: string;
  userId: string;
}

export type TEditVacationsDaysUser = {
  start_date: string;
  end_date: string;
  status: TStatus;
}

export type TDeleteUser = {
  id: string;
  userId: string;
}
