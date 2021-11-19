import React from 'react';
import Sidebar from 'Components/Sidebar';
import {lang} from 'language/en';
import {columns} from './const';
import Layout from './layout';
import axios from "axios";
import {toUpdateUserInfo} from 'hooks/useUsers';
import 'antd/dist/antd.css';
import {Row, Input, Form, Col, Button, Table, message} from 'antd';
import {
    StyledLayout,
    StyledContent,
    StyledButton,
    StyledDivContent,
    StyledDivVacationInfo,
    ButtonWrapper,
} from './styles';
import {url} from "constants/constants";
import {IMailVars} from './types'
import {useRouteMatch} from 'react-router-dom';
import {IMatchParams} from './types';

const {REACT_APP_BASE} = process.env

const PostRequest = (values: IMailVars) => {
    console.log(values)
    axios
        .post(`${REACT_APP_BASE}${url.mail}`,
            {
                firstName: values["firstName"],
                lastName: values["lastName"],
                email: values["email"]
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
        .catch(err => {
            console.log(err)
            if (err.response) {
                console.log(err.response.status);
            }
        })
}


const data = [
    {
        key: '1',
        month: 'June 2020',
        dates: '10-20',
        status: 'approved',
        type: 'vacation',
    },
    {
        key: '2',
        month: 'April 2020',
        dates: '01-09',
        status: 'approved',
        type: 'vacation',
    },
    {
        key: '3',
        month: 'January 2020',
        dates: '08-10',
        status: 'pending',
        type: 'vacation',
    },
    {
        key: '4',
        month: 'February 2019',
        dates: '08',
        status: 'pending',
        type: 'sick leave',
    },
];

const AdminView = (): JSX.Element => {
    const [form] = Form.useForm();
    const userId = useRouteMatch<IMatchParams>().params.id;
    const upUS = () =>
        toUpdateUserInfo(form.getFieldsValue(), userId)
            .then(() => message.success(lang.updateStatus.success))
            .catch(() => message.success(lang.updateStatus.success));
    form.resetFields();

    return (
        <Layout>
            <StyledLayout>
                <Sidebar/>
                <StyledContent>
                    <StyledDivContent className="site-layout-background">
                        <Form
                            form={form}
                            name="VacationForm"
                            layout="horizontal"
                            onFinish={PostRequest}
                            size="large"
                        >
                            <Row justify="space-between">
                                <Col span={6}>
                                    <Form.Item name="first_name" rules={[{type: 'string'}]}>
                                        <Input placeholder={lang.userInfo.firstName}/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="last_name" rules={[{type: 'string'}]}>
                                        <Input placeholder={lang.userInfo.lastName}/>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item name="email" rules={[{type: 'email'}]}>
                                        <Input placeholder={lang.userInfo.email}/>
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            shape="round"
                                            size="large"
                                        >
                                            Save
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                        <Row>
                            <StyledDivVacationInfo>
                                <strong>2 sick leave</strong>
                            </StyledDivVacationInfo>
                            <StyledDivVacationInfo>
                                <strong>14 vacation days</strong>
                            </StyledDivVacationInfo>
                        </Row>
                    </StyledDivContent>
                    <ButtonWrapper>
                        <StyledButton
                            type="primary"
                            shape="round"
                            htmlType="submit"
                            size="large"
                        >
                            {lang.button["sendPasswordButton"]}
                        </StyledButton>
                        <StyledButton
                            shape="round"
                            htmlType="submit"
                            size="large"
                            onClick={upUS()}
                        >
                            {lang.button["addButton"]}
                        </StyledButton>
                    </ButtonWrapper>
                    <Table columns={columns} dataSource={data} size="large"/>
                </StyledContent>
            </StyledLayout>
        </Layout>
    );
};
export default AdminView;