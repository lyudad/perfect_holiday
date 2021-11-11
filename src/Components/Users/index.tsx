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
        key: '1',
        firstName: 'John',

    },
    {
        key: '2',
        firstName: 'Jim',
    },
    {
        key: '3',
        firstName: 'Joe',
    },
];

const Users = ()=>{
    return(
        <StyledLayout>
            <StyledContent>
                {/*<StyledButton type="primary" shape="round" htmlType="submit" size="large">+</StyledButton>*/}
                <ButtonUsers>+</ButtonUsers>
                <Table dataSource={data}>
                    <Column title="First Name" dataIndex="firstName" key="firstName" />
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
                        key="block"
                        render={() => (
                            <Space size="middle">
                                <a key="block">Block</a>
                                <a key="unlock">Unblock</a>
                            </Space>
                        )}
                    />
                </Table>
            </StyledContent>
        </StyledLayout>
    )
}
export default Users