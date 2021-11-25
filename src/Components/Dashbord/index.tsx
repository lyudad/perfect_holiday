import { Button, Space, Table } from 'antd';
import { StyledLayout, StyledContent } from './styles';
import Sidebar from 'Components/Sidebar';
import { useAllNotApprovedRestDays , toApprovedOrDisapproveRestDay } from 'hooks/useUsers';
import Loading from 'Components/Loading';
import Column from 'antd/lib/table/Column';
import { lang } from 'language/en';

const Dashbord = (): JSX.Element => {
  const { error, isLoading, data } = useAllNotApprovedRestDays();

  if (isLoading) return <Loading />;
  if (error instanceof Error) return <h1>Error: {error.message}</h1>;

  const putStatusApproved = (dataIndex: any, key: any) => {
    toApprovedOrDisapproveRestDay({
      status: 'approved',
      id: key.id,
      userId: dataIndex,
    });
  };

const putStatusDeclined = (dataIndex: any, key: any) => {
    toApprovedOrDisapproveRestDay({
        status: 'declined',
        id: key.id,
        userId: dataIndex,
    });
}

  return (
    <StyledLayout>
      <Sidebar />
      <StyledContent>
        <Table dataSource={data}>
          <Column
            title={lang.dashboard.userTitle}
            dataIndex={['user', 'last_name']}
            key="id"
          />
          <Column
            title={lang.dashboard.startDateTitle}
            dataIndex="start_date"
            key="id"
          />
          <Column
            title={lang.dashboard.endDateTitle}
            dataIndex="end_date"
            key="id"
          />
          <Column title={lang.dashboard.userTitle} dataIndex="type" key="id" />
          <Column
            title={lang.dashboard.actionTitle}
            // dataIndex="is_block"
            dataIndex={['user', 'id']}
            key="id"
            defaultFilteredValue={['user', 'userId']}
            render={(dataIndex, key: any) => (
              <Space size="middle">
                <Button
                    htmlType="submit"
                    type="link"
                    onClick={(dataIndex: any, key: any) => putStatusApproved(dataIndex, key)}
                >
                  {lang.dashboard.approveButton}
                </Button>
                <Button
                    htmlType="submit"
                    type="link"
                    onClick={(dataIndex: any, key: any) => putStatusDeclined(dataIndex, key)}
                >
                  {lang.dashboard.declineButton}
                </Button>
                <Button htmlType="submit" type="link">
                  {lang.dashboard.editButton}
                </Button>
              </Space>
            )}
          />
        </Table>
      </StyledContent>
    </StyledLayout>
  );
};
export default Dashbord;
