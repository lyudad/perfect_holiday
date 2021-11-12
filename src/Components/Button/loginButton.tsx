import {Button} from "antd";
import React from "react";

const LoginButton = ({children}:any) => {
    return (
        <Button type="primary" shape="round" htmlType="submit">
            {children}
        </Button>
    )
}
export default LoginButton