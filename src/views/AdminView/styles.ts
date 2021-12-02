import styled from "styled-components";

import {Layout, Button, Form, Input, Select} from "antd";

const { Content } = Layout;

export const StyledLayout = styled(Layout)`
  display: flex;
  flex-direction: row;
  height: 100vh;
  
`;
export const StyledInputContent = styled("div")`
  display: flex;
  flex-direction: row;
  padding-top: 20px;
`;
export const SelectBlock = styled(Select)`
    width: 120px;
`;
export const StyledModalContent = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 20px;
  text-align: left;
`;
export const StyledDivVacationInfo = styled("div")`
  :not(:last-child) {
    margin-right: 30px;
  }
  font-size: 20px;
`;
export const StyledDivContent = styled("div")`
  padding: 24px;
  /* text-align: left; */
`;
export const StyledFormItem = styled(Form.Item)`
  display: inline-block;
  width: calc(33% - 8px);
  margin-right: 8px;
`;
export const StyledButton = styled(Button)`
  float: right;
  width: 150px;
  color: black;
  background-color: #DCDCDC;
  border: 1px solid transparent;
  margin-bottom: 20px;
  :not(:last-child) {

  }
`;
export const StyledContent = styled(Content)`
  padding: 25px;
  overflow: initial;
`;

export const ButtonWrapper = styled(Content)`
display: flex;
flex-direction: column;
float: right;
`;

export const StyledInput = styled(Input)`
width: 100%`;

export const SelectBlock = styled(Select)`
    width: 120px;
`;