import { lang } from 'language/en';
import { Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Row } from './styles';
import 'antd/dist/antd.css';
import axios from 'axios';
import { ILoginVars } from './types';
import LoginButton from 'Components/Button/loginButton';
import { url } from 'constants/constants';
const { REACT_APP_BASE } = process.env;
const PostRequest = (values: ILoginVars) => {
  console.log(values);
  axios
    .post(`${REACT_APP_BASE}${url.auth}${url.login}`, {
      email: values['login'],
      password: values['password'],
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
      if (err.response) {
        console.log(err.response.status);
      }
    });
};
const LoginView = (): JSX.Element => {
  return (
    <Row justify="center" align="middle">
      <Form onFinish={PostRequest} name="loginForm" layout="vertical" size="large">
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
  );
};

export default LoginView;
