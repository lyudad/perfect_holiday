import React from "react";
import "antd/dist/antd.css";
import {lang} from "language/en";
import {Row, Form} from "antd";
import {Table} from "antd";
import {
    StyledLayout,
    StyledContent,
    StyledButton,
    StyledFormItem,
    StyledDivContent,
    StyledDivVacationInfo,
    ButtonWrapper,
    StyledInput,
} from "./styles";
import {columns} from "./const";
import Layout from "./layout";
import Sidebar from "../../Components/Sidebar";
import axios from "axios";
import { url } from "constants/constants";
import {IMailVars} from './types'
const {REACT_APP_BASE} = process.env
const PostRequest = (values:IMailVars) => {
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
}
const data = [
    {
        key: "1",
        month: "June 2020",
        dates: "10-20",
        status: "approved",
        type: "vacation",
    },
    {
        key: "2",
        month: "April 2020",
        dates: "01-09",
        status: "approved",
        type: "vacation",
    },
    {
        key: "3",
        month: "January 2020",
        dates: "08-10",
        status: "pending",
        type: "vacation",
    },
    {
        key: "4",
        month: "February 2019",
        dates: "08",
        status: "pending",
        type: "sick leave",
    },
];

const AdminView = (): JSX.Element => {



  return (
        <Layout>
            <StyledLayout>
                <Sidebar/>
                <StyledContent>
                    <StyledDivContent className="site-layout-background">
                        <Row>
                            <Form name="VacationForm" layout="horizontal" size="large" style={{width:"100%"}} onFinish={PostRequest}>
                                <StyledFormItem
                                    name="FirstName"
                                    rules={[
                                        {
                                            type: "string",
                                            required: true,
                                            message: `${lang.username["firstName-validation"]}`,
                                        },
                                    ]}
                                >
                                    <StyledInput placeholder="FirstName"/>
                                </StyledFormItem>

                                <StyledFormItem
                                    name="LastName"
                                    rules={[
                                        {
                                            type: "string",
                                            required: true,
                                            message: `${lang.username["lastName-validation"]}`,
                                        },
                                    ]}
                                >
                                    <StyledInput placeholder="LastName" />
                                </StyledFormItem>
                                <StyledFormItem
                                    name="Email"
                                    rules={[
                                        {
                                            type: "email",
                                            required: true,
                                            message: `${lang.username["email-validation"]}`,
                                        },
                                    ]}
                                >
                                    <StyledInput placeholder="email" />
                                </StyledFormItem>
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
                                        size="large"
                                    >
                                        {lang.button["addButton"]}
                                    </StyledButton>
                                </ButtonWrapper>
                            </Form>
                        </Row>
                        <Row>
                            <StyledDivVacationInfo>
                                <strong>2 sick leave</strong>
                            </StyledDivVacationInfo>
                            <StyledDivVacationInfo>
                                <strong>14 vacation days</strong>
                            </StyledDivVacationInfo>
                        </Row>
                    </StyledDivContent>

                    <Table columns={columns} dataSource={data} size="large"/>
                </StyledContent>
            </StyledLayout>
        </Layout>
    );
};
export default AdminView;
