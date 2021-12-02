import { Table, Space, Button, message } from 'antd';
import 'antd/dist/antd.css';
import { Input, Row, StyledContent, StyledLayout } from './styles';
import Sidebar from '../Sidebar';
import useGetListOfUsers from 'hooks/useUsers';
import Loading from 'Components/Loading';
import { NotFound } from '../404/index';
import { Link } from 'react-router-dom';
import { lang } from 'language/en';
import { toBlockUnblockUser } from 'hooks/useUsers';
import { IUserId, User } from 'hooks/types';
import store from 'Redux/store';
import { Role, url, checkIsBlock } from 'constants/constants';
import { SetStateAction, useEffect, useState } from 'react';
import { NotAccess } from 'Components/403';
import { CollectionCreateForm } from '../AddUserModal/index';
import React from 'react';
import './index.css'
const { Column } = Table;

const Users = (): JSX.Element => {
  const SelectColor = (record:{is_block:boolean}) => {
    return checkIsBlock(record.is_block) || ''
  }
  const { error, isLoading, data } = useGetListOfUsers();
  const [visible, setVisible] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<User[]>([]);
  const state = store.getState();
  const role = state.person.user.role;

  const blockUser = (dataIndex: boolean, key: IUserId) => {
    toBlockUnblockUser(dataIndex, key)
      .then(() => message.success(lang.updateStatus.success))
      .catch(() => message.success(lang.updateStatus.success));
  };

  const handleChange = (event: { target: { value: SetStateAction<string> } }) =>
    setSearchTerm(event.target.value);
  useEffect(() => {
    if (!data) return;
    const results: User[] = data.filter(person =>
      person.last_name.toLowerCase().includes(searchTerm),
    );
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
        <Table dataSource={!searchTerm ? data : searchResults}
               rowKey="id"
               rowClassName={SelectColor}
        >
          <Column title={lang.userInfo.lastName} dataIndex="last_name" key="id" />
          <Column
            title="Action"
            key="id"
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
