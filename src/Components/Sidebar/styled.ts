import styled from "styled-components";

import {Layout, List} from "antd";

const {Sider} = Layout;
export const StyledSider = styled(Sider)`
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
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