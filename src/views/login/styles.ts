import { Row as AntRow } from "antd";
import styled from "styled-components";
import { LOGIN_VARS } from "constants/styles";


export const Row: typeof AntRow = styled(AntRow)`
    height: 100vh;
    background: ${LOGIN_VARS.BG};
`;
