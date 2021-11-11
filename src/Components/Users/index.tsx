import {ButtonUsers} from 'Components/Button';
const { Column } = Table;
import { useState } from "react";
import { Table, Space } from "antd";
import "antd/dist/antd.css";
import { StyledButton, StyledContent, StyledLayout } from "./styles";
import Sidebar from "../Sidebar";
import useUsers from "hooks/useUsers";
import Loading from "Components/Loading";
const data = [
  {
    key: 1,
    first_name: "John",
    is_block: false,
  }, 
  {
    key: 2,
    first_name: "Jim",
    is_block: false,
  },
  {
    key: 3,
    first_name: "Joe",
    is_block: false,
  },
];

const Users = ()=>{
      const [toggle, setToggle] = useState(false);
  // Здесь приходит обьект data который будем ставить вместо моковых данных
  // Запускал данные с БД поддягиваються
  // const { error, isLoading, data } = useUsers();
  // if (isLoading) return <Loading />
  // if (error instanceof Error) return <h1>Error: {error.message}</h1>
  return (
    <StyledLayout>
      <Sidebar />
      <StyledContent>
        <ButtonUsers>+</ButtonUsers>
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
            key="first_name"
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