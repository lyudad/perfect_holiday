import React, {useState} from "react";
import "antd/dist/antd.css";
import {lang} from "language/en";
import {Row, Input, Form} from "antd";
import {Table} from "antd";
import {
    StyledLayout,
    StyledContent,
    StyledButton,
    StyledFormItem,
    StyledDivContent,
    StyledDivVacationInfo,
    ButtonWrapper,
    StyledForm, StyledInput,
} from "./styles";
import {columns} from "./const";
import Layout from "./layout";
import Sidebar from "../../Components/Sidebar";
import axios from "axios";

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
  const [dataUser, setDataUser] = useState({
    email: "",
    firstName: "",
    lastName: ""

  })
  const handle = (e: { target: { id: string | number; value: string; }; }) => {
    const newData = {...dataUser}
    console.log(newData)
      if (e.target.id === "VacationForm_E   mail")newData["email"]= e.target.value
    else
      // @ts-ignore
    e.target.id === "VacationForm_FirstName" ? newData["firstName"] = e.target.value : newData["lastName"] = e.target.value
    setDataUser(newData)
  }
    // @ts-ignore
  return (
        <Layout>
            <StyledLayout>
                <Sidebar/>
                <StyledContent>
                    <StyledDivContent className="site-layout-background">
                        <Row>
                            <StyledForm name="VacationForm" layout="horizontal" size="large"
                                  onFinish={() => {
                                      console.log(dataUser)
                                      axios
                                          .post('http://localhost:3001/send_password',
                                              {
                                                  email: dataUser.email,
                                                  firstName: dataUser.firstName,
                                                  lastName: dataUser.lastName
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


                                  }>
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
                                    <StyledInput placeholder="FirstName" onChange={event => handle(event)}/>
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
                                    <StyledInput placeholder="LastName" onChange={event => handle(event)}/>
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
                                    <StyledInput placeholder="email" onChange={event => handle(event)}/>
                                </StyledFormItem>
                                <ButtonWrapper>
                                    <StyledButton
                                        type="primary"
                                        shape="round"
                                        htmlType="submit"
                                        size="large"
                                    >
                                        Send pass
                                    </StyledButton>
                                    <StyledButton
                                        shape="round"
                                        size="large"
                                    >
                                        Add
                                    </StyledButton>
                                </ButtonWrapper>
                            </StyledForm>
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
