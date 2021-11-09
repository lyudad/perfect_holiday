import React from "react";
import {Button} from "antd"
import { StyledButton } from "./styles";
// @ts-ignore
export const ButtonUsers = ({children}) => {
    return (
        <StyledButton type="primary" shape="round" htmlType="submit">
            {children}
        </StyledButton>
    )
}
 // @ts-ignore
const LoginButton = ({children}) => {
    return (
        <Button type="primary" shape="round" htmlType="submit">
            {children}
        </Button>
    )
}
export default LoginButton
