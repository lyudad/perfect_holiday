import { Layout, Table } from "antd";
import { StyledLayout, StyledContent, StyledList, StyledItem } from "./styles";

import { columns, data } from "./constants";
const { Sider } = Layout;

const AdminView = (): JSX.Element => {
  function onChange(pagination: any, filters: any, sorter: any, extra: any) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <StyledLayout>
      <Sider>
        <StyledList>
          <StyledItem key="1">Dashboard</StyledItem>
          <StyledItem key="2">Users</StyledItem>
          <StyledItem key="3">&nbsp;</StyledItem>
          <StyledItem key="4">Logout</StyledItem>
        </StyledList>
      </Sider>
      <StyledContent>
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </StyledContent>
    </StyledLayout>
  );
};
export default AdminView;
