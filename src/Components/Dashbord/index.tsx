import { Table } from "antd";
import { StyledLayout, StyledContent } from "./styles";
import Sidebar from "../../Components/Sidebar";
import { columns, data } from "./constants";

const Dashbord = (): JSX.Element => {
  return (
    <StyledLayout>
      <Sidebar />
      <StyledContent>
        <Table columns={columns} dataSource={data} />
      </StyledContent>
    </StyledLayout>
  );
};
export default Dashbord;
