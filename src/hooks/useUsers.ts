import { useQuery } from "react-query";
import axios from "axios"
const {REACT_APP_USERS_LIST} = process.env
export type UserRoleType = 'employee' | 'admin' | 'super';

export type User = {
  role: UserRoleType;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  is_block: boolean;
  available_vacation: number;
  available_sick_days: number;
}

export default function useUsers() {
  return useQuery(
    "users",
    async (): Promise<Array<User>> => {
      const { data } = await axios.get(
        `${REACT_APP_USERS_LIST}`
      );
      return data;
    }
  );
}
