import { Row as AntRow } from "antd";
import styled from "styled-components";


export const Row: typeof AntRow = styled(AntRow)`
    height: 100vh;
    background: ${LOGIN_VARS.BG};
`;