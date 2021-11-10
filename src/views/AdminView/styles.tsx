import styled from "styled-components";

import { Layout, Button, List } from "antd";

export const StyledLayout = styled(Layout)`
  display: flex;
  max-height: 480px;
  aling-items: center;
`;
export const StyledButton = styled(Button)`
  width: 150px;
  margin-left: auto;
  margin-bottom: 25px;
  border-radius: 10px;
  position: static;
`;

export const StyledContent = styled(Layout)`
  max-height: 400px;
  // padding: 25px;
  width: auto;
  overflow-x: scroll;
`;

export const StyledList = styled(List)``;

export const StyledItem = styled(List)`
  cursor: pointer;
   padding-top: 38px;
  padding-left 5px;
  height: 100px;
  color: #fff;
  align-item: center;
  border: 1px solid #fff;
  :hover {
      color: #2196f3;
      padding-left:15px;
  }
`;
