import React from "react";
import { StyledButton } from "./styles";

 const ButtonUsers = ({children}:any) => {
    return (
        <StyledButton type="primary" shape="round" htmlType="submit">
            {children}
        </StyledButton>
    )
}

export default ButtonUsers
