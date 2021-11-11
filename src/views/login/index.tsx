import React, {useState} from "react";
import {lang} from "../../language/en";
import {Form, Input, Button} from "antd";
import {UserOutlined, LockOutlined} from "@ant-design/icons";
import {Row} from "./styles";
import "antd/dist/antd.css";
import axios from "axios";
import {URL} from "../../constants/styles";

const LoginView = (): JSX.Element => {
    const [data, setData] = useState({
        login: "",
        password: ""
    })
    const handle = (e: { target: { id: string | number; value: string; }; }) => {
        const newData = {...data}
        console.log(newData)
        // @ts-ignore
        e.target.id === "loginForm_login" ? newData["login"] = e.target.value : newData["password"] = e.target.value
        setData(newData)
    }
    return (
        <Row justify="center" align="middle">
            <Form
                onFinish={() => {
                    console.log(data)
                    axios
                        .post(URL.Url,
                            {
                                login: data.login,
                                password: data.password
                            }
                        ).then(res => {

                        console.log(res)
                    })
                        .catch(err => {
                            console.log(err)
                            if (err.response) {
                                console.log(err.response.status);

                            }
                        })
                }}
                name="loginForm"
                layout="vertical"
                size="large"
            >
                <Form.Item
                    name="login"
                    rules={[{
                        type: "email",
                        required: true,
                        message: `${lang.login["email-validation"]}`
                    }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                           onChange={event => handle(event)}
                           placeholder="Login"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{
                        required: true,
                        message: `${lang.login["password-validation"]}`
                    }]}
                >
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>}
                                    onChange={event => handle(event)}
                                    placeholder="Password"/>
                </Form.Item>
                <Form.Item wrapperCol={{offset: 7, span: 17}}>
                    <Button type="primary" shape="round" htmlType="submit">
                        SIGN IN
                    </Button>
                </Form.Item>
            </Form>

        </Row>
    )
}
export default LoginView;

