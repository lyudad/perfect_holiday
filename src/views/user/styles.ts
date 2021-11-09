import styled from "styled-components";

import {Layout, Button, Form} from "antd";

const { Content } = Layout;

export const StyledLayout = styled(Layout)`
  display: flex;
  flex-direction:row;
  height: 100vh;
  
`;
export const StyledDivVacationInfo = styled("div")`
  :not(:last-child) {
    margin-right: 30px;
  }
  font-size: 20px;
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
export const StyledButton = styled(Button)`
  float: right;
  width: 150px;
  color: black;
  background-color: #DCDCDC;
  border: 1px solid transparent;
  margin-bottom: 20px;
`;
export const StyledContent = styled(Content)`
  padding: 25px;
  overflow: initial;
`;
