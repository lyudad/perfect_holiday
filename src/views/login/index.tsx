import { useState } from 'react';
import { lang } from 'language/en';
import { Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Row, Status } from './styles';
import 'antd/dist/antd.css';
import axios from 'axios';
import { ILoginVars } from './types';
import LoginButton from 'Components/Button/loginButton';
import { url } from 'constants/constants';
import { Redirect } from 'react-router';
import { TRole } from 'Components/Access/types';

const { REACT_APP_BASE } = process.env;

const LoginView = (): JSX.Element => {
  const [status, setStatus] = useState<string>('');
  const [role, setRole] = useState<TRole>();
  const PostRequest = (values: ILoginVars) => {
    axios
      .post(`${REACT_APP_BASE}${url.auth}${url.login}`, {
        email: values['login'],
        password: values['password'],
      })
      .then(res => {
        setStatus('Login is successful');
        localStorage.setItem('token', res.data.access_token);
        localStorage.setItem('role', res.data.role);
        localStorage.setItem('user', JSON.stringify(res.data));
        setRole(res.data.role);
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 401) setStatus('Wrong email or password');
        }
      });
  };

  return (
    <>
      {role ? (
        <Redirect to="users" />
      ) : (
        <Row justify="center" align="middle">
          <Form
            onFinish={PostRequest}
            name="loginForm"
            layout="vertical"
            size="large"
          >
            <Form.Item wrapperCol={{ offset: 2, span: 21 }}>
              <Status>{status}</Status>
            </Form.Item>
            <Form.Item
              name="login"
              rules={[
                {
                  type: 'email',
                  required: true,
                  message: `${lang.login['email-validation']}`,
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
                  message: `${lang.login['password-validation']}`,
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 7, span: 17 }}>
              <LoginButton> {lang.button['loginButton']}</LoginButton>
            </Form.Item>
          </Form>
        </Row>
      )}
    </>
  );
};

export default LoginView;
