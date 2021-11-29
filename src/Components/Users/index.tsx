import { Table, Space, Button, message, Result } from 'antd';
import 'antd/dist/antd.css';
import { StyledContent, StyledLayout } from './styles';
import Sidebar from '../Sidebar';
import useGetListOfUsers from 'hooks/useUsers';
import Loading from 'Components/Loading';
import { Link } from 'react-router-dom';
import { lang } from 'language/en';
import { toBlockUnblockUser } from 'hooks/useUsers';
import ButtonUsers from 'Components/Button';
import { IUserId } from 'hooks/types';
import store from 'Redux/store';
import { Role } from 'constants/constants';
const { Column } = Table;

const Users = (): JSX.Element => {
  const { error, isLoading, data } = useGetListOfUsers();
  const state = store.getState();
  const role = state.person.user.role;
  if (isLoading) return <Loading />;
  if (role === Role.EMPLOYEE)
    return (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, but you do not have access to this page."
        extra={
          <Button type="primary" href="/user">
            Back Home
          </Button>
        }
      />
    );
  if (error instanceof Error)
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary">Back Home</Button>}
      />
    );

  const blockUser = (dataIndex: boolean, key: IUserId) =>
    toBlockUnblockUser(dataIndex, key)
      .then(() => message.success(lang.updateStatus.success))
      .catch(() => message.success(lang.updateStatus.success));
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
