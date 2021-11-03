import React from "react";
import { QueryClient, QueryClientProvider, useQueryClient } from "react-query";
import useUsers from "~/hooks/useUsers";

const Users = () => {
    const queryClient = useQueryClient();
    const {} = queryClient;
    const { status, data, error, isLoading } = useUsers();
    if (isLoading) return <h1>Loading...</h1>
    if (error instanceof Error) return <span>Error: {error.message}</span>

    return (
        <div>
      <div>
        
      </div>
      {status === "loading" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <h1>{data.title}</h1>
          <div>
            <p>{data.body}</p>
          </div>
          <div>{isFetching ? "Background Updating..." : " "}</div>
        </>
      )}
    </div>
    )
}
export default Users