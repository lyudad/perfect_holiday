
import ReactLoading from "react-loading";
import styled from "styled-components";
import { Row } from "antd";

const AppRow = styled(Row)`
height: 100vh;
`;

const Loading = () => (
<AppRow justify="center" align="middle" >
    <ReactLoading type={"spokes"} color={"black"} width={"200px"} />
</AppRow>
);

export default Loading;