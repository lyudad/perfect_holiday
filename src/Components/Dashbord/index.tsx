import { Button, Space, Table } from 'antd';
import { StyledLayout, StyledContent } from './styles';
import Sidebar from 'Components/Sidebar';
import { useAllNotApprovedRestDays } from 'hooks/useUsers';
import Loading from 'Components/Loading';
import Column from 'antd/lib/table/Column';
import { lang } from 'language/en';

const Dashbord = (): JSX.Element => {
  const { error, isLoading, data } = useAllNotApprovedRestDays();

  if (isLoading) return <Loading />;
  if (error instanceof Error) return <h1>Error: {error.message}</h1>;

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
            dataIndex="is_block"
            key="id"
            render={() => (
              <Space size="middle">
                <Button htmlType="submit" type="link">
                  {lang.dashboard.approveButton}
                </Button>
                <Button htmlType="submit" type="link">
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
