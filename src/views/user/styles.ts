import styled from "styled-components";

import {Layout, Button, Form} from "antd";

const {Content} = Layout;
export const StyledLayout = styled(Layout)`
  display: flex;
  max-height: 480px;
  margin-left: 200px;
`;
export const StyledDivVacationInfo = styled("div")`
  margin-right: 10.5%;
`;
export const StyledDivContent = styled("div")`
  padding: 24px;
  text-align: left;
`;
export const StyledFormItem = styled(Form.Item)`
  display: inline-block;
  width: calc(50% - 8px);
  margin-right: 8px;
`;
export const StyledContent = styled(Content)`
  margin: 24px 16px 0;
  overflow: initial;
`;
