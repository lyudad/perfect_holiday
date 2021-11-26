import { Button, Space, Table } from 'antd';
import { StyledLayout, StyledContent } from './styles';
import Sidebar from 'Components/Sidebar';
import { useAllNotApprovedRestDays , toApprovedOrDisapproveRestDay } from 'hooks/useUsers';
import Loading from 'Components/Loading';
import { lang } from 'language/en';

const { Column, ColumnGroup } = Table;

const Dashbord = (): JSX.Element => {
  const { error, isLoading, data } = useAllNotApprovedRestDays();

  if (isLoading) return <Loading />;
  if (error instanceof Error) return <h1>Error: {error.message}</h1>;


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const putStatusApproved = (dataIndex: string, key: any) => {
    toApprovedOrDisapproveRestDay({
      status: 'approved',
      id: key.id,
      userId: dataIndex,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const putStatusDeclined = (dataIndex: string, key: any) => {
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
        <Table dataSource={data} pagination={{ pageSize: 10 }}  >
          <ColumnGroup title={lang.dashboard.userTitle}>
            <Column
              title={lang.dashboard.userFirstName}
              dataIndex={['user', 'first_name']}
              key="id"
            />
            <Column
              title={lang.dashboard.userLastName}
              dataIndex={['user', 'last_name']}
              key="id"
            />
          </ColumnGroup>
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
          <Column
            title={lang.dashboard.typeTitle}
            dataIndex="type"
            key="id" 
          />
          <Column
            title={lang.dashboard.actionTitle}
            dataIndex={['user', 'id']}
            key="id"
            defaultFilteredValue={['user', 'userId']}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            render={(dataIndex: string, key: any) => (
              <Space size="middle">
                <Button
                  htmlType="submit"
                  type="link"
                  onClick={() => putStatusApproved(dataIndex, key)}
                >
                  {lang.dashboard.approveButton}
                </Button>
                <Button
                    htmlType="submit"
                    type="link"
                    onClick={() => putStatusDeclined(dataIndex, key)}
                >
                  {lang.dashboard.declineButton}
                </Button>
                <Button
                  htmlType="submit"
                  type="link"
                >
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
