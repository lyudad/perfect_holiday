import { useState } from "react";
import { Table, Space } from "antd";
import "antd/dist/antd.css";
import { StyledButton, StyledContent, StyledLayout } from "./styles";
import Sidebar from "../Sidebar";
import useUsers from "hooks/useUsers";
import Loading from "Components/Loading";
const { Column } = Table;

const data = [
  {
    key: "1",
    firstName: "John",
    status: "block",
  },
  {
    key: "2",
    firstName: "Jim",
    status: "block",
  },
  {
    key: "3",
    firstName: "Joe",
    status: "block",
  },
];

const Users = () => {
  const [toggle, setToggle] = useState(false);
  const { error, isLoading, data } = useUsers();

  if (isLoading) return <Loading />
  if (error instanceof Error) return <h1>Error: {error.message}</h1>

  return (
    <StyledLayout>
      <Sidebar />
      <StyledContent>
        <StyledButton
          type="primary"
          shape="round"
          htmlType="submit"
          size="large"
        >
          +
        </StyledButton>
        <Table dataSource={data}>
          <Column title="First Name" dataIndex="first_name" key="first_name" />
          <Column
            title="Action"
            key="action"
            render={() => (
              <Space size="middle">
                <a>Edit</a>
              </Space>
            )}
          />
          <Column
            title="User status"
            dataIndex="status"
            key="firstName"
            render={() => (
              <Space size="middle">
                <a onClick={() => setToggle((toggle) => !toggle)}>
                  {toggle ? "block" : "unblock"}
                </a>
              </Space>
            )}
          />
        </Table>
      </StyledContent>
    </StyledLayout>
  );
};
export default Users;