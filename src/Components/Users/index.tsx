import { Table, Space, Button, message } from 'antd';
import 'antd/dist/antd.css';
import { StyledContent, StyledLayout } from './styles';
import Sidebar from '../Sidebar';
import useGetListOfUsers from 'hooks/useUsers';
import Loading from 'Components/Loading';
import { NotFound } from '../404/index';
import { Link } from 'react-router-dom';
import { lang } from 'language/en';
import { toBlockUnblockUser } from 'hooks/useUsers';
import { IUserId } from 'hooks/types';
import store from 'Redux/store';
import { Role, url } from 'constants/constants';
import { useState } from 'react';
import { NotAccess } from 'Components/403';
import { CollectionCreateForm } from '../AddUserModal/index';

const { Column } = Table;

const Users = (): JSX.Element => {
  const { error, isLoading, data } = useGetListOfUsers();
  const [visible, setVisible] = useState<boolean>(false);
  const state = store.getState();
  const role = state.person.user.role;
  if (isLoading) return <Loading />;
  if (role === Role.EMPLOYEE) return <NotAccess />;
  if (error instanceof Error) return <NotFound />;

  const blockUser = (dataIndex: boolean, key: IUserId) => {
    toBlockUnblockUser(dataIndex, key)
      .then(() => message.success(lang.updateStatus.success))
      .catch(() => message.success(lang.updateStatus.success));
  };

  return (
    <StyledLayout>
      <Sidebar />
      <StyledContent>
        <div>
          <Button type="primary" shape="round" onClick={() => setVisible(true)}>
            +
          </Button>
          <CollectionCreateForm
            visible={visible}
            onCreate={() => setVisible(false)}
            onCancel={() => setVisible(false)}
          />
        </div>
        <Table dataSource={data}>
          <Column title={lang.userInfo.lastName} dataIndex="last_name" key="id" />
          <Column
            title="Action"
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
