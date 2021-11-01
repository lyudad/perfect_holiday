import React from "react";
import { Form, Input, Button, Row as AntRow } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { ILoginVars } from "./types";
import styled from "styled-components";
import "antd/dist/antd.css";


const LOGIN_VARS: ILoginVars = {
    BG: "rgb(8 8 8 / 7%)"
};

const Row: typeof AntRow = styled(AntRow)`
    height: 100vh;
    background: ${LOGIN_VARS.BG};
`;

const LoginView = (): JSX.Element => {
    return (
        <Row justify="center" align="middle" >
            <Form
                name="loginForm"
                layout="vertical"
                size="large"
            >
                <Form.Item
                    name="login"
                    rules={[{
                        type: "email",
                        required: true,
                        message: "Please enter your email address as your login!"
                    }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Login" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{
                        required: true,
                        message: "Please enter your password!"
                    }]}
                >
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 7 ,span: 17 }}>
                    <Button type="primary" shape="round" htmlType="submit">
                        SIGN IN
                    </Button>
                </Form.Item>
            </Form>
        </Row>
    )
}
export default LoginView;