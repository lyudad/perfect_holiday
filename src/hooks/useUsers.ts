import { useQuery } from "react-query";
import axios from "axios";

type User = {
  id: number;
  title: string
  body: string
  error: typeof Error
}

export default function useUsers() {
  return useQuery(
    "users",
    async (): Promise<Array<User>> => {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return data;
    }
  );
}
