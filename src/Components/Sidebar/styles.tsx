import styled from "styled-components";
import { SIDEBAR } from "constants/styles";

const SidebarBlock = styled.div`
  border: 1px solid ${SIDEBAR.BorderColor};
  border-radius: 2px;
  width: 200px;
  height: 100vh;
  padding: 5px;
`;

const SidebarUl = styled.ul`
  display: flex;
  flex-flow: column;
  height: 100%;
  margin: 0px;
  padding: 0px;
`;

const SidebarLi = styled.li`
  list-style-type: none;
  border: 1px solid ${SIDEBAR.BorderColor};
  border-radius: 2px;
  text-align: center;
  cursor: pointer;
  background: ${SIDEBAR.BackgroundColor};
  margin-bottom: 5px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${SIDEBAR.FontSize};

  :last-child {
    margin-bottom: 0px;
  }

  :hover {
    background: ${SIDEBAR.BacgroundColorHover};
  }
`;

export { SidebarBlock, SidebarUl, SidebarLi};
