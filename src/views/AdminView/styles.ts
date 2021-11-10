import styled from "styled-components";

import {Layout, Button} from "antd";

const {Content} = Layout;
export const StyledLayout = styled(Layout)`
  display: flex;
  max-height: 480px;
  margin-left: 400px;
`;
export const StyledButton = styled(Button)`
  float: right;
  margin-right: 10px;  margin-bottom: 50px;
  width: 6%;
`;
export const StyledContent = styled(Content)`
  margin: 24px 16px 0;
  overflow: initial;
`;