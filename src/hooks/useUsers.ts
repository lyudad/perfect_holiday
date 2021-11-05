import { useQuery } from "react-query";
import axios from "axios";

export type User = {
  id: number;
  name: string;
}

export default function useUsers() {
  return useQuery(
    "users",
    async (): Promise<Array<User>> => {
      const { data } = await axios.get(
        "http://jsonplaceholder.typicode.com/users"
      );
      return data;
    }
  );
}
