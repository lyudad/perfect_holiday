import { Table } from "antd";
import { StyledLayout, StyledContent } from "./styles";

import { columns, data } from "./constants";

const AdminView = (): JSX.Element => {


  return (
    <StyledLayout>
      <StyledContent>
        <Table columns={columns} dataSource={data}/>
      </StyledContent>
    </StyledLayout>
  );
};
export default AdminView;
