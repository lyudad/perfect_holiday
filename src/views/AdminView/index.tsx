import React from 'react'
import axios from 'axios'
import { useRouteMatch } from 'react-router'
import Sidebar from 'Components/Sidebar'
import { lang } from 'language/en'
import { IMatchParams, TUpdateUser } from './types'
import { columns } from './const'
import Layout from './layout'
import 'antd/dist/antd.css'
import { Row, Input, Form, Col, Button, Table, message } from 'antd'
import {
  StyledLayout,
  StyledContent,
  StyledButton,
  StyledDivContent,
  StyledDivVacationInfo,
  ButtonWrapper,
} from './styles'

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
]

const AdminView = (): JSX.Element => {
  const [form] = Form.useForm()
  const match = useRouteMatch<IMatchParams>()
  const userId = match.params.id
  const { REACT_APP_USERS_LIST } = process.env

  const onFinish = async (values: TUpdateUser) => {
    axios
      .put(`${REACT_APP_USERS_LIST}${userId}`, values)
      .then(() => message.success(lang.updateStatus.success))
      .catch(() => message.error(lang.updateStatus.fail))
    form.resetFields()
  }

  return (
    <Layout>
      <StyledLayout>
        <Sidebar />
        <StyledContent>
          <StyledDivContent className="site-layout-background">
            <Form
              form={form}
              name="VacationForm"
              layout="horizontal"
              onFinish={onFinish}
              size="large"
            >
              <Row justify="space-between">
                <Col span={6}>
                  <Form.Item name="first_name" rules={[{ type: 'string' }]}>
                    <Input placeholder="First Name" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="last_name" rules={[{ type: 'string' }]}>
                    <Input placeholder="Last Name" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="email" rules={[{ type: 'email' }]}>
                    <Input placeholder="Email" />
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
              Send pass
            </StyledButton>
            <StyledButton
              type="primary"
              shape="round"
              htmlType="submit"
              size="large"
            >
              Add
            </StyledButton>
          </ButtonWrapper>
          <Table columns={columns} dataSource={data} size="large" />
        </StyledContent>
      </StyledLayout>
    </Layout>
  )
}
export default AdminView
