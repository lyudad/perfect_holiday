import styled from "styled-components";

import { Layout, Button, Input } from "antd";

const { Search } = Input;
const { Content } = Layout;

export const StyledLayout = styled(Layout)`
  display: flex;
  flex-direction: row;
  height: 100vh;
  
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
  margin: 24px 16px 0;
  overflow: initial;
`;