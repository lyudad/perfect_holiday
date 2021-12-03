import { Table, Space, Button, message } from 'antd';
import 'antd/dist/antd.css';
import { Input, Row, StyledContent, StyledLayout } from './styles';
import Sidebar from '../Sidebar';
import useGetListOfUsers from 'hooks/useUsers';
import Loading from 'Components/Loading';
import { NotFound } from '../404/index';
import { Link } from 'react-router-dom';
import { lang } from 'language/en';
import { toBlockUnblockUser, toDeleteUser } from 'hooks/useUsers';
import { IUserId, User } from 'hooks/types';
import store from 'Redux/store';
import { Role, url, checkIsBlock } from 'constants/constants';
import { SetStateAction, useEffect, useState } from 'react';
import { NotAccess } from 'Components/403';
import { CollectionCreateForm } from '../AddUserModal/index';
import React from 'react';
import './index.css';
const { Column } = Table;

const Users = (): JSX.Element => {
  const SelectColor = (record: { is_block: boolean }) => {
    return checkIsBlock(record.is_block) || '';
  };
  const { error, isLoading, data } = useGetListOfUsers();
  const [visible, setVisible] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<User[]>([]);
  const state = store.getState();
  const role = state.person.user.role;

  const InitialState = {
    canBlockUnblockUser: role === Role.ADMIN,
    canDeleteUser: role === Role.SUPER,
    canColumnRole: role === Role.SUPER,
  };

  const blockUser = (dataIndex: boolean, key: IUserId) => {
    toBlockUnblockUser(dataIndex, key)
      .then(() => message.success(lang.updateStatus.success))
      .catch(() => message.error(lang.updateStatus.fail));
  };

  const deleteUser = (dataIndex: string, key: IUserId) => {
    toDeleteUser({
      id: key.id,
      userId: dataIndex,
    })
      .then(() => message.success(lang.superAdmin.successDelete))
      .catch(() => message.error(lang.superAdmin.failDelete));
  };
  const handleChange = (event: { target: { value: SetStateAction<string> } }) =>
    setSearchTerm(event.target.value);
  useEffect(() => {
    if (!data) return;
    const results: User[] = data.filter(person => {
      return (
        person.last_name.toLowerCase().includes(searchTerm) ||
        person.first_name.toLowerCase().includes(searchTerm)
      );
    });
    setSearchResults(results);
  }, [searchTerm]);

  if (isLoading) return <Loading />;
  if (role === Role.EMPLOYEE) return <NotAccess />;
  if (error instanceof Error) return <NotFound />;

  return (
    <StyledLayout>
      <Sidebar />
      <StyledContent>
        <Row justify="space-between">
          <Input
            placeholder={lang.searchUser.placeholder}
            type="text"
            value={searchTerm}
            onChange={handleChange}
          />
          <Button
            size="large"
            type="primary"
            shape="round"
            onClick={() => setVisible(true)}
          >
            +
          </Button>
          <CollectionCreateForm
            visible={visible}
            onCreate={() => setVisible(false)}
            onCancel={() => setVisible(false)}
          />
        </Row>
        <Table
          dataSource={!searchTerm ? data : searchResults}
          rowKey="id"
          rowClassName={SelectColor}
        >
          <Column title={lang.userInfo.firstName} dataIndex="first_name" key="id" />
          <Column title={lang.userInfo.lastName} dataIndex="last_name" key="id" />
          {InitialState.canColumnRole && (
            <Column title={lang.superAdmin.roleTitle} dataIndex="role" key="id" />
          )}
          <Column
            title={lang.superAdmin.actionsTitle}
            key="action"
            dataIndex="id"
            render={dataIndex => (
              <Space size="middle">
                <Link to={`${url.admin}${dataIndex}`}>Edit</Link>
              </Space>
            )}
          />
          <Column
            title={lang.userInfo.userStatus}
            dataIndex="is_block"
            key="id"
            render={(dataIndex, key: IUserId) => (
              <Space size="middle">
                {InitialState.canBlockUnblockUser && (
                  <Button
                    onClick={() => {
                      blockUser(dataIndex, key);
                    }}
                    htmlType="submit"
                    type="link"
                  >
                    {dataIndex ? lang.updateStatus.block : lang.updateStatus.unblock}
                  </Button>
                )}
                {InitialState.canDeleteUser && (
                  <Button
                    onClick={() => {
                      deleteUser(dataIndex, key);
                    }}
                    htmlType="submit"
                    type="link"
                  >
                    {lang.superAdmin.deleteButton}
                  </Button>
                )}
              </Space>
            )}
          />
        </Table>
      </StyledContent>
    </StyledLayout>
  );
};
export default Users;
