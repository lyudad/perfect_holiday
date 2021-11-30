import styled from 'styled-components';

import { Layout, Button, Row as SRow } from 'antd';

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
  background-color: #dcdcdc;
  border: 1px solid transparent;
  margin-bottom: 20px;
`;
export const StyledContent = styled(Content)`
  margin: 24px 16px 0;
  overflow: initial;
`;
export const Row = styled(SRow)`
  margin-bottom: 0.5rem;
`;
