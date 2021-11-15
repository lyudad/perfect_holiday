import {Button} from "antd";
import React from "react";
import {ButtonProps} from "./types";

const LoginButton = ({children}:ButtonProps) => {
    return (
        <Button type="primary" shape="round" htmlType="submit">
            {children}
        </Button>
    )
}
export default LoginButton