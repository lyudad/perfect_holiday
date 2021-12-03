import { useState } from 'react';
import { lang } from 'language/en';
import { Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Row, Status } from './styles';
import 'antd/dist/antd.css';
import axios from 'axios';
import { ILoginVars } from './types';
import LoginButton from 'Components/Button/loginButton';
import { Role, url } from 'constants/constants';
import { Redirect } from 'react-router';
import { IUser, TRole } from 'Components/Access/types';
import { signIn } from 'Redux/users/userSlice';
import { useDispatch } from 'react-redux';
import store from 'Redux/store';

const { REACT_APP_BASE } = process.env;

const LoginView = (): JSX.Element => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState<string>('');
  const [role, setRole] = useState<TRole>();
  const state = store.getState();
  const userId = state.person.user.id;
  const PostRequest = (values: ILoginVars) => {
    axios
      .post(`${REACT_APP_BASE}${url.auth}${url.login}`, {
        email: values['login'],
        password: values['password'],
      })
      .then(res => {
        const person: IUser = res.data;
        dispatch(signIn({ person }));
        setStatus(lang.login['status-success']);
        setRole(res.data.role);
      })
      .catch(err => {
        if (err.response.status === 401) setStatus(lang.login['status-error']);
      });
  };
  return (
    <>
      {role === Role.EMPLOYEE ? (
        <Redirect to="user" />
      ) : role === Role.ADMIN || role === Role.SUPER ? (
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
