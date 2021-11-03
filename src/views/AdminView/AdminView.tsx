import { Table } from "antd";
import { StyledLayout, StyledContent } from "./styles";

import { columns, data } from "./constants";

const AdminView = (): JSX.Element => {
  function onChange(pagination: any, filters: any, sorter: any, extra: any) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <StyledLayout>
      <StyledContent>
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </StyledContent>
    </StyledLayout>
  );
};
export default AdminView;
