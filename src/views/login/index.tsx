import React from "react";
import { lang } from "language/en";
import { Input, Button, Form, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Row } from "./styles";
import "antd/dist/antd.css";
import LoginButton from "Components/Button";

const LoginView = (): JSX.Element => {
  return (
    <Row justify="center" align="middle">
      <Form name="loginForm" layout="vertical" size="large">
        <Space size={20} direction="vertical">
        <Form.Item
          name="login"
          rules={[
            {
              type: "email",
              required: true,
              message: `${lang.login["email-validation"]}`,
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Login"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: `${lang.login["password-validation"]}`,
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 7, span: 17 }}>
          {/*<Button type="primary" shape="round" htmlType="submit">*/}
          {/*  SIGN IN*/}
          {/*</Button>*/}
          <LoginButton>Sign in</LoginButton>

        </Form.Item>
        </Space>
      </Form>
    </Row>
  );
};
export default LoginView;
