import styled from "styled-components";
import { SIDEBAR } from "constants/styles";
import { Menu } from "antd";

const SidebarBlock = styled.div`
  /* border: 1px solid ${SIDEBAR.BorderColor};
  border-radius: 2px;
  width: 200px;
  height: 100vh;
  padding: 5px; */
`;

const MenuBlock = styled(Menu)`
  width: 200px;
  /* min-height: 100vh; */
  height: 100%;
  padding-top: 80px;
`;

export { SidebarBlock, MenuBlock};
