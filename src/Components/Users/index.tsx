import React, {useState } from 'react';
import { Table, Space, Button, message } from 'antd';
import 'antd/dist/antd.css';
import { StyledButton, StyledContent, StyledLayout } from './styles';
import Sidebar from '../Sidebar';
import useGetListOfUsers from 'hooks/useUsers';
import Loading from 'Components/Loading';
import { Link } from 'react-router-dom';
import { lang } from 'language/en';
import { toBlockUnblockUser } from 'hooks/useUsers';
import ButtonUsers from 'Components/Button';
import { IUserId } from 'hooks/types';
const { Column } = Table;

const Users = (): JSX.Element => {
  const { error, isLoading, data } = useGetListOfUsers();
  // const [loading, setLoading] = useState(false);
  if (isLoading) return <Loading />;
  if (error instanceof Error) return <h1>Error: {error.message}</h1>;
  const blockUser = (dataIndex: boolean, key: IUserId) =>
    toBlockUnblockUser(dataIndex, key)
      .then(() => message.success(lang.updateStatus.success))
      .catch(() => message.success(lang.updateStatus.success));
  // setLoading(loading);
  return (
    <StyledLayout>
      <Sidebar />
      <StyledContent>
        <ButtonUsers>+</ButtonUsers>
        <Table dataSource={data}>
          <Column title={lang.userInfo.lastName} dataIndex="last_name" key="id" />
          <Column
            title="Action"
            key="action"
            dataIndex="id"
            render={dataIndex => (
              <Space size="middle">
                <Link to={`/admin/${dataIndex}`}>Edit</Link>
              </Space>
            )}
          />
          <Column
            title={lang.userInfo.userStatus}
            dataIndex="is_block"
            key="id"
            render={(dataIndex, key: IUserId) => (
              <Space size="middle">
                <Button
                  onClick={() => {
                    blockUser(dataIndex, key);
                  }}
                  htmlType="submit"
                  type="link"
                >
                  {dataIndex ? lang.updateStatus.block : lang.updateStatus.unblock}
                </Button>
              </Space>
            )}
          />
        </Table>
      </StyledContent>
    </StyledLayout>
  );
};
export default Users;
