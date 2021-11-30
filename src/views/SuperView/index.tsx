import { Table, Space, Button, message } from 'antd';
import 'antd/dist/antd.css';
import { StyledContent, StyledLayout, StyledSearch } from './styles';
import Sidebar from 'Components/Sidebar';
import useGetListOfUsers from 'hooks/useUsers';
import Loading from 'Components/Loading';
import { Link } from 'react-router-dom';
import { lang } from 'language/en';
import { toDeleteUser } from 'hooks/useUsers';
import ButtonUsers from 'Components/Button';
import { IUserId, TUpdateUser } from './types';
const { Column } = Table;

const SuperView = (): JSX.Element => {
    const { error, isLoading, data } = useGetListOfUsers();

    if (isLoading) return <Loading />;
    if (error instanceof Error) return <h1>Error: {error.message}</h1>;

    const deleteUser = (dataIndex: string, key: IUserId) => {
        toDeleteUser({
        id: key.id,
        userId: dataIndex,
        })
        .then(() => message.success(lang.superAdmin.successDelete))
        .catch(() => message.success(lang.superAdmin.failDelete));
    };

    
    return (
        <StyledLayout>
            <Sidebar />
            <StyledContent>
                <StyledSearch
                    placeholder="search user"
                    enterButton="Search"
                />
                <ButtonUsers>+</ButtonUsers>
                <Table dataSource={data}>
                    <Column title={lang.superAdmin.userFirstName} dataIndex="first_name" key="id" />
                    <Column title={lang.superAdmin.userLastName} dataIndex="last_name" key="id" />
                    <Column
                        title={lang.superAdmin.roleTitle}
                        key="role"
                        dataIndex="role"
                    />
                    <Column
                        title={lang.superAdmin.actionsTitle}
                        key="action"
                        dataIndex="id"
                        render={(dataIndex, key: IUserId) => (
                            <Space size="middle">
                                <Link to={`/admin/${dataIndex}`}>Edit</Link>
                                <Button
                                    onClick={() => deleteUser(dataIndex, key)}
                                    htmlType="submit"
                                    type="link"
                                >
                                    {lang.superAdmin.deleteButton}
                                </Button>
                            </Space>
                        )}
                    />
                </Table>
            </StyledContent>
        </StyledLayout>
    );
};
export default SuperView;

function setData(filteredEvents: any) {
    throw new Error('Function not implemented.');
}
function searchText(searchText: any) {
    throw new Error('Function not implemented.');
}

