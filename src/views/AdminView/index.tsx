import React, {useState} from 'react';
import Sidebar from 'Components/Sidebar';
import { lang } from 'language/en';
import { columns } from './const';
import Layout from './layout';
import { toUpdateUserInfo } from 'hooks/useUsers';
import 'antd/dist/antd.css';
import { Row, Input, Form, Col, Button, Table, message, Select, Modal } from 'antd';
import {
  StyledLayout,
  StyledContent,
  StyledButton,
  StyledDivContent,
  StyledDivVacationInfo,
  ButtonWrapper,
  StyledInputContent,
  SelectBlock,
  StyledModalContent,
} from './styles';
import shortid from 'shortid';
import {url} from "constants/constants";
import {IMailVars} from './types'
import {useParams, useRouteMatch } from 'react-router-dom';
import { IMatchParams } from './types';
import { sellectItemColor } from 'constants/constants';
import axios from 'axios';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { type } from 'os';
const {REACT_APP_BASE} = process.env
const { Option } = Select;
import store from 'Redux/store';        
import { Role } from 'constants/constants';

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
  type Data = typeof data;

  type Type = string;

  type Vacation = {
    startDate: Date;
    endDate: Date;
  };

  const [request, setRequest] = useState<Data>(data);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<Type>('vacation');
  const { control, handleSubmit, watch } = useForm<Vacation>();
  const watchAll = watch();
  const today = new Date();
  const onChangeType = (type: string) => {
    setSelectedType(type);
  };
  const onSubmit: SubmitHandler<Vacation> = (data: Vacation) => {
    const newStartDate = new Date(data.startDate);
    const firstDate = newStartDate.toLocaleDateString().slice(0, 10);
    const newEndDate = new Date(data.endDate);
    const endDate = newEndDate.toLocaleDateString().slice(0, 10);
    onChangeType(selectedType);
    const item = {
      key: shortid.generate(),
      startDate: firstDate,
      endDate: endDate,
      status: 'pending',
      type: selectedType,
    };
    console.log(item);
    toggleModal();
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const [form] = Form.useForm();
  const [type, setType] = useState<string>('employee');
  const state = store.getState();
  const role = state.person.user.role;
  const InitialState = {
    canSelectRoleInEdit: (role === Role.SUPER)
  };
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
        {Modal && (
            <Modal
                onCancel={toggleModal}
                visible={isModalVisible}
                wrapClassName="reservation_modal"
                width={600}
                footer={null}
            >
              <div className="reserv_message">Please choose dates of reservation.</div>
              <Form onSubmitCapture={handleSubmit(onSubmit)}>
                <StyledInputContent>
                  <Controller
                      name="startDate"
                      control={control}
                      render={({ field }) => {
                        return (
                            <DatePicker
                                selectsStart
                                dateFormat="dd.MM.yyyy"
                                startDate={watchAll.startDate}
                                endDate={watchAll.endDate}
                                maxDate={watchAll.endDate}
                                minDate={today}
                                selected={field.value}
                                onChange={field.onChange}
                                placeholderText="Start date"
                            />
                        );
                      }}
                  />
                  <Controller
                      name="endDate"
                      control={control}
                      render={({ field }) => {
                        return (
                            <DatePicker
                                selectsEnd
                                dateFormat="dd.MM.yyyy"
                                startDate={watchAll.startDate}
                                endDate={watchAll.endDate}
                                minDate={watchAll.startDate}
                                selected={field.value}
                                onChange={field.onChange}
                                placeholderText="Start date"
                            />
                        );
                      }}
                  />
                  <SelectBlock
                      size="middle"
                      defaultValue="vacation"
                      onChange={() => setSelectedType(type)}
                      value={selectedType}
                  >
                    <Option value="vacation">Vacation</Option>
                    <Option value="sickleave">Sick leave</Option>
                  </SelectBlock>
                </StyledInputContent>

                <StyledModalContent>
                  <Button onClick={toggleModal}>Cancel</Button>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Confirm Reservation
                    </Button>
                  </Form.Item>
                </StyledModalContent>
              </Form>
            </Modal>
        )}
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
                {
                  (InitialState.canSelectRoleInEdit)
                  &&
                  <Col span={3}>
                    <Form.Item name="role" rules={[{ type: 'string' }]}>
                      <SelectBlock
                        placeholder={lang.superAdmin.roleTitle}
                      >
                        <Option value="admin" key="id" >
                          Admin
                        </Option>
                        <Option value="employee">
                          Employee
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
            <StyledButton
              shape="round"
              htmlType="submit"
              size="large"
              onClick={() => setIsModalVisible(true)}
            >
              {lang.button["addButton"]}
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
