import styled from "styled-components";

import {Layout, Button, List, Form} from "antd";

const {Content, Sider} = Layout;
export const StyledLayout = styled(Layout)`
  display: flex;
  max-height: 480px;
  margin-left: 100px;
`;
export const StyledSider = styled(Sider)`
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
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
export const StyledButton = styled(Button)`
  float: right;
  margin-right: 10px;
  margin-bottom: 20px;
`;
export const StyledContent = styled(Content)`
  margin: 24px 16px 0;
  overflow: initial;
`;
export const StyledList = styled(List)``;

export const StyledItem = styled(List)`
  cursor: pointer;
  padding-top: 38px;
  padding-left: 5px;
  height: 100px;
  color: #fff;
  align-items: center;
  border: 1px solid #fff;

  :hover {
    color: #2196f3;
    padding-left: 15px;
  }
`;
export const StyledLogout = styled(List)`

  cursor: pointer;
  padding-top: 38px;
  padding-left: 5px;
  height: 100px;
  color: #fff;
  align-items: center;
  border: 1px solid #fff;

  :hover {
    color: #2196f3;
    padding-left: 15px;
  }
  position: relative;
  top: 77.8%;  
`;