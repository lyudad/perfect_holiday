export type TRole = 'super' | 'admin' | 'employee';

export interface IUser {
  _id: string;
  name: string;
  role: TRole;
}

export interface IPermission {
  readonly rejectDaysOff?: boolean;
  readonly approveDaysOff?: boolean;
  readonly editOwnDaysOff?: boolean;
  readonly editEmployeesDaysOff?: boolean;
  readonly seeDashboard?: boolean;
  readonly seeUsersList?: boolean;
  readonly createUser?: boolean;
  readonly updateUser?: boolean;
  readonly deleteUser?: boolean;
  readonly sendPassword?: boolean;
  readonly blockUser?: boolean;
  readonly unblockUser?: boolean;
}
