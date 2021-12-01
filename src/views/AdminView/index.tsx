import React from 'react';
import Sidebar from 'Components/Sidebar';
import { lang } from 'language/en';
import { columns } from './const';
import Layout from './layout';
import { toUpdateUserInfo } from 'hooks/useUsers';
import 'antd/dist/antd.css';
import { Row, Input, Form, Col, Button, Table, message } from 'antd';
import {
  StyledLayout,
  StyledContent,
  StyledButton,
  StyledDivContent,
  StyledDivVacationInfo,
  ButtonWrapper,
} from './styles';
import { url } from 'constants/constants';
import { useRouteMatch } from 'react-router-dom';
import { IMatchParams } from './types';
import { sellectItemColor } from 'constants/constants';
import axios from 'axios';
import store from 'Redux/store';
const { REACT_APP_BASE } = process.env;
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
  const updateUserInfo = () => {
    toUpdateUserInfo(form.getFieldsValue(), userId)
      .then(() => message.success(lang.updateStatus.success))
      .catch(() => message.success(lang.updateStatus.success));
    form.resetFields();
  };
  const SelectColor = (record: { status: string }) => {
    return sellectItemColor(record.status) || '';
  };
  const SendPasswordId = () => {
    const state = store.getState();
    const token = `Bearer ${state.person.user.access_token}`;
    return axios
      .get(`${REACT_APP_BASE}${url.users}${url.pushPassword}${userId}`, {
        headers: { Authorization: token },
      })
      .then(() => {
        message.success(lang.passwordMessage.success);
      })
      .catch(() => {
        message.error(lang.passwordMessage.fail);
      });
  };
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
              onFinish={updateUserInfo}
              size="large"
            >
              <Row justify="space-between">
                <Col span={6}>
                  <Form.Item name="first_name" rules={[{ type: 'string' }]}>
                    <Input placeholder={lang.userInfo.firstName} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="last_name" rules={[{ type: 'string' }]}>
                    <Input placeholder={lang.userInfo.lastName} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="email" rules={[{ type: 'email' }]}>
                    <Input placeholder={lang.userInfo.email} />
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
              shape="round"
              htmlType="submit"
              size="large"
              onClick={SendPasswordId}
            >
              {lang.button['sendPasswordButton']}
            </StyledButton>
            <StyledButton shape="round" htmlType="submit" size="large">
              {lang.button['addButton']}
            </StyledButton>
          </ButtonWrapper>
          <Table
            columns={columns}
            dataSource={data}
            size="large"
            rowClassName={SelectColor}
          />
        </StyledContent>
      </StyledLayout>
    </Layout>
  );
};
export default AdminView;
