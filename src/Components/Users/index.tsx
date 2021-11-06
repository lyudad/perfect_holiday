import React from "react";
import { Table, Space } from "antd";
import "antd/dist/antd.css";
import { StyledButton, StyledContent, StyledLayout } from "./styles";
import useUsers from "../../hooks/useUsers";
import Loading from "Components/Loading";
const { Column } = Table;

const Users = () => {
    const { error, isLoading, data } = useUsers();

    if (isLoading) return <Loading />
    if (error instanceof Error) return <h1>Error: {error.message}</h1>

    return (
        <StyledLayout>
            <StyledContent>
                <StyledButton type="primary" shape="round" htmlType="submit" size="large">+</StyledButton>
                <Table dataSource={data}>
                    <Column title="First Name" dataIndex="name" key="name" />
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


export default Users;