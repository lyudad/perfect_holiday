export type UserRoleType = 'employee' | 'admin' | 'super';
export interface IUserId {
  id: string;
}
export type User = {
  role: UserRoleType;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  is_block: boolean;
  available_vacation: number;
  available_sick_days: number;
};
