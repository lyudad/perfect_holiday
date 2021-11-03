import React from "react";
import "antd/dist/antd.css";
import {lang} from "../../language/english";
import {Row, Input, Form} from 'antd';
import {Table} from 'antd';
import {
    StyledLayout,
    StyledList,
    StyledItem,
    StyledSider,
    StyledContent,
    StyledButton,
    StyledFormItem,
    StyledDivContent,
    StyledDivVacationInfo
} from "./styles";

const columns = [
    {
        title: 'Month',
        dataIndex: 'month',
    },
    {
        title: 'Dates',
        dataIndex: 'dates',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
    {
        title: 'Type',
        dataIndex: 'type',
    },
];
const data = [
    {
        key: '1',
        month: 'June 2020',
        dates: '10-20',
        status: 'approved',
        type: 'vacation'
    },
    {
        key: '2',
        month: 'April 2020',
        dates: '01-09',
        status: 'approved',
        type: 'vacation'
    },
    {
        key: '3',
        month: 'January 2020',
        dates: '08-10',
        status: 'pending',
        type: 'vacation'
    },
    {
        key: '4',
        month: 'February 2019',
        dates: '08',
        status: 'pending',
        type: 'sick leave'
    },


];
const UserView = (): JSX.Element => {
    return (
        <StyledLayout>
            <StyledSider>
                <StyledList>
                    <StyledItem key="1">{lang.profile["profile"]}</StyledItem>
                    <StyledItem key="2">&nbsp;</StyledItem>
                    <StyledItem key="3">&nbsp;</StyledItem>
                    <StyledItem key="4">{lang.profile["logout"]}</StyledItem>
                </StyledList>
            </StyledSider>
            <StyledLayout>
                <StyledContent>
                    <StyledDivContent className="site-layout-background">

                        <Row>
                            <Form
                                name="VacationForm"
                                layout="horizontal"
                                size="large"
                            >
                                <StyledFormItem
                                    name="FirstName"
                                    rules={[{
                                        type: "string",
                                        required: true,
                                        message: `${lang.username["firstName-validation"]}`
                                    }]}

                                >
                                    <Input placeholder="FirstName"/>
                                </StyledFormItem>

                                <StyledFormItem
                                    name="LastName"
                                    rules={[{
                                        type: "string",
                                        required: true,
                                        message: `${lang.username["lastName-validation"]}`
                                    }]}

                                >
                                    <Input placeholder="LastName"/>
                                </StyledFormItem>
                            </Form>
                        </Row>
                        <Row>
                            <StyledDivVacationInfo >
                                <strong>
                                    2 sick leave
                                </strong>
                            </StyledDivVacationInfo>
                            <StyledDivVacationInfo>
                                <strong>
                                    14 vacation days
                                </strong>
                            </StyledDivVacationInfo>
                        </Row>

                    </StyledDivContent>
                    <StyledButton type="primary" shape="round" htmlType="submit" size="large">Add</StyledButton>
                    <Table columns={columns} dataSource={data} size="large"/>
                </StyledContent>
            </StyledLayout>

        </StyledLayout>

    )
}
export default UserView;