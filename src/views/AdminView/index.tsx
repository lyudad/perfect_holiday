import React, {useState} from 'react';
import Sidebar from 'Components/Sidebar';
import { lang } from 'language/en';
import { columns } from './const';
import Layout from './layout';
import { toUpdateUserInfo, getUserRequestDays } from 'hooks/useUsers';
import 'antd/dist/antd.css';
import { User } from 'hooks/types';
import { Row, Input, Form, Col, Button, Table, message, Select } from 'antd';
import {
  StyledLayout,
  StyledContent,
  StyledButton,
  StyledDivContent,
  StyledDivVacationInfo,
  ButtonWrapper,
  SelectBlock
} from './styles';
import { url } from 'constants/constants';
import { useRouteMatch } from 'react-router-dom';
import { IMatchParams } from './types';
import { sellectItemColor } from 'constants/constants';
import axios from 'axios';
import store from 'Redux/store';
import { Role } from 'constants/constants';

const { REACT_APP_BASE } = process.env;
const { Option } = Select;


const AdminView = (): JSX.Element => {
  const [form] = Form.useForm();
  const state = store.getState();

  const role = state.person.user.role;
  const userId = useRouteMatch<IMatchParams>().params.id;
  const { data } = getUserRequestDays(userId);

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
        {data?.map(
          ({
            id,
            first_name,
            available_sick_days,
            available_vacation,
            last_name,
            email,
            vacations,
          }: User) => (
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
                    {role === Role.SUPER &&
                      <Col span={3}>
                        <Form.Item name="role" rules={[{ type: 'string' }]}>
                          <SelectBlock
                            placeholder={lang.superAdmin.roleTitle}
                          >
                            <Option value="admin" key="id">
                              {lang.userRole.userAdmin}
                            </Option>
                            <Option value="employee">
                              {lang.userRole.userEmployee}
                            </Option>
                          </SelectBlock>
                        </Form.Item>
                      </Col>
                    }
                    <Col span={4}>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          shape="round"
                          size="large"
                        >
                          {lang.superAdmin.saveButton}
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
                <div>
                  <Row>
                    <StyledDivVacationInfo>
                      <strong>{first_name}</strong>
                    </StyledDivVacationInfo>
                    <StyledDivVacationInfo>
                      <strong>{last_name}</strong>
                    </StyledDivVacationInfo>
                    <StyledDivVacationInfo>
                      <strong>{email}</strong>
                    </StyledDivVacationInfo>
                  </Row>
                  <Row>
                    <StyledDivVacationInfo>
                      <strong>{available_sick_days}</strong>
                      <strong>{lang.superAdmin.rowSickDays}</strong>
                    </StyledDivVacationInfo>
                    <StyledDivVacationInfo>
                      <strong>{available_vacation}</strong>
                      <strong>{lang.superAdmin.rowVacationDays}</strong>
                    </StyledDivVacationInfo>
                  </Row>
                </div>
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
                dataSource={vacations}
                size="large"
                rowClassName={SelectColor}
              />
            </StyledContent>
          )
        )}
      </StyledLayout>
    </Layout>
  );
};
export default AdminView;
