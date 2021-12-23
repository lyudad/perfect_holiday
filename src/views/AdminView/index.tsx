import React, { useEffect, useState } from 'react';
import Sidebar from 'Components/Sidebar';
import { lang } from 'language/en';
import { columns } from './const';
import Layout from './layout';
import {
  bookigRestDays,
  getUserRequestDays,
  toUpdateUserInfo,
} from 'hooks/useUsers';
import 'antd/dist/antd.css';
import { Row, Input, Form, Col, Button, Table, message, Select, Modal } from 'antd';
import {
  StyledLayout,
  StyledContent,
  StyledButton,
  StyledDivContent,
  StyledDivVacationInfo,
  ButtonWrapper,
  SelectBlock,
} from './styles';
import { url } from 'constants/constants';
import { useRouteMatch } from 'react-router-dom';
import { IMatchParams } from './types';
import { sellectItemColor } from 'constants/constants';
import axios from 'axios';
import store from 'Redux/store';
import { Role } from 'constants/constants';
import { TBookkHoliday, User } from 'hooks/types';
import ModalWindow from 'views/user/modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Vacation } from 'views/user/types';
import { showCurrentDate } from 'views/user/const';

const { REACT_APP_BASE } = process.env;
const { Option } = Select;

const AdminView = (): JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [type, setType] = useState<string>('vacation');
  const [data, setData] = useState<User[]>();
  const { watch } = useForm<Vacation>();
  const [form] = Form.useForm();

  const watchAll = watch();

  const newStartDate = new Date(watchAll.startDate);
  const newEndDate = new Date(watchAll.endDate);

  const state = store.getState();

  const userId = useRouteMatch<IMatchParams>().params.id;

  useEffect(() => {
    getUserRequestDays(userId)
      .then(({ data }) => {
        setData(data);
      })
      .catch(error => console.log(error));
  }, []);

  const start_date = showCurrentDate(newStartDate);
  const end_date = showCurrentDate(newEndDate);

  const days: TBookkHoliday = { type, start_date, end_date };

  const role = state.person.user.role;

  const InitialState = {
    canSelectRoleInEdit: role === Role.SUPER,
  };

  const updateUserInfo = () => {
    toUpdateUserInfo(form.getFieldsValue(), userId)
      .then(() => message.success(lang.updateStatus.success))
      .catch(() => message.success(lang.updateStatus.success));
    form.resetFields();
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

  const onSubmit: SubmitHandler<Vacation> = () => {
    setType(type);
    bookigRestDays(days, userId);
    toggleModal();
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const SelectColor = (record: { status: string }) => {
    return sellectItemColor(record.status) || '';
  };

  return (
    <Layout>
      <StyledLayout>
        {Modal && (
          <Modal
            onCancel={toggleModal}
            visible={isModalVisible}
            wrapClassName="reservation_modal"
            width={600}
            footer={null}
          >
            <div className="reserv_message">Please choose dates of reservation.</div>
            <ModalWindow onClose={onSubmit} />
          </Modal>
        )}
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
                    {InitialState.canSelectRoleInEdit && (
                      <Col span={3}>
                        <Form.Item name="role" rules={[{ type: 'string' }]}>
                          <SelectBlock placeholder={lang.superAdmin.roleTitle}>
                            <Option value="admin" key="id">
                              Admin
                            </Option>
                            <Option value="employee">Employee</Option>
                          </SelectBlock>
                        </Form.Item>
                        //{' '}
                      </Col>
                    )}
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
                {id == userId ? (
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
                ) : null}
                {id == userId ? (
                  <Row>
                    <StyledDivVacationInfo>
                      <strong>{available_sick_days} Sick days</strong>
                    </StyledDivVacationInfo>
                    <StyledDivVacationInfo>
                      <strong>{available_vacation} Vacation days</strong>
                    </StyledDivVacationInfo>
                  </Row>
                ) : null}
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
                <StyledButton
                  type="primary"
                  shape="round"
                  htmlType="submit"
                  size="large"
                  onClick={() => setIsModalVisible(true)}
                >
                  +
                </StyledButton>
              </ButtonWrapper>

              <Table
                columns={columns}
                dataSource={vacations}
                size="large"
                rowClassName={SelectColor}
              />
            </StyledContent>
          ),
        )}
      </StyledLayout>
    </Layout>
  );
};
export default AdminView;
