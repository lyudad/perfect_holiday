import ButtonUsers from 'Components/Button';
import { useState } from "react";
import { Table, Space } from "antd";
import "antd/dist/antd.css";
import { StyledContent, StyledLayout } from "./styles";
import Sidebar from "../Sidebar";
const { Column } = Table;
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
                <a>block
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